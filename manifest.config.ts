import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "YTM Plus",
  version: "1.0.0",
  icons: {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png",
  },
  action: {
    default_title: "YTM Plus",
    default_popup: "index.html",
    default_icon: {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png",
    },
  },
  permissions: ["tabs", "storage", "scripting"],
  background: {
    type: "module",
    service_worker: "src/background/index.ts",
  },
  content_scripts: [
    {
      js: ["src/content/index.ts"],
      matches: ["https://music.youtube.com/*"],
    },
  ],
  commands: {
    "play-pause": {
      global: true,
      description: "Play/Pause",
      suggested_key: { default: "Ctrl+Space" },
    },
    "next-track": {
      global: true,
      description: "Next track",
      suggested_key: { default: "Shift+Alt+0" },
    },
    "prev-track": {
      global: true,
      description: "Previous track",
      suggested_key: { default: "Shift+Alt+9" },
    },
    "volume-up": { description: "Volume up" },
    "volume-down": { description: "Volume down" },
    "custom-action": { description: "Custom action" },
  },
});
