<script setup lang="ts">
import type { Shortcut } from "@/types";
import { getShortcuts } from "@/utils/chrome";
import { onMounted, ref } from "vue";
import ShortcutItem from "./item.vue";

const shortcuts = ref<Shortcut[]>([]);
onMounted(async () => {
  shortcuts.value = await getShortcuts();
});
</script>

<template>
  <div class="flex flex-1 flex-col overflow-hidden">
    <h3 class="text-foreground mb-3 text-sm font-semibold">Shortcuts</h3>
    <div class="scrollbar-thin flex-1 space-y-2 overflow-y-auto">
      <ShortcutItem
        :shortcut="shortcut"
        :key="shortcut.name"
        v-for="shortcut in shortcuts"
      />
    </div>
  </div>
</template>
