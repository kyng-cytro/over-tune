<script setup lang="ts">
import DeviceItem from "@/components/Devices/item.vue";
import { getExtensionId } from "@/utils/networking";
import supabase from "@/utils/supabase";
import { useAsyncState } from "@vueuse/core";
const { state, execute } = await useAsyncState(async () => {
  const id = await getExtensionId();
  if (!id) return [];
  const { data: connections, error } = await supabase
    .from("connections")
    .select("id, device_id, created_at, revoked_at, devices(platform)")
    .eq("extension_id", id)
    .is("revoked_at", null);
  if (error) throw new Error(error.message);
  return connections;
}, []);

const revoke = async (id: string) => {
  if (!confirm("Are you sure you want to revoke this device?")) return;
  await supabase
    .from("connections")
    .update({ revoked_at: new Date() })
    .eq("id", id);
  execute();
};
</script>
<template>
  <div class="flex flex-1 flex-col overflow-hidden">
    <div class="scrollbar-thin flex-1 space-y-2 overflow-y-auto">
      <DeviceItem
        @revoke="revoke"
        :key="connection.id"
        :connection="connection"
        v-for="connection in state"
      />
    </div>
  </div>
</template>
