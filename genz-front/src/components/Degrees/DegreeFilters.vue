<template>
  <div class="sticky top-20 transition-all duration-200" style="max-height: calc(100vh - 6rem);">
    <div :class="[
      'backdrop-blur-xl rounded-3xl border shadow-sm overflow-hidden',
      themeStore.isDarkMode ? 'dark:bg-gray-800/40' : 'bg-white/40',
      themeStore.isDarkMode ? `border-gray-700` : `border-gray-200`
    ]">
      <!-- Header -->
      <div :class="[
        'p-6 border-b',
        themeStore.isDarkMode ? 'border-gray-800/20 bg-gray-900/30' : 'border-gray-100/20 bg-gray-50/50'
      ]">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
            :class="[`text-${themeStore.color}-${themeStore.isDarkMode ? '400' : '500'}`]" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search degrees"
            :class="[
              'w-full h-11 pl-10 rounded-3xl shadow-sm transition-colors duration-200',
              themeStore.isDarkMode
                ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-400'
                : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500',
              `focus:border-${themeStore.color}-${themeStore.isDarkMode ? '500' : '400'}`,
              `focus:ring-${themeStore.color}-${themeStore.isDarkMode ? '500' : '400'}`
            ]"
            @input="debouncedSearch"
          />
        </div>
      </div>

      <!-- Scrollable Content -->
      <div class="p-6 space-y-6 overflow-y-auto" style="max-height: calc(100vh - 12rem);">
        <!-- Filter Groups -->
        <div class="space-y-4">
          <div :class="[
            'filter-section transition-all duration-200',
            themeStore.isDarkMode
              ? 'bg-gray-900/50 border-gray-800/30'
              : 'bg-white/50 border-white/20'
          ]">
            <label class="filter-label">
              <AcademicCapIcon :class="[
                'h-4 w-4',
                themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'
              ]" />
              <span :class="[
                themeStore.isDarkMode ? 'text-gray-200' : 'text-gray-700'
              ]">
                Degree Levels
              </span>
            </label>

            <!-- Simple checkboxes instead of CustomMultiSelect -->
            <div class="space-y-2 mt-3">
              <div v-for="option in degreeTypeOptions" :key="option.value" class="flex items-center">
                <input
                  type="checkbox"
                  :id="option.value"
                  :value="option.value"
                  v-model="selectedTypes"
                  @change="handleFilterChange"
                  class="rounded text-amber-500 focus:ring-amber-500"
                />
                <label :for="option.value" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {{ option.label }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Reset Button -->
        <div class="mt-4">
          <button
            @click="resetAllFilters"
            :class="[
              'w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200',
              themeStore.isDarkMode
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            ]"
          >
            Reset Filters
          </button>
        </div>

        <!-- Help Section -->
        <div :class="[
          'mt-8 p-4 rounded-lg border transition-colors duration-200',
          themeStore.isDarkMode
            ? 'bg-gray-900/30 border-gray-800/30 text-gray-300'
            : 'bg-gray-50/50 border-gray-100/20 text-gray-600'
        ]">
          <h4 :class="[
            'text-sm font-medium mb-2',
            themeStore.isDarkMode ? 'text-gray-200' : 'text-gray-700'
          ]">
            Need Help?
          </h4>
          <p class="text-sm">
            Use the filters above to narrow down your degree search results.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { debounce } from 'lodash';
import { Search } from 'lucide-vue-next';
import { AcademicCapIcon } from '@heroicons/vue/24/outline';
import { useThemeStore } from '@/stores/theme';

const emit = defineEmits(['update:filters', 'reset']);
const themeStore = useThemeStore();

// Filter state
const searchQuery = ref('');
const selectedTypes = ref([]);

const degreeTypeOptions = [
  { value: "Associate", label: "Associate" },
  { value: "Bachelor's", label: "Bachelor's" },
  { value: "Master's", label: "Master's" },
  { value: "Doctorate", label: "Doctorate" }
];

// Methods
const debouncedSearch = debounce(() => {
  emitFilters();
}, 300);

const emitFilters = () => {
  const filters = {};
  if (searchQuery.value) filters.q = searchQuery.value;
  if (selectedTypes.value.length) {
    filters.type = selectedTypes.value;
  }
  emit('update:filters', filters);
};

const handleFilterChange = () => {
  emitFilters();
};

const resetAllFilters = () => {
  searchQuery.value = '';
  selectedTypes.value = [];
  emit('reset');
};
</script>

<style scoped>
/* Same styles as JobFilters.vue */
.filter-section {
  padding: 1rem;
}

.filter-label {
}

/* Transitions */
.filter-tags-enter-active,
.filter-tags-leave-active {
  transition: all 0.3s ease;
}

.filter-tags-enter-from,
.filter-tags-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.filter-tag-enter-active,
.filter-tag-leave-active {
  transition: all 0.2s ease;
}

.filter-tag-enter-from,
.filter-tag-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Scrollbar styling */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}


</style>
