<template>
  <div>
    <slot
      :model-value="fieldValue?.value"
      :error="fieldError.value"
      :update:modelValue="onUpdateModelValueEvent"
      :blur="onBlurEvent"
    ></slot>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, type Ref, type ComputedRef } from 'vue'

const emit = defineEmits(['update:modelValue', 'blur'])

const fieldValue = inject<ComputedRef<any> | undefined>('fieldValue')
// Ensure fieldError is always a ComputedRef
const fieldError = inject<ComputedRef<string | undefined>>('fieldError', computed(() => undefined));
const updateFieldValue = inject<(name: string, value: any) => void>('updateFieldValue')
const validateCurrentField = inject<() => Promise<void>>('validateCurrentField')
const fieldName = inject<Ref<string> | undefined>('fieldName')

const onUpdateModelValueEvent = (value: any) => {
  if (updateFieldValue && fieldName?.value && typeof fieldName.value === 'string') {
    updateFieldValue(fieldName.value, value)
  }
  emit('update:modelValue', value)
}

const onBlurEvent = async () => {
  if (validateCurrentField) {
    await validateCurrentField()
  }
  emit('blur')
}
</script>
