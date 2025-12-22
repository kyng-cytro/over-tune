<script setup lang="ts">
import type { Shortcut } from "@/types";
import { storageHelper } from "@/utils/chrome";
import { Command } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";

const { shortcut } = defineProps<{
  shortcut: Shortcut;
}>();

const customAction = ref("");

onMounted(
  async () => (customAction.value = await storageHelper.get("CUSTOM_ACTION")),
);
const isCustom = computed(() => {
  return shortcut.name.toLowerCase().includes("custom");
});
</script>

<template>
  <div class="bg-muted flex items-center justify-between gap-3 rounded-lg p-4">
    <div class="flex w-full items-center gap-3">
      <div class="bg-muted/70 flex size-8 items-center justify-center rounded">
        <Command class="size-4" v-if="shortcut.key !== 'Unset'" />
      </div>
      <template v-if="!isCustom">
        <span class="text-foreground text-sm capitalize">{{
          shortcut.action
        }}</span>
      </template>
      <template v-else>
        <select
          :value="customAction"
          @change="
            storageHelper.set(
              'CUSTOM_ACTION',
              ($event.target as HTMLSelectElement).value,
            )
          "
          class="text-foreground bg-muted/70 w-full py-1 text-sm outline-none"
        >
          <option value="">Custom Action</option>
          <option value="show-ytm">Show YTM</option>
          <option value="like-track" disabled>Like Track</option>
          <option value="open-lyrics" disabled>Open Lyrics</option>
          <option value="shuffle-playlist" disabled>Shuffle Playlist</option>
        </select>
      </template>
    </div>
    <span class="text-muted-foreground text-xs">{{ shortcut.key }}</span>
  </div>
</template>
