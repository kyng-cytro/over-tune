import type { Keybind, MessageContent } from "@/types";

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

export function getKeybinds(): Promise<Keybind[]> {
  return new Promise((resolve) => {
    chrome.commands.getAll((commands) => {
      const keybinds: Keybind[] = commands
        .map((cmd, idx) => {
          return {
            key: cmd.shortcut || "Unset",
            name: cmd.name || `custom-${idx + 1}`,
            action: cmd.description || `Custom action ${idx + 1}`,
          };
        })
        .reverse()
        .sort((a) => (a.key !== "Unset" ? -1 : 1));
      resolve(keybinds);
    });
  });
}
