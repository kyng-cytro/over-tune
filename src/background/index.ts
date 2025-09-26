import { COMMANDS, KEYS, makeMsg } from "@/constants";
import type { MediaInfo } from "@/types";
import { sendToContent } from "@/utils/chrome";

let currentMedia: MediaInfo | null = null;

chrome.commands.onCommand.addListener((command) => {
  if (Object.values(COMMANDS).includes(command)) {
    sendToContent(makeMsg.COMMAND_TRIGGERED(command));
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
