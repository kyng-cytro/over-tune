<script setup lang="ts">
import Button from "@/components/Button/index.vue";
import type { MediaInfo } from "@/types";
import { formatTime, isPlaying } from "@/utils/date";
import { Pause, Play, SkipBack, SkipForward } from "lucide-vue-next";
import Image from "./image.vue";
import { computed } from "vue";

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

const nextTrack = () => {};
const previousTrack = () => {};
const togglePlayPause = () => {};
</script>
<template>
  <div
    class="flex w-full flex-col justify-center gap-4 rounded-xl border border-slate-200 bg-slate-100 p-4 shadow-sm"
  >
    <div class="flex items-center gap-4">
      <Image :artwork="current.track.artwork" />
      <div class="flex-1 overflow-hidden">
        <h3 class="truncate text-sm font-semibold text-slate-800">
          {{ current.track.title }}
        </h3>
        <p class="truncate text-xs text-slate-500">
          {{ current.track.artist }}
        </p>
        <div class="mt-2">
          <div class="h-1 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              :style="{ width: `${progress}%` }"
              class="h-full rounded-full bg-slate-500 transition-all duration-300"
            ></div>
          </div>
          <div class="mt-1 flex justify-between text-xs text-slate-400">
            <span>{{ formatTime(current.progress) }}</span>
            <span>{{ formatTime(current.duration) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full items-center justify-evenly gap-2">
      <Button size="sm" variant="control" @click="previousTrack">
        <SkipBack class="size-4" />
      </Button>
      <Button variant="primary" size="lg" @click="togglePlayPause" class="p-3">
        <Play v-if="!isPlaying(current.status)" class="ml-0.5 size-5" />
        <Pause v-else class="size-5" />
      </Button>
      <Button size="sm" variant="control" @click="nextTrack">
        <SkipForward class="size-4" />
      </Button>
    </div>
  </div>
</template>
