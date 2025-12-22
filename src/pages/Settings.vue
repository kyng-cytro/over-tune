<script setup lang="ts">
import Button from "@/components/Button/index.vue";
import Devices from "@/components/Devices/index.vue";
import Switch from "@/components/Switch/index.vue";
import { makeMsg } from "@/constants";
import type { Settings } from "@/types";
import { storageHelper } from "@/utils/chrome";
import { setupNetworking } from "@/utils/networking";
import supabase from "@/utils/supabase";
import { useColorMode } from "@vueuse/core";
import { Plus } from "lucide-vue-next";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const defaultSettings: Settings = {
  pin: false,
  openYTM: false,
  surprise: false,
  networking: {
    enable: false,
  },
};
const paring = ref(false);
const router = useRouter();
const mode = useColorMode();
const settings = ref<Settings>(defaultSettings);

onMounted(async () => {
  const result = await storageHelper.get("SETTINGS");
  if (!result) return;
  settings.value = JSON.parse(result);
});

watch(
  settings,
  () => {
    storageHelper.set("SETTINGS", JSON.stringify(settings.value));
    chrome.runtime.sendMessage(makeMsg.SETUP_OFFSCREEN());
  },
  { deep: true },
);

const onPairDevice = async () => {
  if (!settings.value.networking.enable) return;
  const id = await setupNetworking();
  paring.value = true;
  try {
    const { data: sessionId, error } = await supabase
      .rpc("create_pairing_session", {
        p_extension_id: id,
      })
      .single();
    if (error || !sessionId) {
      throw new Error(error?.message || "Failed to create session");
    }
    router.push(`/complete-pairing/${sessionId}`);
  } catch (e: any) {
    console.error("[settings] failed to pair device", e);
  } finally {
    paring.value = false;
  }
};
</script>
<template>
  <div class="scrollbar-thin flex flex-1 flex-col gap-6 overflow-y-auto">
    <div>
      <h2 class="text-foreground mb-4 text-lg font-semibold">Settings</h2>
      <div class="flex items-center justify-between gap-2">
        <div class="space-y-2">
          <h3 class="text-foreground text-sm font-medium">Color Mode</h3>
          <p class="text-muted-foreground text-xs">
            Choose your preferred color scheme
          </p>
        </div>
        <select
          v-model="mode"
          class="border-border bg-background text-foreground focus:ring-ring max-w-max rounded-md border px-3 py-1 text-sm focus:ring-2 focus:outline-none"
        >
          <option value="auto">Auto</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
    <div>
      <div class="flex items-center justify-between gap-2">
        <div class="space-y-2">
          <h3 class="text-foreground text-sm font-medium">
            Open if None Available
          </h3>
          <p class="text-muted-foreground text-xs">
            Automatically open YouTube Music on play when none is detected
          </p>
        </div>
        <Switch v-model="settings.openYTM" />
      </div>
    </div>
    <template v-if="settings.openYTM">
      <div class="flex items-center justify-between gap-2">
        <div class="space-y-2">
          <h3 class="text-foreground text-sm font-medium">Surprise Me</h3>
          <p class="text-muted-foreground text-xs">
            Play random music when opening YouTube Music
          </p>
        </div>
        <Switch v-model="settings.surprise" />
      </div>
      <div class="flex items-center justify-between gap-2">
        <div class="space-y-2">
          <h3 class="text-foreground text-sm font-medium">Pin Instance</h3>
          <p class="text-muted-foreground text-xs">
            Keep the YouTube Music instance pinned for quick access
          </p>
        </div>
        <Switch v-model="settings.pin" />
      </div>
    </template>
    <div class="flex items-center justify-between gap-2">
      <div class="space-y-2">
        <h3 class="text-foreground text-sm font-medium">Enable Networking</h3>
        <p class="text-muted-foreground text-xs">
          Allow Over Tune to communicate with companion devices (beta)
        </p>
      </div>
      <Switch v-model="settings.networking.enable" />
    </div>
    <template v-if="settings.networking.enable">
      <div class="flex items-center justify-between gap-2">
        <h3 class="text-foreground text-sm font-medium">Devices</h3>
        <Button
          size="sm"
          variant="ghost"
          :loading="paring"
          @click="onPairDevice"
        >
          <Plus class="size-4" />
        </Button>
      </div>
      <Suspense>
        <Devices class="-mt-4" />
      </Suspense>
    </template>
  </div>
</template>
