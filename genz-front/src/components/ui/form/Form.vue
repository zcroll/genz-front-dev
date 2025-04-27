<script setup lang="ts">
import { computed, provide, toRef } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps<{
  id?: string
  schema?: any
  initialValues?: Record<string, any>
}>()

const emit = defineEmits(['submit'])

const form = useForm({
  validationSchema: props.schema,
  initialValues: props.initialValues,
})

provide('form', form)

const handleSubmit = form.handleSubmit((values) => {
  emit('submit', values)
})

const formId = computed(() => props.id || 'form')
</script>

<template>
  <form :id="formId" @submit.prevent="handleSubmit" class="space-y-6">
    <slot :form="form" />
  </form>
</template>
