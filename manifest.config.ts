import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "YTM Plus",
  version: "1.0.0",
  action: {
    default_title: "YTM Plus",
    default_popup: "index.html",
    default_icon: {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png",
    },
  },
  icons: {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png",
  },
});
