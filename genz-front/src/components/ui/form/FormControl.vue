<script setup lang="ts">
import { inject, computed } from 'vue'

defineProps<{
  class?: string
}>()

const field = inject('field')

// Pass these to the input component
const modelValue = computed(() => field?.value?.value)
const hasError = computed(() => {
  return !!field?.errorMessage?.value && field?.meta?.touched
})

// Handle input events
function handleInput(value) {
  field?.handleChange(value)
}

function handleBlur(event) {
  field?.handleBlur()
}
</script>

<template>
  <div>
    <slot 
      :modelValue="modelValue"
      :error="hasError"
      :onUpdate:modelValue="handleInput"
      :onBlur="handleBlur"
    />
  </div>
</template>
