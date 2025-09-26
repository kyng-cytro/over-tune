import type { Keybind } from "@/types";

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
