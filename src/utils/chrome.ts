import type { MessageContent } from "@/types";

export const openShortcuts = () => {
  return chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
};

export const sendBroadcast = (
  content: MessageContent,
  cb?: (response: any) => void,
) => {
  chrome.runtime.sendMessage(content, (response) => {
    if (cb) cb(response);
  });
};

export const sendToContent = (
  content: MessageContent,
  cb?: (response: any) => void,
) => {
  chrome.tabs.query({ url: "*://music.youtube.com/*" }, (tabs) => {
    for (const tab of tabs) {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, content, (response) => {
          if (cb) cb(response);
        });
      }
    }
  });
};
