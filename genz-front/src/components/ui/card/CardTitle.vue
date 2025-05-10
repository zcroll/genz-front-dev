<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme/themeStore'

const props = defineProps<{
  class?: HTMLAttributes['class'],
  variant?: 'default' | 'themed' | 'frosted',
  size?: 'default' | 'large' | 'small'
}>()

const themeStore = useThemeStore()

// Determine size class based on size prop
const sizeClass = computed(() => {
  switch (props.size) {
    case 'large':
      return 'text-xl'
    case 'small':
      return 'text-base'
    default:
      return 'text-lg'
  }
})

// Determine title style based on variant
const titleStyle = computed(() => {
  if (props.variant === 'frosted') {
    return {
      color: 'var(--text-primary)'
    }
  }
  return {}
})
</script>

<template>
  <h3
    data-slot="card-title"
    :class="cn('leading-none font-semibold', sizeClass, props.class)"
    :style="titleStyle"
  >
    <slot />
  </h3>
</template>
