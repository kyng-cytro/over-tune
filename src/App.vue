<script setup lang="ts">
import { makeMsg } from "@/constants";
import { openShortcuts, sendBroadcast } from "@/utils/chrome";
import Button from "@/components/Button/index.vue";
import Keybinds from "@/components/Keybinds/index.vue";
import NowPlaying from "@/components/NowPlaying/index.vue";
import OutputSelect from "@/components/OutputSelect/index.vue";
import type { MediaInfo } from "@/types";
import { Settings2 } from "lucide-vue-next";
import { onMounted, ref } from "vue";

const current = ref<MediaInfo>();

onMounted(() => {
  sendBroadcast(makeMsg.GET_MEDIA(), (response) => {
    current.value = response;
  });
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "MEDIA_UPDATE") {
      current.value = msg.data;
    }
  });
});
</script>
<template>
  <div
    class="flex h-[600px] w-80 flex-col rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-lg"
  >
    <div class="mb-6 flex items-center justify-center gap-3">
      <img src="/icon128.png" alt="icon" class="size-8 rounded-lg" />
      <h1 class="text-2xl font-bold text-slate-800">YTM Plus</h1>
    </div>
    <div class="mb-6">
      <NowPlaying :current />
    </div>
    <OutputSelect />
    <div class="mb-4">
      <Button
        size="lg"
        variant="primary"
        :full-width="true"
        @click="openShortcuts"
      >
        <Settings2 class="size-4" />
        <span>Edit Key Binds</span>
      </Button>
    </div>
    <Keybinds />
  </div>
</template>
