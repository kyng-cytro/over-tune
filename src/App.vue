<script setup lang="ts">
import Button from "@/components/Button/index.vue";
import NowPlaying from "@/components/NowPlaying/index.vue";
import OutputSelect from "@/components/OutputSelect/index.vue";
import Shortcuts from "@/components/Shortcuts/index.vue";
import { COMMANDS, makeMsg } from "@/constants";
import type { MediaInfo } from "@/types";
import { setDevice, triggerCommand } from "@/utils";
import { openShortcuts, sendBroadcast } from "@/utils/chrome";
import { BadgeQuestionMark, Settings2 } from "lucide-vue-next";
import { onMounted, ref } from "vue";

const current = ref<MediaInfo>();
onMounted(() => {
  sendBroadcast(makeMsg.GET_MEDIA(), (res) => {
    if (!res) return;
    current.value = res;
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
    class="border-border bg-card flex h-[600px] w-80 flex-col border p-4 shadow-lg"
  >
    <div class="mb-6 flex items-center justify-between gap-3">
      <img src="/logo.png" alt="icon" class="h-10 rounded-lg" />
      <Button size="md" variant="secondary" class="rounded-full">
        <BadgeQuestionMark class="size-4" />
      </Button>
    </div>
    <div class="mb-6">
      <NowPlaying
        :current
        @nextTrack="triggerCommand(COMMANDS.NEXT_TRACK)"
        @previousTrack="triggerCommand(COMMANDS.PREV_TRACK)"
        @togglePlayPause="triggerCommand(COMMANDS.PLAY_PAUSE)"
      />
    </div>
    <OutputSelect @set-device="setDevice" />
    <div class="mb-4">
      <Button
        size="lg"
        variant="primary"
        :full-width="true"
        @click="openShortcuts"
      >
        <Settings2 class="size-4" />
        <span>Edit Shortcuts</span>
      </Button>
    </div>
    <Shortcuts />
    <div class="font-heading mt-2 -mb-2 flex justify-end py-1 font-semibold">
      <a
        target="_blank"
        href="https://github.com/kyng-cytro"
        class="[&:hover,&:focus]:text-primary underline-offset-2 [&:hover,&:focus]:underline"
      >
        By Cytro with ❤️
      </a>
    </div>
  </div>
</template>
