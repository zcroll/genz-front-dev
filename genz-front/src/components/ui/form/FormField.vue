<script setup lang="ts">
import { inject, provide, computed } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps<{
  name: string
}>()

const form = inject('form')

const { value, errorMessage, handleBlur, handleChange, meta } = useField(() => props.name, undefined, {
  validateOnValueUpdate: false,
})

provide('field', {
  value,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
})

const hasError = computed(() => {
  return !!errorMessage.value && meta.touched
})
</script>

<template>
  <div class="space-y-2">
    <slot
      :hasError="hasError"
      :value="value"
      :errorMessage="errorMessage"
      :handleBlur="handleBlur"
      :handleChange="handleChange"
      :meta="meta"
    />
  </div>
</template>