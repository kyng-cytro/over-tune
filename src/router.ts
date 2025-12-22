import Home from "@/pages/Home.vue";
import Settings from "@/pages/Settings.vue";
import CompletePairing from "@/pages/CompletePairing.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/settings", component: Settings },
    { path: "/complete-pairing/:sessionId", component: CompletePairing },
  ],
});

export default router;
