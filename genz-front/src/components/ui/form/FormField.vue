<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, computed, inject, toRefs, type Ref, ref } from 'vue';

interface Props {
  name: string;
}

const props = defineProps<Props>();
const { name } = toRefs(props);

provide('fieldName', name);

// Inject errors from the parent Form component
const formErrors = inject<Ref<Record<string, string>>>('formErrors', ref({}));
const error = computed(() => formErrors.value[name.value]);
provide('fieldError', error);

// Inject formValues and updateFieldValue from parent Form
const formValues = inject<Ref<Record<string, any>>>('formValues', ref({}));
const updateFieldValue = inject<(name: string, value: any) => void>('updateFieldValue');
const validateField = inject<(name: string) => Promise<void>>('validateField');

const fieldValue = computed({
  get: () => formValues.value[name.value],
  set: (value) => {
    if (updateFieldValue) {
      updateFieldValue(name.value, value);
    }
  }
});

provide('fieldValue', fieldValue);
provide('validateCurrentField', () => {
  if (validateField) {
    return validateField(name.value);
  }
  return Promise.resolve();
});
</script> 