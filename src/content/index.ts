import { COMMANDS, KEYS, makeMsg } from "@/constants";
import type { MediaInfo } from "@/types";
import { isSame, updateSink } from "@/utils";
import { getDevices, sendBroadcast } from "@/utils/chrome";

let previousInfo: MediaInfo | null = null;

const getMediaInfo = () => {
  const meta = navigator.mediaSession.metadata;
  const media = document.querySelector(
    "audio, video",
  ) as HTMLMediaElement | null;
  if (!meta || !media) return null;
  return {
    track: {
      title: meta.title,
      album: meta.album,
      artist: meta.artist,
      artwork: meta.artwork?.[0]?.src || null,
    },
    duration: media?.duration || 0,
    progress: media?.currentTime || 0,
    status: navigator.mediaSession.playbackState,
  };
};

const pushUpdate = () => {
  const info = getMediaInfo();
  if (!info || isSame(info, previousInfo)) return;
  previousInfo = info;
  sendBroadcast(makeMsg.MEDIA_UPDATE(info));
};

setInterval(pushUpdate, 2000);
pushUpdate();

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type !== KEYS.SET_DEVICE) return;
  chrome.storage.local.set({ preferredSinkId: msg.deviceId });
  const media = document.querySelector(
    "audio, video",
  ) as HTMLMediaElement | null;
  if (!media) return;
  media.setSinkId(msg.deviceId);
});

chrome.storage.local.get("preferredSinkId").then(({ preferredSinkId }) => {
  if (!preferredSinkId) return;
  document.querySelectorAll("audio, video").forEach((media) => {
    updateSink(media as HTMLMediaElement, preferredSinkId);
  });
  new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node instanceof HTMLMediaElement) {
          updateSink(node, preferredSinkId);
        }
      }
    }
  }).observe(document.body, { childList: true, subtree: true });
});

chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.type !== KEYS.GET_DEVICES) return;
  (async () => {
    const result = await getDevices();
    if (!result.success) {
      sendResponse([]);
    } else {
      const media = document.querySelector(
        "audio, video",
      ) as HTMLMediaElement | null;
      const sinkId = media?.sinkId || "default";
      const devices = result.devices.map((device) => ({
        name: device.label,
        id: device.deviceId,
        isActive: device.deviceId === sinkId,
      }));
      sendResponse(devices);
    }
  })();
  return true;
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type !== KEYS.COMMAND_TRIGGERED) return;
  const media = document.querySelector(
    "audio, video",
  ) as HTMLMediaElement | null;
  if (!media) return;
  switch (msg.command) {
    case COMMANDS.PLAY_PAUSE:
      media.paused ? media.play() : media.pause();
      break;
    case COMMANDS.NEXT_TRACK:
      (document.querySelector(".next-button") as HTMLElement)?.click();
      break;
    case COMMANDS.PREV_TRACK:
      (document.querySelector(".previous-button") as HTMLElement)?.click();
      break;
    case COMMANDS.VOLUME_UP:
      media.volume = Math.min(1, media.volume + 0.1);
      break;
    case COMMANDS.VOLUME_DOWN:
      media.volume = Math.max(0, media.volume - 0.1);
      break;
  }
});
