import { URLS } from "./src/constants.ts";
import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "Over Tune",
  description:
    "Over Tune is a Chrome extension that allows you to fully customize your YouTube Music experience.",
  version: "1.2.0",
  icons: {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png",
  },
  action: {
    default_title: "Over Tune",
    default_popup: "index.html",
    default_icon: {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png",
    },
  },
  host_permissions: ["https://*.supabase.co/*"],
  permissions: ["tabs", "storage", "scripting", "offscreen"],
  background: {
    type: "module",
    service_worker: "src/background/index.ts",
  },
  content_scripts: [
    {
      js: ["src/content/index.ts"],
      matches: [URLS.CONTENT_SCRIPT],
    },
  ],
  commands: {
    "play-pause": {
      description: "Play/Pause",
      suggested_key: { default: "Ctrl+Space" },
    },
    "next-track": {
      description: "Next track",
      suggested_key: { default: "Shift+Alt+0" },
    },
    "prev-track": {
      description: "Previous track",
      suggested_key: { default: "Shift+Alt+9" },
    },
    "volume-up": { description: "Volume up" },
    "volume-down": { description: "Volume down" },
    "custom-action": { description: "Custom action" },
  },
  web_accessible_resources: [
    {
      matches: ["*://*/*"],
      resources: ["offscreen.html"],
    },
  ],
});
