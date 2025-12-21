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
  switch (msg.type) {
    case KEYS.GET_MEDIA:
      console.log("[background] getting media");
      sendResponse(currentMedia);
      break;
    case KEYS.MEDIA_UPDATE:
      currentMedia = msg.data as MediaInfo;
      break;
    case KEYS.SETUP_OFFSCREEN:
      console.log("[background] setting up offscreen");
      setupOffscreen();
      break;
    case KEYS.PROXY_TO_CONTENT:
      console.log("[background] proxying to content", msg.data);
      sendToContent(msg.data);
      break;
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
