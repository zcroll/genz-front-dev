<script setup lang="ts">
import { inject } from 'vue'

defineProps<{
  class?: string
}>()

const field = inject('field')
</script>

<template>
  <div >
    <slot :field="field" />
  </div>
</template>