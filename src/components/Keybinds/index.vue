<script setup lang="ts">
import type { Keybind } from "@/types";
import { getKeybinds } from "@/utils/chrome";
import { onMounted, ref } from "vue";
import KeybindItem from "./item.vue";

const keybinds = ref<Keybind[]>([]);
onMounted(async () => {
  keybinds.value = await getKeybinds();
});
</script>

<template>
  <div class="flex flex-1 flex-col overflow-hidden">
    <h3 class="text-foreground mb-3 text-sm font-semibold">Key Binds</h3>
    <div class="scrollbar-thin flex-1 space-y-2 overflow-y-auto">
      <KeybindItem
        :keybind="keybind"
        :key="keybind.name"
        v-for="keybind in keybinds"
      />
    </div>
  </div>
</template>
