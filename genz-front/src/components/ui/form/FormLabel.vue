<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  for?: string
  required?: boolean
  class?: string
}>()

const labelClass = computed(() => {
  return [
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    props.class
  ]
})
</script>

<template>
  <label :for="for" :class="labelClass">
    <slot />
    <span v-if="required" class="text-red-500 ml-1">*</span>
  </label>
</template>