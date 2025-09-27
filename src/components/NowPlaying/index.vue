<script setup lang="ts">
import Button from "@/components/Button/index.vue";
import type { MediaInfo } from "@/types";
import { formatTime, isPlaying } from "@/utils/date";
import { Pause, Play, SkipBack, SkipForward } from "lucide-vue-next";
import { computed } from "vue";
import Image from "./image.vue";

defineEmits<{
  (e: "nextTrack"): void;
  (e: "previousTrack"): void;
  (e: "togglePlayPause"): void;
}>();

const props = withDefaults(
  defineProps<{
    current?: MediaInfo;
  }>(),
  {
    current: () => ({
      track: {
        title: "No track playing",
        artist: "YTM Plus",
        album: null,
        artwork: null,
      },
      progress: 0,
      status: "none",
      duration: 180,
    }),
  },
);

const progress = computed(
  () => ((props.current.progress || 0) / (props.current.duration || 180)) * 100,
);
</script>
<template>
  <div
    class="border-border bg-card flex w-full flex-col justify-center gap-4 rounded-xl border p-4 shadow-sm"
  >
    <div class="flex items-center gap-4">
      <Image :artwork="current.track.artwork" />
      <div class="flex-1 overflow-hidden">
        <h3 class="text-foreground truncate text-sm font-semibold">
          {{ current.track.title }}
        </h3>
        <p class="text-muted-foreground truncate text-xs">
          {{ current.track.artist }}
        </p>
        <div class="mt-2">
          <div class="bg-muted h-1 w-full overflow-hidden rounded-full">
            <div
              :style="{ width: `${progress}%` }"
              class="bg-primary h-full rounded-full transition-all duration-300"
            ></div>
          </div>
          <div class="text-muted-foreground mt-1 flex justify-between text-xs">
            <span>{{ formatTime(current.progress) }}</span>
            <span>{{ formatTime(current.duration) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full items-center justify-evenly gap-2">
      <Button size="sm" variant="control" @click="$emit('previousTrack')">
        <SkipBack class="size-4" />
      </Button>
      <Button
        variant="primary"
        size="lg"
        class="p-3"
        @click="$emit('togglePlayPause')"
      >
        <Play v-if="!isPlaying(current.status)" class="ml-0.5 size-5" />
        <Pause v-else class="size-5" />
      </Button>
      <Button size="sm" variant="control" @click="$emit('nextTrack')">
        <SkipForward class="size-4" />
      </Button>
    </div>
  </div>
</template>
