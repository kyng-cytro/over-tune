<script setup lang="ts">
import Header from "@/components/Header/index.vue";
import { useColorMode } from "@vueuse/core";
useColorMode();
</script>
<template>
  <div
    class="border-border bg-card flex h-[600px] w-80 flex-col border p-4 shadow-lg"
  >
    <Header :can-go-back="$route.path !== '/'" />
    <router-view />
    <footer class="font-heading mt-2 -mb-2 flex justify-end py-1 font-semibold">
      <a
        target="_blank"
        href="https://github.com/kyng-cytro"
        class="[&:hover,&:focus]:text-primary underline-offset-2 [&:hover,&:focus]:underline"
      >
        By Cytro with ❤️
      </a>
    </footer>
  </div>
</template>
