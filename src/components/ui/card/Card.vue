<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { computed } from 'vue'
import { currentTheme } from '@/lib/theme-utils'

const props = defineProps<{
  class?: HTMLAttributes['class'],
  variant?: 'default' | 'themed'
}>()

// Get the current theme color (blue, green, purple, amber)
const currentThemeColor = computed(() => {
  // Get theme from theme-utils
  const themeId = currentTheme.value
  // Remove '-theme' suffix if present
  return themeId.replace('-theme', '')
})

// Determine border class based on variant
const borderClass = computed(() => {
  if (props.variant === 'themed') {
    return `border-${currentThemeColor.value}-200 dark:border-${currentThemeColor.value}-800/30`
  }
  return 'border-border' // Default border from shadcn
})
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 shadow-sm border',
        borderClass,
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
