<template>
  <div class="mb-4">
    <div class="bg-muted flex items-center justify-between rounded-lg p-3">
      <span class="text-foreground text-sm font-medium">Output Device</span>
      <div class="flex items-center gap-2">
        <div class="size-2 rounded-full bg-green-400"></div>
        <select
          v-model="selectedDevice"
          @change="onDeviceChange"
          class="text-muted-foreground rounded border-0 bg-transparent text-xs focus:ring-0 focus:outline-none"
        >
          <option
            v-for="device in devices"
            :key="device.id"
            :value="device.id"
            class="bg-muted text-foreground"
          >
            {{ device.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Device {
  id: string;
  name: string;
  isActive: boolean;
}

const devices = ref<Device[]>([
  { id: "default", name: "Default", isActive: true },
  { id: "speakers", name: "Speakers", isActive: false },
  { id: "headphones", name: "Headphones", isActive: false },
  { id: "bluetooth", name: "Bluetooth Audio", isActive: false },
]);

const selectedDevice = ref("default");

const onDeviceChange = () => {
  // Update device states
  devices.value.forEach((device) => {
    device.isActive = device.id === selectedDevice.value;
  });

  // Add your device switching logic here
  console.log("Switched to device:", selectedDevice.value);
};
</script>
