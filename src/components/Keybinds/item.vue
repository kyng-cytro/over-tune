<template>
  <div class="flex items-center justify-between rounded-lg bg-slate-100 p-3">
    <div class="flex items-center gap-3">
      <div
        class="flex h-8 w-8 items-center justify-center rounded bg-slate-200"
      >
        <span class="font-mono text-xs">{{ keybind.modifier }}</span>
      </div>
      <span class="text-sm text-slate-700">{{ keybind.action }}</span>
    </div>
    <span class="text-xs text-slate-500">{{ keybind.key }}</span>
  </div>
</template>

<script setup lang="ts">
interface Keybind {
  id: string;
  action: string;
  key: string;
  modifier: string;
}

defineProps<{
  keybind: Keybind;
}>();
</script>
