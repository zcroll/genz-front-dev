<template>
  <div class="relative dropdown-container">
    <div class="relative">
      <SearchInput
        v-model="searchQuery"
        :placeholder="placeholder"
        :theme-color-name="themeColorName"
        :is-dark-mode="isDarkMode"
        @focus="showDropdown = true"
        @click="showDropdown = true"
      />
    </div>

    <!-- Dropdown for options -->
    <div
      v-if="showDropdown && filteredOptions.length > 0"
      class="absolute z-10 mt-1 w-full rounded-md shadow-lg border"
      :style="{
        backgroundColor: 'var(--content-surface-primary)',
        borderColor: 'var(--border-subtle)'
      }"
    >
      <div class="max-h-60 overflow-y-auto py-1 custom-scrollbar">
        <div
          v-for="option in filteredOptions"
          :key="option.id"
          @click.stop="selectOption(option.id)"
          class="px-3 py-2 cursor-pointer text-sm"
          :class="{
            'bg-gray-100 dark:bg-gray-700': selectedOptions.includes(option.id)
          }"
          :style="{
            color: 'var(--text-primary)',
            ':hover': { backgroundColor: isDarkMode ? 'rgba(50, 50, 50, 0.5)' : 'rgba(240, 240, 240, 0.5)' }
          }"
        >
          {{ option.name }}
        </div>
      </div>
    </div>

    <!-- No results message -->
    <div
      v-if="showDropdown && searchQuery && filteredOptions.length === 0"
      class="absolute z-10 mt-1 w-full rounded-md shadow-lg p-3 text-sm text-center border"
      :style="{
        backgroundColor: 'var(--content-surface-primary)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-secondary)'
      }"
    >
      No matching {{ optionsLabel }} found
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import SearchInput from './SearchInput.vue';
import type { FilterOption } from '@/types/career';

const props = defineProps({
  options: {
    type: Array as () => FilterOption[],
    required: true
  },
  selectedOptions: {
    type: Array as () => number[],
    required: true
  },
  placeholder: {
    type: String,
    default: 'Search...'
  },
  optionsLabel: {
    type: String,
    default: 'options'
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

const emit = defineEmits(['select', 'close']);

const searchQuery = ref('');
const showDropdown = ref(false);

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options;

  const query = searchQuery.value.toLowerCase();
  return props.options.filter(option =>
    option.name.toLowerCase().includes(query)
  );
});

watch(searchQuery, () => {
  if (searchQuery.value.length > 0) {
    showDropdown.value = true;
  }
});

const selectOption = (id: number) => {
  emit('select', id);
  searchQuery.value = ''; // Clear search after selection
  showDropdown.value = false; // Close dropdown after selection
};

defineExpose({
  showDropdown,
  closeDropdown: () => {
    showDropdown.value = false;
  }
});
</script>

<style scoped>
/* Scrollbar styling */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}
</style>
