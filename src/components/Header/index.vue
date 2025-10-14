<script setup lang="ts">
import Button from "@/components/Button/index.vue";
import { Settings, ChevronLeft } from "lucide-vue-next";
defineProps<{
  canGoBack?: boolean;
}>();
</script>
<template>
  <header class="mb-6 flex items-center justify-between gap-3">
    <div class="flex items-center gap-3">
      <Button
        size="md"
        v-if="canGoBack"
        variant="secondary"
        class="rounded-full"
        @click="$router.back()"
      >
        <ChevronLeft class="size-4" />
      </Button>
      <router-link to="/">
        <img src="/logo.png" alt="icon" class="h-10 rounded-lg" />
      </router-link>
    </div>
    <Button
      size="md"
      v-if="!canGoBack"
      variant="secondary"
      class="rounded-full"
    >
      <router-link to="/settings">
        <Settings class="size-4" />
      </router-link>
    </Button>
  </header>
</template>
