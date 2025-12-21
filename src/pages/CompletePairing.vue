<script setup lang="ts">
import Button from "@/components/Button/index.vue";
import { URLS } from "@/constants";
import supabase from "@/utils/supabase";
import { computedAsync } from "@vueuse/core";
import { BadgeCheck } from "lucide-vue-next";
import QRCode from "qrcode";
import { onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const paired = ref(false);
const router = useRouter();
const { sessionId } = useRoute().params;

const code = computedAsync(async () => {
  if (!sessionId) return;
  return await QRCode.toDataURL(`${URLS.SITE}/pair?id=${sessionId}`);
});

const channel = supabase
  .channel(`pairing:${sessionId}`)
  .on(
    "postgres_changes",
    {
      event: "UPDATE",
      schema: "public",
      table: "pairing_sessions",
      filter: `id=eq.${sessionId}`,
    },
    (payload) => {
      console.log("Payload", payload);
      if (payload.new.status === "claimed") {
        paired.value = true;
      }
    },
  )
  .subscribe();

onUnmounted(() => {
  supabase.removeChannel(channel);
});
</script>
<template>
  <div class="flex flex-1 flex-col gap-6">
    <template v-if="!paired">
      <div class="space-y-2">
        <h2 class="text-foreground text-lg font-semibold">Complete Pairing</h2>
        <p class="text-muted-foreground text-xs">
          Scan the QR code with your other device to pair
        </p>
      </div>
      <template v-if="code">
        <img :src="code" class="w-full max-w-xs" />
        <div class="space-y-2">
          <p class="text-muted-foreground text-xs">
            You can also copy the code below to pair manually at
            <a
              class="text-primary underline underline-offset-2"
              target="_blank"
              :href="`${URLS.SITE}/pair`"
              >Over Tune</a
            >
          </p>
          <pre
            class="text-muted-foreground bg-muted/70 max-w-xs rounded-md p-2 text-sm whitespace-pre-wrap"
            >{{ sessionId }}</pre
          >
        </div>
      </template>
    </template>
    <template v-else>
      <div class="flex h-full flex-col items-center justify-center gap-6">
        <BadgeCheck class="size-20 text-green-500" />
        <div class="space-y-2 text-center">
          <h2 class="text-foreground text-lg font-semibold">
            Paired Successfully
          </h2>
          <p class="text-muted-foreground text-xs">
            You can now control YTM using paired device. Enjoy your tunes!
          </p>
        </div>
        <Button
          size="lg"
          variant="primary"
          :full-width="true"
          @click="router.push('/')"
          >Go to Home</Button
        >
      </div>
    </template>
  </div>
</template>
