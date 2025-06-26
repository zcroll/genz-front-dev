<script setup lang="ts">
import { applyColorVariant } from '@/lib/color-utils'
import {Button} from "@/components/ui/button";

// Define props for the component
const props = defineProps<{
  color?: string;
  variant?: 'default' | 'outline' | 'ghost';
}>()

// Define color variants for different button styles
const colorVariants = {
  neutral: 'bg-neutral-200 hover:bg-neutral-300 text-neutral-900',
  zinc: 'bg-zinc-200 hover:bg-zinc-300 text-zinc-900'
}

// Base classes for the button
const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors'

// Compute the final classes based on props
const buttonClasses = applyColorVariant(props.color, baseClasses, colorVariants)
</script>

<template>
  <Button :class="buttonClasses">
    <slot></slot>
  </Button>
</template>
