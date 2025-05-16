<template>
  <div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="(label, value) in options"
        :key="value"
        @click="$emit('select', value)"
        class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex-1 border hover:opacity-90"
        :class="modelValue === value ? `hover:bg-${themeColorName}-600` : ''"
        :style="{
          backgroundColor: modelValue === value
            ? `var(--${themeColorName}-500)`
            : isDarkMode ? 'rgba(40, 40, 40, 0.5)' : 'rgba(245, 245, 245, 0.5)',
          color: modelValue === value
            ? 'white'
            : 'var(--text-primary)',
          borderColor: 'var(--border-subtle)'
        }"
      >
        {{ label }}
      </button>
    </div>

    <!-- Description -->
    <div v-if="modelValue && descriptions && descriptions[modelValue]" class="mt-2 text-xs p-3 rounded" :style="{
      backgroundColor: isDarkMode ? 'rgba(40, 40, 40, 0.5)' : 'rgba(245, 245, 245, 0.5)',
      color: 'var(--text-secondary)'
    }">
      <p>{{ descriptions[modelValue] }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: null
  },
  options: {
    type: Object as () => Record<string, string>,
    required: true
  },
  descriptions: {
    type: Object as () => Record<string, string>,
    default: () => ({})
  },
  themeColorName: {
    type: String,
    default: 'blue'
  },
  isDarkMode: {
    type: Boolean,
    default: false
  }
});

defineEmits(['select']);
</script>
