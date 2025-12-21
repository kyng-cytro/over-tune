import { COMMANDS, KEYS, makeMsg, URLS } from "@/constants";
import type { MediaInfo } from "@/types";
import { sendToContent, storageHelper } from "@/utils/chrome";
import { getExtensionId } from "@/utils/networking";

let currentMedia: MediaInfo | null = null;

chrome.commands.onCommand.addListener(async (command) => {
  if (!Object.values(COMMANDS).includes(command)) return;
  if (command !== "custom-action") {
    return sendToContent(makeMsg.COMMAND_TRIGGERED(command));
  }
  const action = await storageHelper.get("CUSTOM_ACTION");
  switch (action) {
    case "show-ytm":
      chrome.tabs.query({ url: URLS.CONTENT_SCRIPT }, (tabs) => {
        if (!tabs.length) return;
        const tab = tabs[0];
        if (!tab || !tab.id) return;
        chrome.tabs.update(tab.id, { active: true }, () => {
          chrome.windows.update(tab.windowId, { focused: true });
        });
      });
      break;
  }
});

chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.type === KEYS.SETUP_OFFSCREEN) {
    setupOffscreen();
  }
  if (msg.type === KEYS.MEDIA_UPDATE) {
    currentMedia = msg.data as MediaInfo;
  }
  if (msg.type === KEYS.GET_MEDIA) {
    sendResponse(currentMedia);
  }
});

const setupOffscreen = async () => {
  const id = await getExtensionId();
  const exists = await chrome.offscreen.hasDocument();
  if (!id) return exists && chrome.offscreen.closeDocument();
  if (exists) return;
  await chrome.offscreen.createDocument({
    url: `${URLS.OFFSCREEN}?id=${id}`,
    reasons: ["WORKERS"],
    justification: "To maintain Supabase realtime connection",
  });
};

chrome.runtime.onStartup.addListener(setupOffscreen);
chrome.runtime.onInstalled.addListener(setupOffscreen);
