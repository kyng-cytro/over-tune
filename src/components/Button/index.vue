<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "ghost" | "control";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
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
