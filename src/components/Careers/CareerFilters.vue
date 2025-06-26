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
          <div class="animate-spin rounded-full h-8 w-8 border-b-2" :class="`border-${themeColorName}-500`"></div>
        </div>

        <!-- Filter Groups -->
        <div v-else class="space-y-6">
          <!-- Related Degrees Filter -->
          <div :class="[
            'filter-section transition-all duration-200 rounded-lg p-4',
            themeStore.isDarkMode
              ? 'bg-gray-900/50 border-gray-800/30'
              : 'bg-white/50 border-white/20'
          ]">
            <label class="filter-label flex items-center gap-2 mb-3 font-medium">
              <AcademicCapIcon :class="[
                'h-4 w-4',
                themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'
              ]" />
              <span :class="[
                themeStore.isDarkMode ? 'text-gray-200' : 'text-gray-700'
              ]">
                Related Degrees
              </span>
            </label>

            <!-- Selected Degrees Tags -->
            <div v-if="selectedDegrees.length > 0" class="flex flex-wrap gap-2 mb-3">
              <div
                v-for="degree in selectedDegreesWithNames"
                :key="degree.id"
                :class="[
                  'inline-flex items-center px-2 py-1 rounded-full text-xs',
                  themeStore.isDarkMode
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-gray-200 text-gray-800'
                ]"
              >
                {{ degree.name }}
                <button
                  @click.stop="removeDegree(degree.id)"
                  class="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <span class="sr-only">Remove</span>
                  <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Search for degrees with dropdown -->
            <div class="relative degree-dropdown-container">
              <div class="relative">
                <Search class="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3"
                  :class="[`text-${themeColorName}-${themeStore.isDarkMode ? '400' : '500'}`]" />
                <input
                  v-model="degreeSearchQuery"
                  type="search"
                  placeholder="Search and select degrees"
                  @focus="showDegreeDropdown = true"
                  @click.stop="showDegreeDropdown = true"
                  :class="[
                    'w-full h-10 pl-7 pr-2 rounded-lg shadow-sm transition-colors duration-200 text-sm',
                    themeStore.isDarkMode
                      ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-400'
                      : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500',
                    `focus:border-${themeColorName}-${themeStore.isDarkMode ? '500' : '400'}`,
                    `focus:ring-${themeColorName}-${themeStore.isDarkMode ? '500' : '400'}`
                  ]"
                />
              </div>

              <!-- Dropdown for degrees -->
              <div
                v-if="showDegreeDropdown && filteredDegrees.length > 0"
                class="absolute z-10 mt-1 w-full rounded-md shadow-lg"
                :class="[
                  themeStore.isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
                ]"
              >
                <div class="max-h-60 overflow-y-auto py-1 custom-scrollbar">
                  <div
                    v-for="degree in filteredDegrees"
                    :key="degree.id"
                    @click.stop="addDegree(degree.id)"
                    class="px-3 py-2 cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    :class="[
                      themeStore.isDarkMode ? 'text-gray-200' : 'text-gray-700',
                      selectedDegrees.includes(degree.id) ? 'bg-gray-100 dark:bg-gray-700' : ''
                    ]"
                  >
                    {{ degree.name }}
                  </div>
                </div>
              </div>

              <!-- No results message -->
              <div
                v-if="showDegreeDropdown && degreeSearchQuery && filteredDegrees.length === 0"
                class="absolute z-10 mt-1 w-full rounded-md shadow-lg p-3 text-sm text-center"
                :class="[
                  themeStore.isDarkMode
                    ? 'bg-gray-800 border border-gray-700 text-gray-400'
                    : 'bg-white border border-gray-200 text-gray-500'
                ]"
              >
                No matching degrees found
              </div>
            </div>
          </div>

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
                  :class="[`text-${themeColorName}-${themeStore.isDarkMode ? '400' : '500'}`]" />
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
                    `focus:border-${themeColorName}-${themeStore.isDarkMode ? '500' : '400'}`,
                    `focus:ring-${themeColorName}-${themeStore.isDarkMode ? '500' : '400'}`
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

          <!-- Employment Filters Section -->
          <div :class="[
            'filter-section transition-all duration-200 rounded-lg p-5',
            themeStore.isDarkMode
              ? 'bg-gray-900/50 border-gray-800/30'
              : 'bg-white/50 border-white/20'
          ]">
            <!-- Section Title -->
            <div class="flex items-center justify-between mb-5">
              <h3 :class="[
                'text-lg font-medium',
                themeStore.isDarkMode ? 'text-white' : 'text-gray-800'
              ]">
                Employment
              </h3>
              <button
                @click="showEmploymentInfo = !showEmploymentInfo"
                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Show employment filter information"
              >
                <InformationCircleIcon class="h-5 w-5" />
              </button>
            </div>

            <!-- Info Panel -->
            <div
              v-if="showEmploymentInfo"
              class="mb-5 p-3 rounded-lg text-sm"
              :class="[
                themeStore.isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
              ]"
            >
              <p class="mb-2">Select options below to filter careers based on employment characteristics:</p>
              <ul class="list-disc pl-5 space-y-1">
                <li><strong>Ease of Employment:</strong> How easy it is to get a job in that field</li>
                <li><strong>Self-employment:</strong> How suitable the career is for being self-employed</li>
                <li><strong>Type of Employment:</strong> What kind of work schedule the job usually offers</li>
              </ul>
            </div>

            <!-- Ease of Employment -->
            <div class="mb-5">
              <div class="flex items-center justify-between mb-3">
                <label class="filter-label flex items-center gap-2 font-medium">
                  <UserPlusIcon :class="[
                    'h-4 w-4',
                    themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  ]" />
                  <span :class="[
                    themeStore.isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  ]">
                    Ease of Employment
                  </span>
                </label>
                <button
                  v-if="selectedEaseOfEmployment"
                  @click="selectedEaseOfEmployment = null; handleFilterChange();"
                  class="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Clear
                </button>
              </div>

              <div class="flex flex-wrap gap-2">
                <button
                  v-for="(label, value) in easeOfEmploymentOptions"
                  :key="value"
                  @click="selectedEaseOfEmployment = value; handleFilterChange();"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-1',
                    selectedEaseOfEmployment === value
                      ? `bg-${themeColorName}-500 text-white dark:bg-${themeColorName}-600 shadow-sm`
                      : themeStore.isDarkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  {{ label }}
                </button>
              </div>

              <!-- Description -->
              <div v-if="selectedEaseOfEmployment" class="mt-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                <p v-if="selectedEaseOfEmployment === 'Easy'">
                  Jobs are generally available and hiring is frequent.
                </p>
                <p v-else-if="selectedEaseOfEmployment === 'Medium'">
                  Jobs are available but moderately competitive.
                </p>
                <p v-else-if="selectedEaseOfEmployment === 'Hard'">
                  Jobs are harder to find; highly competitive or limited openings.
                </p>
              </div>
            </div>

            <!-- Self Employment -->
            <div class="mb-5">
              <div class="flex items-center justify-between mb-3">
                <label class="filter-label flex items-center gap-2 font-medium">
                  <UserIcon :class="[
                    'h-4 w-4',
                    themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  ]" />
                  <span :class="[
                    themeStore.isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  ]">
                    Self-employment
                  </span>
                </label>
                <button
                  v-if="selectedSelfEmployment"
                  @click="selectedSelfEmployment = null; handleFilterChange();"
                  class="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Clear
                </button>
              </div>

              <div class="flex flex-wrap gap-2">
                <button
                  v-for="(label, value) in selfEmploymentOptions"
                  :key="value"
                  @click="selectedSelfEmployment = value; handleFilterChange();"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-1',
                    selectedSelfEmployment === value
                      ? `bg-${themeColorName}-500 text-white dark:bg-${themeColorName}-600 shadow-sm`
                      : themeStore.isDarkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : ''
                  ]"
                >
                  {{ label }}
                </button>
              </div>

              <!-- Description -->
              <div v-if="selectedSelfEmployment" class="mt-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                <p v-if="selectedSelfEmployment === 'Easy'">
                  Easy to start your own business in that field.
                </p>
                <p v-else-if="selectedSelfEmployment === 'Medium'">
                  Possible but requires some effort or risk.
                </p>
                <p v-else-if="selectedSelfEmployment === 'Hard'">
                  Very difficult to be self-employed; jobs are mostly employer-based.
                </p>
              </div>
            </div>

            <!-- Employment Type -->
            <div class="mb-4">
              <div class="flex items-center justify-between mb-3">
                <label class="filter-label flex items-center gap-2 font-medium">
                  <ClockIcon :class="[
                    'h-4 w-4',
                  ]" />
                  <span >
                    Type of Employment
                  </span>
                </label>
                <span
                  v-if="selectedEmploymentType"
                  @click="selectedEmploymentType = null; handleFilterChange();"
                >
                  Clear
                </span>
              </div>

              <div class="flex flex-wrap gap-2">
                <Button
                  v-for="(label, value) in employmentTypeOptions"
                  :key="value"
                  @click="selectedEmploymentType = value; handleFilterChange();"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-1',
                    selectedEmploymentType === value
                      ? `bg-${themeColorName}-500 text-white dark:bg-${themeColorName}-600 shadow-sm`
                      : themeStore.isDarkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  {{ label }}
                </Button>
              </div>

              <!-- Description -->
              <div v-if="selectedEmploymentType" class="mt-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                <p v-if="selectedEmploymentType === 'Part-time'">
                  Mostly part-time roles.
                </p>
                <p v-else-if="selectedEmploymentType === 'Mixed'">
                  Both part-time and full-time options exist.
                </p>
                <p v-else-if="selectedEmploymentType === 'Full-time'">
                  Mostly full-time positions.
                </p>
              </div>
            </div>

            <!-- Apply Filters Button -->

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
import { BuildingOfficeIcon, UserPlusIcon, UserIcon, ClockIcon, AcademicCapIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';
import { useThemeStore } from '@/stores/theme';
import { fetchCareerFilterOptions } from '@/services/careerService';
import type { CareerFilterParams, FilterOption } from '@/types/career';
import { currentTheme } from '@/lib/theme-utils';
import {Button} from "@/components/ui/button";

const emit = defineEmits(['update:filters', 'reset']);
const themeStore = useThemeStore();

// Get the current theme color (blue, green, purple, amber)
const currentThemeColor = computed(() => {
  // Get theme from theme-utils or from theme store
  const themeId = currentTheme.value || themeStore.currentThemeId || 'blue';
  // Remove '-theme' suffix if present
  return themeId.replace('-theme', '');
});

// For direct use in template (not as a computed property)
const themeColorName = currentTheme.value?.replace('-theme', '') || themeStore.color || 'blue';

// Loading state
const isLoading = ref(true);

// Filter state
const searchQuery = ref('');
const selectedDegrees = ref<number[]>([]);
const degreeSearchQuery = ref('');
const showDegreeDropdown = ref(false);
const selectedIndustries = ref<number[]>([]);
const industrySearchQuery = ref('');
const showIndustryDropdown = ref(false);
const selectedEaseOfEmployment = ref<string | null>(null);
const selectedSelfEmployment = ref<string | null>(null);
const selectedEmploymentType = ref<string | null>(null);
const showEmploymentInfo = ref(false);

// Filter options from API
const industries = ref<FilterOption[]>([]);
const degrees = ref<FilterOption[]>([]);
const easeOfEmploymentOptions = ref<Record<string, string>>({});
const selfEmploymentOptions = ref<Record<string, string>>({});
const employmentTypeOptions = ref<Record<string, string>>({});

// Computed properties
const filteredIndustries = computed(() => {
  if (!industrySearchQuery.value) return industries.value;

  const query = industrySearchQuery.value.toLowerCase();
  return industries.value.filter(industry =>
    industry.name.toLowerCase().includes(query)
  );
});

const filteredDegrees = computed(() => {
  if (!degreeSearchQuery.value) return degrees.value;

  const query = degreeSearchQuery.value.toLowerCase();
  return degrees.value.filter(degree =>
    degree.name.toLowerCase().includes(query)
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

const selectedDegreesWithNames = computed(() => {
  return selectedDegrees.value.map(id => {
    const degree = degrees.value.find(d => d.id === id);
    return {
      id,
      name: degree ? degree.name : `Degree ${id}`
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
      degrees.value = response.data.degrees || [];
      easeOfEmploymentOptions.value = response.data.ease_of_employment || {};
      selfEmploymentOptions.value = response.data.self_employment || {};
      employmentTypeOptions.value = response.data.employment_type || {};
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

// Watch for changes in degree search query
watch(degreeSearchQuery, () => {
  if (degreeSearchQuery.value.length > 0) {
    showDegreeDropdown.value = true;
  }
});

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  // Handle industry dropdown
  if (showIndustryDropdown.value) {
    // Check if click is outside the dropdown container
    const isClickOutside = !event.target.closest('.industry-dropdown-container');

    if (isClickOutside) {
      showIndustryDropdown.value = false;
    }
  }

  // Handle degree dropdown
  if (showDegreeDropdown.value) {
    // Check if click is outside the dropdown container
    const isClickOutside = !event.target.closest('.degree-dropdown-container');

    if (isClickOutside) {
      showDegreeDropdown.value = false;
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

// Add a degree to the selected degrees
const addDegree = (degreeId: number) => {
  if (!selectedDegrees.value.includes(degreeId)) {
    selectedDegrees.value.push(degreeId);
    emitFilters();
  }
  degreeSearchQuery.value = ''; // Clear search after selection
  showDegreeDropdown.value = false; // Close dropdown after selection
};

// Remove a degree from the selected degrees
const removeDegree = (degreeId: number) => {
  selectedDegrees.value = selectedDegrees.value.filter(id => id !== degreeId);
  emitFilters();
};

const emitFilters = () => {
  // Create an empty filter object
  const filters: CareerFilterParams = {};

  // Add name search filter
  if (searchQuery.value) {
    filters.name = searchQuery.value;
  }

  // Add degree ids filter
  if (selectedDegrees.value.length > 0) {
    filters.degree_ids = selectedDegrees.value;
  }

  // Add industry ids filter
  if (selectedIndustries.value.length > 0) {
    filters.industry_ids = selectedIndustries.value;
  }

  // Add ease of employment filter
  if (selectedEaseOfEmployment.value) {
    filters.ease_of_employment = selectedEaseOfEmployment.value;
  }

  // Add self employment filter
  if (selectedSelfEmployment.value) {
    filters.self_employment = selectedSelfEmployment.value;
  }

  // Add employment type filter
  if (selectedEmploymentType.value) {
    filters.employment_type = selectedEmploymentType.value;
  }

  emit('update:filters', filters);
};

const handleFilterChange = () => {
  emitFilters();
};

// const applyEmploymentFilters = () => {
//   // This will trigger the filter update with current employment filter values
//   handleFilterChange();
// };

const resetAllFilters = () => {
  searchQuery.value = '';
  selectedDegrees.value = [];
  degreeSearchQuery.value = '';
  selectedIndustries.value = [];
  industrySearchQuery.value = '';
  selectedEaseOfEmployment.value = null;
  selectedSelfEmployment.value = null;
  selectedEmploymentType.value = null;
  showDegreeDropdown.value = false;
  showIndustryDropdown.value = false;
  showEmploymentInfo.value = false;
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
