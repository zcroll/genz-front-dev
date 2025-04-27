<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  id?: string
  name?: string
  class?: string
  error?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'blur'])

const inputClass = computed(() => {
  return [
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    props.error ? 'border-red-500' : '',
    props.class
  ]
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function onBlur(event: Event) {
  emit('blur', event)
}
</script>

<template>
  <input
    :id="id"
    :name="name"
    :type="type || 'text'"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="inputClass"
    @input="onInput"
    @blur="onBlur"
  />
</template>