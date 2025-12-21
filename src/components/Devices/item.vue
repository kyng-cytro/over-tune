<script setup lang="ts">
import Button from "@/components/Button/index.vue";
import type { Connection } from "@/types";
import { Trash } from "lucide-vue-next";
const { connection } = defineProps<{
  connection: Connection;
}>();

defineEmits<{
  (e: "revoke", id: string): void;
}>();
</script>

<template>
  <div class="bg-muted flex items-center justify-between gap-2 rounded-lg p-2">
    <div class="flex flex-col space-y-2">
      <pre
        class="text-foreground truncate text-sm font-medium whitespace-pre-wrap"
        >{{ connection.device_id }}</pre
      >
      <span class="text-muted-foreground truncate text-xs">
        {{ connection.devices.platform }}
      </span>
    </div>
    <Button size="sm" variant="ghost" @click="$emit('revoke', connection.id)">
      <Trash class="size-4" />
    </Button>
  </div>
</template>
