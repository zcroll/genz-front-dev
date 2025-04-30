<script lang="ts" setup>
import { Slot } from 'reka-ui'
import { useFormField } from './useFormField'
import { useField } from 'vee-validate'

const { error, formItemId, formDescriptionId, formMessageId, name } = useFormField()

// Get the field value and other field properties
const { value: modelValue, errorMessage, handleBlur, handleChange } = useField(name, undefined, {
  validateOnValueUpdate: false,
})
</script>

<template>
  <Slot
    :id="formItemId"
    data-slot="form-control"
    :aria-describedby="!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`"
    :aria-invalid="!!error"
  >
    <slot
      :model-value="modelValue"
      :error="errorMessage"
      :onUpdate:modelValue="handleChange"
      :onBlur="handleBlur"
    />
  </Slot>
</template>
