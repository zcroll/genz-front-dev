<script lang="ts" setup>
import { inject, computed, type ComputedRef, type HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const fieldError = inject<ComputedRef<string | undefined>>('fieldError', computed(() => undefined))
</script>

<template>
  <div v-if="fieldError.value" class="form-message error-message" :class="props.class">
    {{ fieldError.value }}
  </div>
</template>

<style scoped>
.form-message {
  margin-top: 0.25rem; /* Or your preferred spacing */
  font-size: 0.875rem; /* Or your preferred font size */
}

.error-message {
  color: red; /* Or your theme's error color */
}
</style>
