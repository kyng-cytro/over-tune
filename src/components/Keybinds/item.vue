<script setup lang="ts">
import { Command } from "lucide-vue-next";
import type { Keybind } from "@/types";
defineProps<{
  keybind: Keybind;
}>();
</script>

<template>
  <div class="flex items-center justify-between rounded-lg bg-slate-100 p-3">
    <div class="flex items-center gap-3">
      <div class="flex size-8 items-center justify-center rounded bg-slate-200">
        <Command class="size-4" v-if="keybind.key !== 'Unset'" />
      </div>
      <span class="text-sm text-slate-700 capitalize">{{
        keybind.action
      }}</span>
    </div>
    <span class="text-xs text-slate-500">{{ keybind.key }}</span>
  </div>
</template>
