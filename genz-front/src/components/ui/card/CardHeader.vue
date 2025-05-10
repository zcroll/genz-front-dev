<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { computed } from 'vue'
import { currentTheme } from '@/lib/theme-utils'
import { useThemeStore } from '@/stores/theme/themeStore'

const props = defineProps<{
  class?: HTMLAttributes['class'],
  variant?: 'default' | 'themed' | 'frosted',
  padding?: 'default' | 'horizontal' | 'vertical' | 'none'
}>()

const themeStore = useThemeStore()

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
    return `bg-${currentThemeColor.value}-50/40 dark:bg-${currentThemeColor.value}-900/20`
  }
  return '' // Default background
})

// Determine padding class based on padding prop
const paddingClass = computed(() => {
  switch (props.padding) {
    case 'horizontal':
      return 'px-6'
    case 'vertical':
      return 'py-4'
    case 'none':
      return ''
    default:
      return 'px-6'
  }
})

// Determine header style based on variant
const headerStyle = computed(() => {
  if (props.variant === 'frosted') {
    return {
      color: 'var(--text-primary)'
    }
  }
  return {}
})
</script>

<template>
  <div
    data-slot="card-header"
    :class="cn('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', paddingClass, bgClass, props.class)"
    :style="headerStyle"
  >
    <slot />
  </div>
</template>
