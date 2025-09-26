import { COMMANDS, KEYS, URLS } from "@/constants";
import type { Keybind, MessageContent } from "@/types";

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
      return chrome.tabs.create({ url: URLS.PLAY_MUSIC });
    }
    const tab = tabs[0];
    if (!tab || !tab.id) return;
    chrome.tabs.sendMessage(tab.id, content).then((response) => {
      if (cb) cb(response);
    });
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
