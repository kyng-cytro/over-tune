<script setup lang="ts">
import Switch from "@/components/Switch/index.vue";
import { STORAGE_KEYS } from "@/constants";
import type { Settings } from "@/types";
import { useColorMode } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";
const defaultSettings: Settings = {
  pin: false,
  openYTM: false,
  surprise: false,
};
const mode = useColorMode();
const settings = ref<Settings>(defaultSettings);

onMounted(() => {
  chrome.storage.local
    .get(STORAGE_KEYS.SETTINGS)
    .then(({ [STORAGE_KEYS.SETTINGS]: result }) => {
      if (!result) return;
      settings.value = JSON.parse(result);
    });
});

watch(
  settings,
  () => {
    chrome.storage.local.set({
      [STORAGE_KEYS.SETTINGS]: JSON.stringify(settings.value),
    });
  },
  { deep: true },
);
</script>
<template>
  <div class="flex flex-1 flex-col gap-6">
    <h2 class="text-foreground mb-4 text-lg font-semibold">Settings</h2>
    <div class="flex items-center justify-between gap-2">
      <div>
        <h3 class="text-foreground text-sm font-medium">Color Mode</h3>
        <p class="text-muted-foreground text-xs">
          Choose your preferred color scheme
        </p>
      </div>
      <select
        v-model="mode"
        class="border-border bg-background text-foreground focus:ring-ring max-w-max rounded-md border px-3 py-1 text-sm focus:ring-2 focus:outline-none"
      >
        <option value="auto">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
    <div class="flex items-center justify-between gap-2">
      <div>
        <h3 class="text-foreground text-sm font-medium">
          Open if None Available
        </h3>
        <p class="text-muted-foreground text-xs">
          Automatically open YouTube Music on play when none is detected
        </p>
      </div>
      <Switch v-model="settings.openYTM" />
    </div>
    <template v-if="settings.openYTM">
      <div class="flex items-center justify-between gap-2">
        <div>
          <h3 class="text-foreground text-sm font-medium">Surprise Me</h3>
          <p class="text-muted-foreground text-xs">
            Play random music when opening YouTube Music
          </p>
        </div>
        <Switch v-model="settings.surprise" />
      </div>
      <div class="flex items-center justify-between gap-2">
        <div>
          <h3 class="text-foreground text-sm font-medium">Pin Instance</h3>
          <p class="text-muted-foreground text-xs">
            Keep the YouTube Music instance pinned for quick access
          </p>
        </div>
        <Switch v-model="settings.pin" />
      </div>
    </template>
  </div>
</template>
