<template>
  <div class="filter-section transition-all duration-200 rounded-lg p-4" :style="{
    backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.5)' : 'rgba(255, 255, 255, 0.5)',
    borderColor: 'var(--border-subtle)'
  }">
    <div class="flex items-center justify-between mb-3">
      <label class="filter-label flex items-center gap-2 font-medium">
        <component :is="icon" class="h-4 w-4" :style="{ color: 'var(--text-tertiary)' }" />
        <span class="text-sm" :style="{ color: 'var(--text-primary)' }">
          {{ title }}
        </span>
      </label>
      <slot name="actions"></slot>
    </div>
    
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    required: true
  },
  isDarkMode: {
    type: Boolean,
    default: false
  }
});
</script>
