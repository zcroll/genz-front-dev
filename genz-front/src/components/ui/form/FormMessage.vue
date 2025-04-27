<script setup lang="ts">
import { inject, computed } from 'vue'

const props = defineProps<{
  class?: string
}>()

const field = inject('field')

const errorMessage = computed(() => {
  return field?.errorMessage?.value
})

const hasError = computed(() => {
  return !!errorMessage.value && field?.meta?.touched
})

const messageClass = computed(() => {
  return [
    'text-sm font-medium text-red-500',
    props.class
  ]
})
</script>

<template>
  <div v-if="hasError" :class="messageClass">
    {{ errorMessage }}
  </div>
</template>