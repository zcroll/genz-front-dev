<template>
  <component
    :is="as"
    :class="cn('text-2xl font-semibold leading-none tracking-tight', className)"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false
})

defineProps<{
  as?: string
  className?: string
}>()

defineDefaults({
  as: 'h3'
})
</script>