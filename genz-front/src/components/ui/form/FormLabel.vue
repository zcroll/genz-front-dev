<template>
  <label class="form-label" :class="props.class">
    <slot></slot>
    <span v-if="required" class="required-indicator">*</span>
  </label>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface Props {
  required?: boolean;
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

</script>

<style scoped>
.form-label {
  display: block;
  margin-bottom: 0.5rem; /* Or your preferred spacing */
  font-weight: 500; /* Example styling */
}

.required-indicator {
  color: red; /* Or your theme's error/required color */
  margin-left: 0.25rem;
}
</style>
