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

// Determine background class based on variant
const bgClass = computed(() => {
  if (props.variant === 'themed') {
    return `bg-${currentThemeColor.value}-50/30 dark:bg-${currentThemeColor.value}-900/10`
  }
  return '' // Default background
})
</script>

<template>
  <div
    data-slot="card-content"
    :class="cn('px-6', bgClass, props.class)"
  >
    <slot />
  </div>
</template>
