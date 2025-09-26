import colorMode from "@/plugins/color-mode";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/tailwind.css";

createApp(App).use(colorMode).mount("#app");
