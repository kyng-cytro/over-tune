<script setup lang="ts">
import { Command } from "lucide-vue-next";
import type { Keybind } from "@/types";
defineProps<{
  keybind: Keybind;
}>();
</script>

<template>
  <div class="bg-muted flex items-center justify-between rounded-lg p-3">
    <div class="flex items-center gap-3">
      <div class="bg-muted/70 flex size-8 items-center justify-center rounded">
        <Command class="size-4" v-if="keybind.key !== 'Unset'" />
      </div>
      <span class="text-foreground text-sm capitalize">{{
        keybind.action
      }}</span>
    </div>
    <span class="text-muted-foreground text-xs">{{ keybind.key }}</span>
  </div>
</template>
