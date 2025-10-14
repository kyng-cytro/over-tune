import router from "@/router";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/tailwind.css";

createApp(App).use(router).mount("#app");
