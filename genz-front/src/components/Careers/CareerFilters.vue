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
            placeholder="Search careers"
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
          <!-- Industries Filter -->
          <div :class="[
            'filter-section transition-all duration-200 rounded-lg p-4',
            themeStore.isDarkMode
              ? 'bg-gray-900/50 border-gray-800/30'
              : 'bg-white/50 border-white/20'
          ]">
            <label class="filter-label flex items-center gap-2 mb-3 font-medium">
              <BuildingOfficeIcon :class="[
                'h-4 w-4',
                themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'
              ]" />
              <span :class="[
                themeStore.isDarkMode ? 'text-gray-200' : 'text-gray-700'
              ]">
                Industries
              </span>
            </label>

            <!-- Selected Industries Tags -->
            <div v-if="selectedIndustries.length > 0" class="flex flex-wrap gap-2 mb-3">
              <div 
                v-for="industry in selectedIndustriesWithNames" 
                :key="industry.id"
                :class="[
                  'inline-flex items-center px-2 py-1 rounded-full text-xs',
                  themeStore.isDarkMode
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-gray-200 text-gray-800'
                ]"
              >
                {{ industry.name }}
                <button 
                  @click.stop="removeIndustry(industry.id)"
                  class="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <span class="sr-only">Remove</span>
                  <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Search for industries with dropdown -->
            <div class="relative industry-dropdown-container">
              <div class="relative">
                <Search class="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3"
                  :class="[`text-${themeStore.color}-${themeStore.isDarkMode ? '400' : '500'}`]" />
                <input
                  v-model="industrySearchQuery"
                  type="search"
                  placeholder="Search and select industries"
                  @focus="showIndustryDropdown = true"
                  @click.stop="showIndustryDropdown = true"
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
              
              <!-- Dropdown for industries -->
              <div 
                v-if="showIndustryDropdown && filteredIndustries.length > 0" 
                class="absolute z-10 mt-1 w-full rounded-md shadow-lg"
                :class="[
                  themeStore.isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
                ]"
              >
                <div class="max-h-60 overflow-y-auto py-1 custom-scrollbar">
                  <div 
                    v-for="industry in filteredIndustries" 
                    :key="industry.id"
                    @click.stop="addIndustry(industry.id)"
                    class="px-3 py-2 cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    :class="[
                      themeStore.isDarkMode ? 'text-gray-200' : 'text-gray-700',
                      selectedIndustries.includes(industry.id) ? 'bg-gray-100 dark:bg-gray-700' : ''
                    ]"
                  >
                    {{ industry.name }}
                  </div>
                </div>
              </div>
              
              <!-- No results message -->
              <div 
                v-if="showIndustryDropdown && industrySearchQuery && filteredIndustries.length === 0" 
                class="absolute z-10 mt-1 w-full rounded-md shadow-lg p-3 text-sm text-center"
                :class="[
                  themeStore.isDarkMode
                    ? 'bg-gray-800 border border-gray-700 text-gray-400'
                    : 'bg-white border border-gray-200 text-gray-500'
                ]"
              >
                No matching industries found
              </div>
            </div>
          </div>

          <!-- Sort Options -->
          <div :class="[
            'filter-section transition-all duration-200 rounded-lg p-4',
            themeStore.isDarkMode
              ? 'bg-gray-900/50 border-gray-800/30'
              : 'bg-white/50 border-white/20'
          ]">
            <label class="filter-label flex items-center gap-2 mb-3 font-medium">
              <ArrowsUpDownIcon :class="[
                'h-4 w-4',
                themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'
              ]" />
              <span :class="[
                themeStore.isDarkMode ? 'text-gray-200' : 'text-gray-700'
              ]">
                Sort By
              </span>
            </label>

            <div class="space-y-2">
              <div class="flex items-center">
                <input
                  type="radio"
                  id="sort-default"
                  :value="null"
                  v-model="selectedSort"
                  @change="handleFilterChange"
                  class="rounded-full text-amber-500 focus:ring-amber-500"
                />
                <label for="sort-default" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Default
                </label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  id="sort-name"
                  value="name"
                  v-model="selectedSort"
                  @change="handleFilterChange"
                  class="rounded-full text-amber-500 focus:ring-amber-500"
                />
                <label for="sort-name" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Name (A-Z)
                </label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  id="sort-name-desc"
                  value="-name"
                  v-model="selectedSort"
                  @change="handleFilterChange"
                  class="rounded-full text-amber-500 focus:ring-amber-500"
                />
                <label for="sort-name-desc" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Name (Z-A)
                </label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  id="sort-salary"
                  value="salary"
                  v-model="selectedSort"
                  @change="handleFilterChange"
                  class="rounded-full text-amber-500 focus:ring-amber-500"
                />
                <label for="sort-salary" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Salary (Low to High)
                </label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  id="sort-salary-desc"
                  value="-salary"
                  v-model="selectedSort"
                  @change="handleFilterChange"
                  class="rounded-full text-amber-500 focus:ring-amber-500"
                />
                <label for="sort-salary-desc" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Salary (High to Low)
                </label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  id="sort-satisfaction"
                  value="satisfaction_raw"
                  v-model="selectedSort"
                  @change="handleFilterChange"
                  class="rounded-full text-amber-500 focus:ring-amber-500"
                />
                <label for="sort-satisfaction" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Satisfaction (Low to High)
                </label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  id="sort-satisfaction-desc"
                  value="-satisfaction_raw"
                  v-model="selectedSort"
                  @change="handleFilterChange"
                  class="rounded-full text-amber-500 focus:ring-amber-500"
                />
                <label for="sort-satisfaction-desc" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Satisfaction (High to Low)
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
            Use the filters above to narrow down your career search results.
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
import { BuildingOfficeIcon, ArrowsUpDownIcon } from '@heroicons/vue/24/outline';
import { useThemeStore } from '@/stores/theme';
import { fetchCareerFilterOptions } from '@/services/careerService';
import type { CareerFilterParams, FilterOption } from '@/types/career';

const emit = defineEmits(['update:filters', 'reset']);
const themeStore = useThemeStore();

// Loading state
const isLoading = ref(true);

// Filter state
const searchQuery = ref('');
const selectedIndustries = ref<number[]>([]);
const industrySearchQuery = ref('');
const showIndustryDropdown = ref(false);
const selectedSort = ref<string | null>(null);

// Filter options from API
const industries = ref<FilterOption[]>([]);

// Computed properties
const filteredIndustries = computed(() => {
  if (!industrySearchQuery.value) return industries.value;

  const query = industrySearchQuery.value.toLowerCase();
  return industries.value.filter(industry =>
    industry.name.toLowerCase().includes(query)
  );
});

const selectedIndustriesWithNames = computed(() => {
  return selectedIndustries.value.map(id => {
    const industry = industries.value.find(i => i.id === id);
    return {
      id,
      name: industry ? industry.name : `Industry ${id}`
    };
  });
});

// Fetch filter options from API
const fetchFilterOptions = async () => {
  try {
    isLoading.value = true;
    const response = await fetchCareerFilterOptions();

    if (response.success && response.data) {
      industries.value = response.data.industries || [];
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

// Watch for changes in industry search query
watch(industrySearchQuery, () => {
  if (industrySearchQuery.value.length > 0) {
    showIndustryDropdown.value = true;
  }
});

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  // Only process if dropdown is open
  if (showIndustryDropdown.value) {
    // Check if click is outside the dropdown container
    const isClickOutside = !event.target.closest('.industry-dropdown-container');
    
    if (isClickOutside) {
      showIndustryDropdown.value = false;
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

// Add an industry to the selected industries
const addIndustry = (industryId: number) => {
  if (!selectedIndustries.value.includes(industryId)) {
    selectedIndustries.value.push(industryId);
    emitFilters();
  }
  industrySearchQuery.value = ''; // Clear search after selection
  showIndustryDropdown.value = false; // Close dropdown after selection
};

// Remove an industry from the selected industries
const removeIndustry = (industryId: number) => {
  selectedIndustries.value = selectedIndustries.value.filter(id => id !== industryId);
  emitFilters();
};

const emitFilters = () => {
  // Create an empty filter object
  const filters: CareerFilterParams = {};

  // Add name search filter
  if (searchQuery.value) {
    filters.name = searchQuery.value;
  }

  // Add industry ids filter
  if (selectedIndustries.value.length > 0) {
    filters.industry_ids = selectedIndustries.value;
  }

  // Add sort option
  if (selectedSort.value) {
    filters.sort = selectedSort.value;
  }

  emit('update:filters', filters);
};

const handleFilterChange = () => {
  emitFilters();
};

const resetAllFilters = () => {
  searchQuery.value = '';
  selectedIndustries.value = [];
  industrySearchQuery.value = '';
  selectedSort.value = null;
  showIndustryDropdown.value = false;
  emit('reset');
};
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
