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
    class="bg-muted flex size-14 items-center justify-center rounded-lg shadow-md"
  >
    <Music class="text-foreground/70 size-6" />
  </div>
</template>
