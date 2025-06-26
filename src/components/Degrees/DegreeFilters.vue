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
        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center py-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2" :class="`border-${themeStore.color}-500`"></div>
        </div>

        <!-- Filter Groups -->
        <div v-else class="space-y-6">
          <!-- Academic Areas Filter -->
          <div :class="[
            'filter-section transition-all duration-200 rounded-lg p-4',
            themeStore.isDarkMode
              ? 'bg-gray-900/50 border-gray-800/30'
              : 'bg-white/50 border-white/20'
          ]">
            <label class="filter-label flex items-center gap-2 mb-3 font-medium">
              <BookOpenIcon :class="[
                'h-4 w-4',
                themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'
              ]" />
              <span :class="[
                themeStore.isDarkMode ? 'text-gray-200' : 'text-gray-700'
              ]">
                Area of Study
              </span>
            </label>

            <!-- Selected Areas Tags -->
            <div v-if="selectedAreas.length > 0" class="flex flex-wrap gap-2 mb-3">
              <div
                v-for="area in selectedAreas"
                :key="area"
                :class="[
                  'inline-flex items-center px-2 py-1 rounded-full text-xs',
                  themeStore.isDarkMode
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-gray-200 text-gray-800'
                ]"
              >
                {{ area }}
                <button
                  @click.stop="removeArea(area)"
                  class="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <span class="sr-only">Remove</span>
                  <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Search for areas with dropdown -->
            <div class="relative area-dropdown-container">
              <div class="relative">
                <Search class="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3"
                  :class="[`text-${themeStore.color}-${themeStore.isDarkMode ? '400' : '500'}`]" />
                <input
                  v-model="areaSearchQuery"
                  type="search"
                  placeholder="Search and select areas of study"
                  @focus="showAreaDropdown = true"
                  @click.stop="showAreaDropdown = true"
                  :class="[
                    'w-full h-10 pl-7 pr-2 rounded-lg shadow-sm transition-colors duration-200 text-sm',
                    themeStore.isDarkMode
                      ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-400'
                      : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500',
                    `focus:border-${themeStore.color}-${themeStore.isDarkMode ? '500' : '400'}`,
                    `focus:ring-${themeStore.color}-${themeStore.isDarkMode ? '500' : '400'}`
                  ]"
                />
              </div>

              <!-- Dropdown for areas -->
              <div
                v-if="showAreaDropdown && filteredAreas.length > 0"
                class="absolute z-10 mt-1 w-full rounded-md shadow-lg"
                :class="[
                  themeStore.isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
                ]"
              >
                <div class="max-h-60 overflow-y-auto py-1 custom-scrollbar">
                  <div
                    v-for="area in filteredAreas"
                    :key="area.name"
                    @click.stop="addArea(area.name)"
                    class="px-3 py-2 cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    :class="[
                      themeStore.isDarkMode ? 'text-gray-200' : 'text-gray-700',
                      selectedAreas.includes(area.name) ? 'bg-gray-100 dark:bg-gray-700' : ''
                    ]"
                  >
                    {{ area.name }}
                  </div>
                </div>
              </div>

              <!-- No results message -->
              <div
                v-if="showAreaDropdown && areaSearchQuery && filteredAreas.length === 0"
                class="absolute z-10 mt-1 w-full rounded-md shadow-lg p-3 text-sm text-center"
                :class="[
                  themeStore.isDarkMode
                    ? 'bg-gray-800 border border-gray-700 text-gray-400'
                    : 'bg-white border border-gray-200 text-gray-500'
                ]"
              >
                No matching areas found
              </div>
            </div>
          </div>
        </div>

        <!-- Reset Button -->
        <div class="mt-4">
          <Button
            @click="resetAllFilters"
            :class="[
              'w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200',

            ]"
          >
            Reset Filters
          </Button>
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

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { debounce } from 'lodash';
import { Search } from 'lucide-vue-next';
import { AcademicCapIcon, BookOpenIcon } from '@heroicons/vue/24/outline';
import { useThemeStore } from '@/stores/theme';
import { fetchDegreeFilterOptions } from '@/services/degreeService';
import type { DegreeFilterParams } from '@/types/degree';
import {Button} from "@/components/ui/button";

const emit = defineEmits(['update:filters', 'reset']);
const themeStore = useThemeStore();

// Loading state
const isLoading = ref(true);

// Filter state
const searchQuery = ref('');
const selectedAreas = ref([]);
const areaSearchQuery = ref('');
const showAreaDropdown = ref(false);

// Filter options from API
const degreeLevels = ref([]);
const academicAreas = ref([]);

// Filtered areas based on search
const filteredAreas = computed(() => {
  if (!areaSearchQuery.value) return academicAreas.value;

  const query = areaSearchQuery.value.toLowerCase();
  return academicAreas.value.filter(area =>
    area.name.toLowerCase().includes(query)
  );
});

// Fetch filter options from API
const fetchFilterOptions = async () => {
  try {
    isLoading.value = true;
    const response = await fetchDegreeFilterOptions();

    if (response.success && response.data) {
      degreeLevels.value = response.data.degree_levels || [];
      academicAreas.value = response.data.areas || [];
    }
  } catch (error) {
    console.error('Error fetching filter options:', error);
  } finally {
    isLoading.value = false;
  }
};

// Methods
const debouncedSearch = debounce(() => {
  emitFilters();
}, 300);

// Watch for changes in search query
watch(searchQuery, () => {
  debouncedSearch();
});

// Watch for changes in area search query
watch(areaSearchQuery, () => {
  if (areaSearchQuery.value.length > 0) {
    showAreaDropdown.value = true;
  }
});

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  // Only process if dropdown is open
  if (showAreaDropdown.value) {
    // Check if click is outside the dropdown container
    const isClickOutside = !event.target.closest('.area-dropdown-container');

    if (isClickOutside) {
      showAreaDropdown.value = false;
      console.log('Closing dropdown due to outside click');
    }
  }
};

// Add event listener for click outside
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  fetchFilterOptions();
});

// Remove event listener when component is unmounted
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Add an area to the selected areas
const addArea = (areaName) => {
  if (!selectedAreas.value.includes(areaName)) {
    selectedAreas.value.push(areaName);
    emitFilters();
  }
  areaSearchQuery.value = ''; // Clear search after selection
  showAreaDropdown.value = false; // Close dropdown after selection
};

// Remove an area from the selected areas
const removeArea = (areaName) => {
  selectedAreas.value = selectedAreas.value.filter(area => area !== areaName);
  emitFilters();
};

const emitFilters = () => {
  // Create an empty filter object
  const filters: DegreeFilterParams = {};

  // Add name search filter
  if (searchQuery.value) {
    filters.name = searchQuery.value;
  }

  // Add area names filter
  if (selectedAreas.value.length > 0) {
    filters.area_names = selectedAreas.value;
  }

  emit('update:filters', filters);
};

const handleFilterChange = () => {
  emitFilters();
};

const resetAllFilters = () => {
  searchQuery.value = '';
  selectedAreas.value = [];
  areaSearchQuery.value = '';
  showAreaDropdown.value = false;
  emit('reset');
};

// Note: We already have an onMounted hook above that includes fetchFilterOptions
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
