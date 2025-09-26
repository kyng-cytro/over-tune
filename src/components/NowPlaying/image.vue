<script setup lang="ts">
import type { MediaInfo } from "@/types";
import { Music } from "lucide-vue-next";

defineProps<{
  artwork: MediaInfo["track"]["artwork"];
}>();
</script>

<template>
  <img
    v-if="artwork"
    alt="album art"
    :src="artwork"
    class="size-14 rounded-lg"
  />
  <div
    v-else
    class="flex size-14 items-center justify-center rounded-lg bg-slate-300 shadow-md"
  >
    <Music class="size-6 text-slate-600" />
  </div>
</template>
