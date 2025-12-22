<script setup lang="ts">
import DeviceItem from "@/components/Devices/item.vue";
import type { Connection } from "@/types";
import { getExtensionFingerprint, getExtensionId } from "@/utils/networking";
import supabase from "@/utils/supabase";
import { useAsyncState } from "@vueuse/core";
const { state, execute, isLoading } = await useAsyncState(async () => {
  const id = await getExtensionId();
  if (!id) return [];
  const { data: connections, error } = await supabase
    .from("connections")
    .select("id, device_id, created_at, revoked_at, devices(name, platform)")
    .eq("extension_id", id)
    .is("revoked_at", null);
  if (error) throw new Error(error.message);
  return connections as unknown as Connection[];
}, []);

const revoke = async (id: string) => {
  if (!confirm("Are you sure you want to revoke this device?")) return;
  const fingerprint = await getExtensionFingerprint();
  await supabase.rpc("revoke_connection", {
    p_connection_id: id,
    p_fingerprint: fingerprint,
  });
  await execute();
};
</script>
<template>
  <div class="flex flex-1 flex-col space-y-2">
    <template v-if="isLoading">
      <div
        v-for="i in 2"
        :key="`loading-${i}`"
        class="bg-muted h-14 w-full animate-pulse rounded-lg"
      />
    </template>
    <template v-else>
      <DeviceItem
        :key="connection.id"
        :connection="connection"
        v-for="connection in state"
        @revoke="(id) => revoke(id)"
      />
    </template>
  </div>
</template>
