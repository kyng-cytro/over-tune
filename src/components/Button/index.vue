<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import { computed } from "vue";

interface Props {
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost" | "control";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  fullWidth: false,
});

defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => {
  const baseClasses =
    "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring";

  const variantClasses = {
    primary:
      "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg disabled:bg-primary/60 disabled:cursor-not-allowed",
    secondary:
      "bg-muted text-foreground border border-border hover:bg-muted/80 disabled:bg-muted disabled:text-muted-foreground",
    ghost:
      "text-foreground hover:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed",
    control:
      "rounded-full text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed",
  } as const;

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-sm",
  } as const;

  const widthClasses = props.fullWidth
    ? "w-full flex items-center justify-center gap-2"
    : "";

  return [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    widthClasses,
  ].join(" ");
});
</script>
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot v-if="!loading" />
    <Loader2 v-else class="size-4 animate-spin" />
  </button>
</template>
