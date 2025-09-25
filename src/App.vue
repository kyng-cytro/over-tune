<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import Button from "@/components/Button/index.vue";
import Keybinds from "@/components/Keybinds/index.vue";
import NowPlaying from "@/components/NowPlaying/index.vue";
import OutputSelect from "@/components/OutputSelect/index.vue";
</script>

<template>
  <div
    class="flex h-[600px] w-80 flex-col rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-lg"
  >
    <div class="mb-6 flex items-center justify-center gap-3">
      <img src="/icon128.png" alt="icon" class="size-8 rounded-lg" />
      <h1 class="text-2xl font-bold text-slate-800">YTM Plus</h1>
    </div>
    <div class="mb-6">
      <NowPlaying />
    </div>
    <OutputSelect />
    <div class="mb-4">
      <Button variant="primary" size="lg" :full-width="true">
        <Plus class="size-4" />
        <span>Add Key Bind</span>
      </Button>
    </div>
    <Keybinds />
  </div>
</template>
