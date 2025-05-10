<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme/themeStore'

const props = defineProps<{
  class?: HTMLAttributes['class'],
  variant?: 'default' | 'themed' | 'frosted',
  padding?: 'default' | 'horizontal' | 'vertical' | 'none'
}>()

const themeStore = useThemeStore()

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

// Determine footer style based on variant
const footerStyle = computed(() => {
  if (props.variant === 'frosted') {
    return {
      color: 'var(--text-secondary)'
    }
  }
  return {}
})
</script>

<template>
  <div
    data-slot="card-footer"
    :class="cn('flex items-center [.border-t]:pt-6', paddingClass, props.class)"
    :style="footerStyle"
  >
    <slot />
  </div>
</template>
