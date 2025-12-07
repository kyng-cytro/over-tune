import { COMMANDS, KEYS, makeMsg, URLS } from "@/constants";
import type { MediaInfo } from "@/types";
import { getCustomAction } from "@/utils";
import { sendToContent } from "@/utils/chrome";

let currentMedia: MediaInfo | null = null;
chrome.commands.onCommand.addListener(async (command) => {
  if (!Object.values(COMMANDS).includes(command)) return;
  if (command !== "custom-action") {
    return sendToContent(makeMsg.COMMAND_TRIGGERED(command));
  }
  const action = await getCustomAction();
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
  if (msg.type === KEYS.MEDIA_UPDATE) {
    currentMedia = msg.data as MediaInfo;
  }
  if (msg.type === KEYS.GET_MEDIA) {
    sendResponse(currentMedia);
  }
});
