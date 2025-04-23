<template>
  <div :class="cn('p-6 pt-0', className)" v-bind="$attrs">
    <slot />
  </div>
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