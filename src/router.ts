import Home from "@/pages/Home.vue";
import Settings from "@/pages/Settings.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/settings", component: Settings },
  ],
});

export default router;
