import { COMMANDS, KEYS, STORAGE_KEYS, URLS } from "@/constants";
import type { Shortcut, MessageContent } from "@/types";
import { isDefined } from ".";

export const openShortcuts = () => {
  return chrome.tabs.create({ url: URLS.SHORTCUTS });
};

export const sendBroadcast = (
  content: MessageContent,
  cb?: (response: any) => void,
) => {
  chrome.runtime.sendMessage(content).then((response) => {
    if (cb) cb(response);
  });
};

export const sendToContent = (
  content: MessageContent,
  cb?: (response: any) => void,
) => {
  chrome.tabs.query({ url: URLS.CONTENT_SCRIPT }, (tabs) => {
    if (
      !tabs.length &&
      content.type === KEYS.COMMAND_TRIGGERED &&
      content.command === COMMANDS.PLAY_PAUSE
    ) {
      chrome.storage.local
        .get(STORAGE_KEYS.SETTINGS)
        .then(({ [STORAGE_KEYS.SETTINGS]: result }) => {
          if (!result) return;
          const settings = JSON.parse(result);
          if (!settings || !settings.openYTM) return;
          const url = settings.surprise ? URLS.PLAY_MUSIC : URLS.ROOT;
          return chrome.tabs.create({
            url,
            pinned: settings.pin,
          });
        });
      return;
    }
    const tab = tabs[0];
    if (!tab || !tab.id) return;
    chrome.tabs.sendMessage(tab.id, content).then((response) => {
      if (cb) cb(response);
    });
  });
};

export const getShortcuts = (): Promise<Shortcut[]> => {
  return new Promise((resolve) => {
    chrome.commands.getAll((commands) => {
      const shortcuts: Shortcut[] = commands
        .map((cmd) => {
          if (!cmd.name || !cmd.description) return null;
          return {
            name: cmd.name,
            action: cmd.description,
            key: cmd.shortcut || "Unset",
          };
        })
        .filter(isDefined)
        .reverse()
        .sort((a) => (a.key !== "Unset" ? -1 : 1));
      resolve(shortcuts);
    });
  });
};

export const getDevices = async (): Promise<
  | {
      success: false;
      error: string;
    }
  | { success: true; devices: MediaDeviceInfo[] }
> => {
  if (!navigator.permissions) {
    return { success: false, error: "navigator.permissions not supported" };
  }
  try {
    const status = await navigator.permissions.query({ name: "microphone" });
    if (status.state !== "granted") {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      stream.getTracks().forEach((track) => track.stop());
    }
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioDevices = devices.filter(
      (device) => device.kind === "audiooutput",
    );
    return { success: true, devices: audioDevices };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};
