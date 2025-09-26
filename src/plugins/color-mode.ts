import type { App } from "vue";

export default {
  install(app: App) {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      document.documentElement.classList.toggle("dark", media.matches);
    };
    apply();
    media.addEventListener("change", apply);
    app.mixin({
      unmounted() {
        media.removeEventListener("change", apply);
      },
    });
  },
};
