<template>
  <div v-if="tags.length > 0" class="flex flex-wrap gap-2 mb-3">
    <div
      v-for="tag in tags"
      :key="tag.id"
      class="inline-flex items-center px-3 py-1 rounded-full text-xs"
      :style="{
        backgroundColor: isDarkMode ? 'rgba(50, 50, 50, 0.8)' : 'rgba(240, 240, 240, 0.8)',
        color: 'var(--text-primary)'
      }"
    >
      {{ tag.name }}
      <button
        @click.stop="$emit('remove', tag.id)"
        class="ml-1 hover:opacity-80"
        :style="{ color: 'var(--text-secondary)' }"
      >
        <span class="sr-only">Remove</span>
        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  tags: {
    type: Array as () => Array<{ id: number | string, name: string }>,
    required: true
  },
  isDarkMode: {
    type: Boolean,
    default: false
  }
});

defineEmits(['remove']);
</script>
