<script setup lang="ts">
const value = defineModel<boolean>({ default: false });
</script>
<template>
  <label class="relative inline-block h-8 w-14 shrink-0">
    <input type="checkbox" class="peer sr-only" v-model="value" />
    <span
      class="bg-muted before:bg-background peer-checked:bg-primary absolute inset-0 cursor-pointer rounded-full transition-all duration-400 before:absolute before:inset-y-0.5 before:size-6.5 before:rounded-full before:transition-all before:duration-400 before:content-[''] peer-checked:before:translate-x-full"
    ></span>
  </label>
</template>
