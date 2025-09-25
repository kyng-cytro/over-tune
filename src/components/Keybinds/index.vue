<template>
  <div class="flex flex-1 flex-col overflow-hidden">
    <h3 class="mb-3 text-sm font-semibold text-slate-700">Key Binds</h3>
    <div class="scrollbar-thin flex-1 space-y-2 overflow-y-auto">
      <KeybindItem
        v-for="keybind in keybinds"
        :key="keybind.id"
        :keybind="keybind"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import KeybindItem from "./item.vue";

interface Keybind {
  id: string;
  key: string;
  action: string;
  modifier: string;
}

const keybinds = ref<Keybind[]>([
  {
    id: "1",
    action: "Play/Pause",
    key: "Space",
    modifier: "⌘",
  },
  {
    id: "2",
    action: "Next Track",
    key: "→",
    modifier: "⌘",
  },
  {
    id: "3",
    action: "Previous Track",
    key: "←",
    modifier: "⌘",
  },
  {
    id: "4",
    action: "Volume Up",
    key: "↑",
    modifier: "⌘",
  },
  {
    id: "5",
    action: "Volume Down",
    key: "↓",
    modifier: "⌘",
  },
  {
    id: "6",
    action: "Mute/Unmute",
    key: "M",
    modifier: "⌘",
  },
  {
    id: "7",
    action: "Shuffle Toggle",
    key: "S",
    modifier: "⌘",
  },
  {
    id: "8",
    action: "Repeat Toggle",
    key: "R",
    modifier: "⌘",
  },
  {
    id: "9",
    action: "Like Track",
    key: "L",
    modifier: "⌘",
  },
  {
    id: "10",
    action: "Dislike Track",
    key: "D",
    modifier: "⌘",
  },
  {
    id: "11",
    action: "Skip to Next Album",
    key: "→",
    modifier: "⌘⇧",
  },
  {
    id: "12",
    action: "Skip to Previous Album",
    key: "←",
    modifier: "⌘⇧",
  },
]);
</script>
