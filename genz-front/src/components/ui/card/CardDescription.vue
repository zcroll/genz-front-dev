<template>
  <p :class="cn('text-sm text-muted-foreground', className)" v-bind="$attrs">
    <slot />
  </p>
</template>

<script lang="ts" setup>
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false
})

defineProps<{
  className?: string
}>()
</script>