<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { computed } from 'vue'
import { currentTheme } from '@/lib/theme-utils'
import { useThemeStore } from '@/stores/theme/themeStore'

const props = defineProps<{
  class?: HTMLAttributes['class'],
  variant?: 'default' | 'themed' | 'frosted',
  padding?: 'default' | 'large' | 'small' | 'none'
}>()

const themeStore = useThemeStore()

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

// Determine padding class based on padding prop
const paddingClass = computed(() => {
  switch (props.padding) {
    case 'large':
      return 'p-7'
    case 'small':
      return 'p-2'
    case 'none':
      return 'p-0'
    default:
      return 'p-2'
  }
})

// Determine card style based on variant
const cardStyle = computed(() => {
  if (props.variant === 'frosted') {
    return {
      backgroundColor: 'var(--content-surface-frosted)',
      backdropFilter: `blur(var(--content-surface-frosted-blur))`,
      borderColor: 'var(--border-subtle)',
      boxShadow: 'var(--shadow-default)'
    }
  }
  return {}
})
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn(
        'flex flex-col gap-6 rounded-xl border',
        props.variant !== 'frosted' && 'bg-card text-card-foreground shadow-sm',
        borderClass,
        paddingClass,
        props.class,
      )
    "
    :style="cardStyle"
  >
    <slot />
  </div>
</template>
