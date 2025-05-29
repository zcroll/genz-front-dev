<template>
  <form @submit.prevent="handleSubmit">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import type { ObjectSchema } from 'yup';

interface Props {
  schema: ObjectSchema<any>;
}

const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const errors = ref<Record<string, string>>({});
provide('formErrors', errors);

const formValues = ref<Record<string, any>>({});
provide('formValues', formValues);

const updateFieldValue = (name: string, value: any) => {
  formValues.value[name] = value;
  if (errors.value[name]) {
    delete errors.value[name]; // Clear error on change
  }
};
provide('updateFieldValue', updateFieldValue);

const validateField = async (name: string) => {
  try {
    await props.schema.validateAt(name, formValues.value);
    delete errors.value[name];
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      errors.value[name] = err.message;
    }
  }
};
provide('validateField', validateField);

const handleSubmit = async () => {
  try {
    errors.value = {}; // Clear previous errors
    await props.schema.validate(formValues.value, { abortEarly: false });
    emit('submit', { ...formValues.value });
  } catch (err: any) {
    if (err.name === 'ValidationError' && err.inner) {
      err.inner.forEach((validationError: any) => {
        if (validationError.path) {
          errors.value[validationError.path] = validationError.message;
        }
      });
    } else if (err.name === 'ValidationError') {
        // Handle cases where err.inner might not be present (e.g. global schema errors not tied to a specific path)
        // For now, we'll log this, but you might want a more robust global error display
        console.error("Global validation error:", err.message);
    }
    // Optionally, you could emit an error event here
    // emit('error', errors.value);
  }
};
</script> 