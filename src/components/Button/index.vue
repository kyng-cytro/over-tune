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
    "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300";

  const variantClasses = {
    primary:
      "bg-slate-600 text-white shadow-md hover:bg-slate-700 hover:shadow-lg disabled:bg-slate-400 disabled:cursor-not-allowed",
    secondary:
      "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400",
    ghost:
      "text-slate-600 hover:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed",
    control:
      "rounded-full text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-sm",
  };

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
