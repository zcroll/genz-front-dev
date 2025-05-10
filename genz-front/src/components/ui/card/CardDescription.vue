<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme/themeStore'

const props = defineProps<{
  class?: HTMLAttributes['class'],
  variant?: 'default' | 'themed' | 'frosted'
}>()

const themeStore = useThemeStore()

// Determine description style based on variant
const descriptionStyle = computed(() => {
  if (props.variant === 'frosted') {
    return {
      color: 'var(--text-secondary)'
    }
  }
  return {}
})
</script>

<template>
  <p
    data-slot="card-description"
    :class="cn('text-muted-foreground text-sm', props.class)"
    :style="descriptionStyle"
  >
    <slot />
  </p>
</template>
