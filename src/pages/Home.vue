<script setup lang="ts">
import Button from "@/components/Button/index.vue";
import NowPlaying from "@/components/NowPlaying/index.vue";
import OutputSelect from "@/components/OutputSelect/index.vue";
import Shortcuts from "@/components/Shortcuts/index.vue";
import { COMMANDS, makeMsg } from "@/constants";
import type { MediaInfo } from "@/types";
import { setDevice, triggerCommand } from "@/utils";
import { openShortcuts, sendBroadcast } from "@/utils/chrome";
import { Settings2 } from "lucide-vue-next";
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
</template>
