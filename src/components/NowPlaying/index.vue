<script setup lang="ts">
import { ref, computed } from "vue";
import { Music, Play, Pause, SkipBack, SkipForward } from "lucide-vue-next";
import Button from "@/components/Button/index.vue";

const currentTrack = ref({
  title: "Sample Track",
  artist: "Sample Artist",
  album: "Sample Album",
  duration: 180,
  albumArt: null,
});

const isPlaying = ref(false);
const currentTime = ref(45);
const hasPrevious = ref(true);
const hasNext = ref(true);

const duration = computed(() => currentTrack.value.duration);
const progress = computed(() => (currentTime.value / duration.value) * 100);

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const togglePlayPause = () => {
  isPlaying.value = !isPlaying.value;
};

const previousTrack = () => {
  if (hasPrevious.value) {
    console.log("Previous track");
  }
};

const nextTrack = () => {
  if (hasNext.value) {
    console.log("Next track");
  }
};
</script>
<template>
  <div
    class="flex w-full flex-col justify-center gap-4 rounded-xl border border-slate-200 bg-slate-100 p-4 shadow-sm"
  >
    <div class="flex items-center gap-4">
      <div
        class="flex size-14 items-center justify-center rounded-lg bg-slate-300 shadow-md"
      >
        <Music class="size-6 text-slate-600" />
      </div>
      <div class="flex-1">
        <h3 class="truncate text-sm font-semibold text-slate-800">
          {{ currentTrack.title || "No track playing" }}
        </h3>
        <p class="truncate text-xs text-slate-500">
          {{ currentTrack.artist || "Unknown artist" }}
        </p>
        <div class="mt-2">
          <div class="h-1 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              class="h-full rounded-full bg-slate-500 transition-all duration-300"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
          <div class="mt-1 flex justify-between text-xs text-slate-400">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full items-center justify-evenly gap-2">
      <Button
        size="sm"
        variant="control"
        :disabled="!hasPrevious"
        @click="previousTrack"
      >
        <SkipBack class="size-4" />
      </Button>
      <Button variant="primary" size="lg" @click="togglePlayPause" class="p-3">
        <Play v-if="!isPlaying" class="ml-0.5 size-5" />
        <Pause v-else class="size-5" />
      </Button>
      <Button
        size="sm"
        variant="control"
        :disabled="!hasNext"
        @click="nextTrack"
      >
        <SkipForward class="size-4" />
      </Button>
    </div>
  </div>
</template>
