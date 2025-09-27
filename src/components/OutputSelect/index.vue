<script setup lang="ts">
import { makeMsg } from "@/constants";
import type { Device } from "@/types";
import { sendToContent } from "@/utils/chrome";
import { computed, onMounted, ref } from "vue";

defineEmits<{
  (e: "set-device", deviceId: string): void;
}>();

const devices = ref<Device[]>([]);
const selected = computed(() => {
  return devices.value.find((d) => d.isActive);
});

onMounted(() => {
  sendToContent(makeMsg.GET_DEVICES(), (devs) => {
    if (!devs) {
      devices.value = [{ id: "default", name: "Default", isActive: true }];
    }
    devices.value = devs;
  });
});
</script>

<template>
  <div class="mb-4">
    <div class="bg-muted flex items-center justify-between rounded-lg p-3">
      <span class="text-foreground text-sm font-medium">Output Device</span>
      <div class="flex items-center gap-2">
        <div
          class="size-2 rounded-full"
          :class="{ 'bg-green-400': selected, 'bg-gray-400': !selected }"
        ></div>
        <select
          :value="selected?.id || 'default'"
          @change="
            $emit('set-device', ($event.target as HTMLSelectElement).value)
          "
          class="text-muted-foreground max-w-28 truncate rounded border-0 bg-transparent text-xs focus:ring-0 focus:outline-none"
        >
          <option
            :key="device.id"
            :value="device.id"
            v-for="device in devices"
            class="bg-muted text-foreground"
          >
            {{ device.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
