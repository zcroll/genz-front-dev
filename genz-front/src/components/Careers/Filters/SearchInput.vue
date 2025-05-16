<template>
  <div class="relative">
    <Search 
      class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" 
      :style="{ color: `var(--${themeColorName}-500)` }" 
    />
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="search"
      :placeholder="placeholder"
      @focus="$emit('focus')"
      @click.stop="$emit('click', $event)"
      class="w-full h-10 pl-10 pr-3 rounded-lg shadow-sm transition-colors duration-200 text-sm border focus:outline-none"
      :class="`focus:ring-2 focus:ring-${themeColorName}-500 focus:border-${themeColorName}-500`"
      :style="{
        backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.5)' : 'rgba(255, 255, 255, 0.5)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)'
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next';

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search...'
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

defineEmits(['update:modelValue', 'focus', 'click']);
</script>
