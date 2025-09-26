import { COMMANDS, KEYS, URLS } from "@/constants";
import type { Keybind, MessageContent } from "@/types";
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
      return chrome.tabs.create({ pinned: true, url: URLS.PLAY_MUSIC });
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
      resolve(keybinds);
    });
  });
}
