<template>
  <div
    class="sticky top-16  transition-all duration-200"
    style="max-height: calc(100vh - 5rem)"
  >
    <Card variant="frosted" class="overflow-hidden">
      <!-- Header -->
      <CardHeader
        variant="frosted"
        class="border-b"
        :style="{ borderColor: 'var(--border-subtle)' }"
      >
        <div class="relative">
          <Search
            class="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4"
            :style="{ color: `var(--${themeColorName}-500)` }"
          />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search careers"
            class="w-full h-11 pl-10 pr-3 rounded-lg shadow-sm transition-colors duration-200 text-base border focus:outline-none"
            :style="{
              backgroundColor: themeStore.isDarkMode
                ? 'rgba(30, 30, 30, 0.5)'
                : 'rgba(255, 255, 255, 0.5)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)',
              '::placeholder': { color: 'var(--text-secondary)' },
            }"
            :class="`focus:ring-2 focus:ring-${themeColorName}-500 focus:border-${themeColorName}-500`"
            @input="debouncedSearch"
          />
        </div>
      </CardHeader>

      <!-- Scrollable Content -->
      <CardContent
        variant="frosted"
        class="space-y-6 overflow-y-auto px-1"
        style="max-height: calc(100vh - 12rem)"
      >
        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center py-4">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2"
            :style="{ borderColor: `var(--${themeColorName}-500)` }"
          ></div>
        </div>

        <!-- Filter Groups -->
        <div v-else class="space-y-2">
          <!-- Related Degrees Filter -->
          <div
            class="filter-section transition-all duration-200 rounded-lg p-1"
            :style="{
              backgroundColor: themeStore.isDarkMode
                ? 'rgba(30, 30, 30, 0.5)'
                : 'rgba(255, 255, 255, 0.5)',
              borderColor: 'var(--border-subtle)',
            }"
          >
            <label
              class="filter-label flex items-center gap-2 mb-3 font-medium"
            >
              <AcademicCapIcon
                class="h-4 w-4"
                :style="{ color: 'var(--text-tertiary)' }"
              />
              <span class="text-base" :style="{ color: 'var(--text-primary)' }">
                Related Degrees
              </span>
            </label>

            <!-- Selected Degrees Tags -->
            <div
              v-if="degreeStore.selectedDegrees.length > 0"
              class="flex flex-wrap gap-3 mb-3"
            >
              <div
                v-for="degree in degreeStore.selectedDegreesWithNames"
                :key="degree.id"
                class="inline-flex items-center px-4 py-1.5 rounded-full text-sm"
                :style="{
                  backgroundColor: themeStore.isDarkMode
                    ? 'rgba(50, 50, 50, 0.8)'
                    : 'rgba(240, 240, 240, 0.8)',
                  color: 'var(--text-primary)',
                }"
              >
                {{ degree.name }}
                <button
                  @click.stop="
                    degreeStore.removeDegree(degree.id);
                    emitFilters();
                  "
                  class="ml-1 hover:opacity-80"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  <span class="sr-only">Remove</span>
                  <svg
                    class="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Search for degrees with dropdown -->
            <DegreeSearch
              :theme-color-name="themeColorName"
              :is-dark-mode="themeStore.isDarkMode"
              placeholder="Search and select degrees"
              :side-spacing="12"
            />
          </div>

          <!-- Industries Filter -->
          <div
            class="filter-section transition-all duration-200 rounded-lg p-5"
            :style="{
              backgroundColor: themeStore.isDarkMode
                ? 'rgba(30, 30, 30, 0.5)'
                : 'rgba(255, 255, 255, 0.5)',
              borderColor: 'var(--border-subtle)',
            }"
          >
            <label
              class="filter-label flex items-center gap-2 mb-3 font-medium"
            >
              <BuildingOfficeIcon
                class="h-4 w-4"
                :style="{ color: 'var(--text-tertiary)' }"
              />
              <span class="text-base" :style="{ color: 'var(--text-primary)' }">
                Industries
              </span>
            </label>

            <!-- Selected Industries Tags -->
            <div
              v-if="selectedIndustries.length > 0"
              class="flex flex-wrap gap-3 mb-3"
            >
              <div
                v-for="industry in selectedIndustriesWithNames"
                :key="industry.id"
                class="inline-flex items-center px-4 py-1.5 rounded-full text-sm"
                :style="{
                  backgroundColor: themeStore.isDarkMode
                    ? 'rgba(50, 50, 50, 0.8)'
                    : 'rgba(240, 240, 240, 0.8)',
                  color: 'var(--text-primary)',
                }"
              >
                {{ industry.name }}
                <button
                  @click.stop="removeIndustry(industry.id)"
                  class="ml-1 hover:opacity-80"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  <span class="sr-only">Remove</span>
                  <svg
                    class="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Search for industries with dropdown -->
            <div class="relative industry-dropdown-container">
              <div class="relative">
                <Search
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                  :style="{ color: `var(--${themeColorName}-500)` }"
                />
                <input
                  v-model="industrySearchQuery"
                  type="search"
                  placeholder="Search and select industries"
                  @focus="showIndustryDropdown = true"
                  @click.stop="showIndustryDropdown = true"
                  class="w-full h-11 pl-10 pr-3 rounded-lg shadow-sm transition-colors duration-200 text-base border focus:outline-none"
                  :class="`focus:ring-2 focus:ring-${themeColorName}-500 focus:border-${themeColorName}-500`"
                  :style="{
                    backgroundColor: themeStore.isDarkMode
                      ? 'rgba(30, 30, 30, 0.5)'
                      : 'rgba(255, 255, 255, 0.5)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }"
                />
              </div>

              <!-- Dropdown for industries -->
              <div
                v-if="showIndustryDropdown && filteredIndustries.length > 0"
                class="absolute z-10 mt-1 w-full rounded-md shadow-lg border"
                :style="{
                  backgroundColor: 'var(--content-surface-primary)',
                  borderColor: 'var(--border-subtle)',
                }"
              >
                <div class="max-h-60 overflow-y-auto py-1 custom-scrollbar">
                  <div
                    v-for="industry in filteredIndustries"
                    :key="industry.id"
                    @click.stop="addIndustry(industry.id)"
                    class="px-4 py-2.5 cursor-pointer text-base"
                    :class="{
                      'bg-gray-100 dark:bg-gray-700':
                        selectedIndustries.includes(industry.id),
                    }"
                    :style="{
                      color: 'var(--text-primary)',
                      ':hover': {
                        backgroundColor: themeStore.isDarkMode
                          ? 'rgba(50, 50, 50, 0.5)'
                          : 'rgba(240, 240, 240, 0.5)',
                      },
                    }"
                  >
                    {{ industry.name }}
                  </div>
                </div>
              </div>

              <!-- No results message -->
              <div
                v-if="
                  showIndustryDropdown &&
                  industrySearchQuery &&
                  filteredIndustries.length === 0
                "
                class="absolute z-10 mt-1 w-full rounded-md shadow-lg p-4 text-base text-center border"
                :style="{
                  backgroundColor: 'var(--content-surface-primary)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }"
              >
                No matching industries found
              </div>
            </div>
          </div>

          <!-- Employment Filters Section -->
          <div
            class="filter-section transition-all duration-200 rounded-lg p-5"
            :style="{
              backgroundColor: themeStore.isDarkMode
                ? 'rgba(30, 30, 30, 0.5)'
                : 'rgba(255, 255, 255, 0.5)',
              borderColor: 'var(--border-subtle)',
            }"
          >
            <!-- Section Title -->
            <div class="flex items-center justify-between mb-5">
              <h3
                class="text-xl font-medium"
                :style="{ color: 'var(--text-primary)' }"
              >
                Employment
              </h3>
              <button
                @click="showEmploymentInfo = !showEmploymentInfo"
                class="transition-colors hover:opacity-80"
                :style="{ color: 'var(--text-secondary)' }"
                aria-label="Show employment filter information"
              >
                <InformationCircleIcon class="h-5 w-5" />
              </button>
            </div>

            <!-- Info Panel -->
            <div
              v-if="showEmploymentInfo"
              class="mb-6 p-5 rounded-lg text-base"
              :style="{
                backgroundColor: themeStore.isDarkMode
                  ? 'rgba(40, 40, 40, 0.5)'
                  : 'rgba(245, 245, 245, 0.5)',
                color: 'var(--text-secondary)',
              }"
            >
              <p class="mb-2">
                Select options below to filter careers based on employment
                characteristics:
              </p>
              <ul class="list-disc pl-5 space-y-1">
                <li>
                  <strong>Ease of Employment:</strong> How easy it is to get a
                  job in that field
                </li>
                <li>
                  <strong>Self-employment:</strong> How suitable the career is
                  for being self-employed
                </li>
                <li>
                  <strong>Type of Employment:</strong> What kind of work
                  schedule the job usually offers
                </li>
              </ul>
            </div>

            <!-- Ease of Employment -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-3">
                <label class="filter-label flex items-center gap-2 font-medium">
                  <UserPlusIcon
                    class="h-4 w-4"
                    :style="{ color: 'var(--text-tertiary)' }"
                  />
                  <span
                    class="text-base"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    Ease of Employment
                  </span>
                </label>
                <button
                  v-if="selectedEaseOfEmployment"
                  @click="
                    selectedEaseOfEmployment = null;
                    handleFilterChange();
                  "
                  class="text-sm hover:opacity-80"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  Clear
                </button>
              </div>

              <div class="flex flex-wrap gap-3">
                <button
                  v-for="(label, value) in easeOfEmploymentOptions"
                  :key="value"
                  @click="
                    selectedEaseOfEmployment = value;
                    handleFilterChange();
                  "
                  class="px-5 py-2.5 rounded-lg text-base font-medium transition-all duration-200 flex-1 border hover:opacity-90"
                  :class="
                    selectedEaseOfEmployment === value
                      ? `hover:bg-${themeColorName}-600`
                      : ''
                  "
                  :style="{
                    backgroundColor:
                      selectedEaseOfEmployment === value
                        ? `var(--${themeColorName}-500)`
                        : themeStore.isDarkMode
                          ? 'rgba(40, 40, 40, 0.5)'
                          : 'rgba(245, 245, 245, 0.5)',
                    color:
                      selectedEaseOfEmployment === value
                        ? 'white'
                        : 'var(--text-primary)',
                    borderColor: 'var(--border-subtle)',
                  }"
                >
                  {{ label }}
                </button>
              </div>

              <!-- Description -->
              <div
                v-if="selectedEaseOfEmployment"
                class="mt-3 text-sm p-4 rounded"
                :style="{
                  backgroundColor: themeStore.isDarkMode
                    ? 'rgba(40, 40, 40, 0.5)'
                    : 'rgba(245, 245, 245, 0.5)',
                  color: 'var(--text-secondary)',
                }"
              >
                <p v-if="selectedEaseOfEmployment === 'Easy'">
                  Jobs are generally available and hiring is frequent.
                </p>
                <p v-else-if="selectedEaseOfEmployment === 'Medium'">
                  Jobs are available but moderately competitive.
                </p>
                <p v-else-if="selectedEaseOfEmployment === 'Hard'">
                  Jobs are harder to find; highly competitive or limited
                  openings.
                </p>
              </div>
            </div>

            <!-- Self Employment -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-3">
                <label class="filter-label flex items-center gap-2 font-medium">
                  <UserIcon
                    class="h-4 w-4"
                    :style="{ color: 'var(--text-tertiary)' }"
                  />
                  <span
                    class="text-base"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    Self-employment
                  </span>
                </label>
                <button
                  v-if="selectedSelfEmployment"
                  @click="
                    selectedSelfEmployment = null;
                    handleFilterChange();
                  "
                  class="text-sm hover:opacity-80"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  Clear
                </button>
              </div>

              <div class="flex flex-wrap gap-3">
                <button
                  v-for="(label, value) in selfEmploymentOptions"
                  :key="value"
                  @click="
                    selectedSelfEmployment = value;
                    handleFilterChange();
                  "
                  class="px-5 py-2.5 rounded-lg text-base font-medium transition-all duration-200 flex-1 border hover:opacity-90"
                  :class="
                    selectedSelfEmployment === value
                      ? `hover:bg-${themeColorName}-600`
                      : ''
                  "
                  :style="{
                    backgroundColor:
                      selectedSelfEmployment === value
                        ? `var(--${themeColorName}-500)`
                        : themeStore.isDarkMode
                          ? 'rgba(40, 40, 40, 0.5)'
                          : 'rgba(245, 245, 245, 0.5)',
                    color:
                      selectedSelfEmployment === value
                        ? 'white'
                        : 'var(--text-primary)',
                    borderColor: 'var(--border-subtle)',
                  }"
                >
                  {{ label }}
                </button>
              </div>

              <!-- Description -->
              <div
                v-if="selectedSelfEmployment"
                class="mt-3 text-sm p-4 rounded"
                :style="{
                  backgroundColor: themeStore.isDarkMode
                    ? 'rgba(40, 40, 40, 0.5)'
                    : 'rgba(245, 245, 245, 0.5)',
                  color: 'var(--text-secondary)',
                }"
              >
                <p v-if="selectedSelfEmployment === 'Easy'">
                  Easy to start your own business in that field.
                </p>
                <p v-else-if="selectedSelfEmployment === 'Medium'">
                  Possible but requires some effort or risk.
                </p>
                <p v-else-if="selectedSelfEmployment === 'Hard'">
                  Very difficult to be self-employed; jobs are mostly
                  employer-based.
                </p>
              </div>
            </div>

            <!-- Employment Type -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-3">
                <label class="filter-label flex items-center gap-2 font-medium">
                  <ClockIcon
                    class="h-4 w-4"
                    :style="{ color: 'var(--text-tertiary)' }"
                  />
                  <span
                    class="text-base"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    Type of Employment
                  </span>
                </label>
                <button
                  v-if="selectedEmploymentType"
                  @click="
                    selectedEmploymentType = null;
                    handleFilterChange();
                  "
                  class="text-sm hover:opacity-80"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  Clear
                </button>
              </div>

              <div class="flex flex-wrap gap-3">
                <button
                  v-for="(label, value) in employmentTypeOptions"
                  :key="value"
                  @click="
                    selectedEmploymentType = value;
                    handleFilterChange();
                  "
                  class="px-5 py-2.5 rounded-lg text-base font-medium transition-all duration-200 flex-1 border hover:opacity-90"
                  :class="
                    selectedEmploymentType === value
                      ? `hover:bg-${themeColorName}-600`
                      : ''
                  "
                  :style="{
                    backgroundColor:
                      selectedEmploymentType === value
                        ? `var(--${themeColorName}-500)`
                        : themeStore.isDarkMode
                          ? 'rgba(40, 40, 40, 0.5)'
                          : 'rgba(245, 245, 245, 0.5)',
                    color:
                      selectedEmploymentType === value
                        ? 'white'
                        : 'var(--text-primary)',
                    borderColor: 'var(--border-subtle)',
                  }"
                >
                  {{ label }}
                </button>
              </div>

              <!-- Description -->
              <div
                v-if="selectedEmploymentType"
                class="mt-3 text-sm p-4 rounded"
                :style="{
                  backgroundColor: themeStore.isDarkMode
                    ? 'rgba(40, 40, 40, 0.5)'
                    : 'rgba(245, 245, 245, 0.5)',
                  color: 'var(--text-secondary)',
                }"
              >
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
        <div class="mt-5 px-1">
          <Button
            @click="resetAllFilters"
            class="w-full py-3 px-5 rounded-lg text-base font-medium transition-colors duration-200"
            variant="outline"
          >
            Reset Filters
          </Button>
        </div>

        <!-- Help Section -->
        <div
          class="mt-8 p-5 rounded-lg border transition-colors duration-200"
          :style="{
            backgroundColor: themeStore.isDarkMode
              ? 'rgba(30, 30, 30, 0.5)'
              : 'rgba(255, 255, 255, 0.5)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
          }"
        >
          <h4
            class="text-base font-medium mb-2"
            :style="{ color: 'var(--text-primary)' }"
          >
            Need Help?
          </h4>
          <p class="text-base">
            Use the filters above to narrow down your career search results.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { debounce } from "lodash";
import { Search, XCircle } from "lucide-vue-next";
import {
  BuildingOfficeIcon,
  UserPlusIcon,
  UserIcon,
  ClockIcon,
  AcademicCapIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";
import DegreeSearch from "@/components/Shared/DegreeSearch.vue";
import type { CareerFilterParams, FilterOption } from "@/types/career";
import { useThemeStore } from "@/stores/theme";
import { useDegreeSearchStore } from "@/stores/degreeSearchStore";
import { fetchCareerFilterOptions } from "@/services/careerService";
import { currentTheme } from "@/lib/theme-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const emit = defineEmits(["update:filters", "reset"]);
const themeStore = useThemeStore();

// Get the current theme color (blue, green, purple, amber)
const currentThemeColor = computed(() => {
  // Get theme from theme-utils or from theme store
  const themeId = currentTheme.value || themeStore.currentThemeId || "blue";
  // Remove '-theme' suffix if present
  return themeId.replace("-theme", "");
});

// For direct use in template (not as a computed property)
const themeColorName =
  currentTheme.value?.replace("-theme", "") || themeStore.color || "blue";

// Loading state
const isLoading = ref(true);

// Filter state
const searchQuery = ref("");
const degreeStore = useDegreeSearchStore();
const selectedIndustries = ref<number[]>([]);
const industrySearchQuery = ref("");
const showIndustryDropdown = ref(false);
const selectedEaseOfEmployment = ref<string | null>(null);
const selectedSelfEmployment = ref<string | null>(null);
const selectedEmploymentType = ref<string | null>(null);
const showEmploymentInfo = ref(false);

// Filter options from API
const industries = ref<FilterOption[]>([]);
const easeOfEmploymentOptions = ref<Record<string, string>>({});
const selfEmploymentOptions = ref<Record<string, string>>({});
const employmentTypeOptions = ref<Record<string, string>>({});

// Computed properties
const filteredIndustries = computed(() => {
  if (!industrySearchQuery.value) return industries.value;

  const query = industrySearchQuery.value.toLowerCase();
  return industries.value.filter((industry) =>
    industry.name.toLowerCase().includes(query),
  );
});

// Using global degree store for filtering degrees

const selectedIndustriesWithNames = computed(() => {
  return selectedIndustries.value.map((id) => {
    const industry = industries.value.find((i) => i.id === id);
    return {
      id,
      name: industry ? industry.name : `Industry ${id}`,
    };
  });
});

// Using global degree store for selected degrees

// Fetch filter options from API
const fetchFilterOptions = async () => {
  try {
    isLoading.value = true;
    const response = await fetchCareerFilterOptions();

    if (response.success && response.data) {
      // Populate filter options
      industries.value = response.data.industries || [];
      // degrees are now handled by the global store
      easeOfEmploymentOptions.value = response.data.ease_of_employment || {};
      selfEmploymentOptions.value = response.data.self_employment || {};
      employmentTypeOptions.value = response.data.employment_type || {};
    }
  } catch (error) {
    console.error("Error fetching filter options:", error);
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

// Watch for changes in theme color
watch(
  () => themeStore.currentThemeId,
  () => {
    // Update the ring color when theme changes
    document.documentElement.style.setProperty(
      "--ring-color",
      `var(--${themeColorName}-500)`,
    );
  },
);

// Watch for changes in industry search query
watch(industrySearchQuery, () => {
  if (industrySearchQuery.value.length > 0) {
    showIndustryDropdown.value = true;
  }
});

// Using global degree store for degree search

// Watch for changes in selected degrees from the global store
watch(
  () => degreeStore.selectedDegrees,
  () => {
    emitFilters();
  },
  { deep: true },
);

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  // Handle industry dropdown only (degree dropdown is managed by DegreeSearch component)
  if (showIndustryDropdown.value) {
    // Check if click is outside the dropdown container
    const isClickOutside = !event.target.closest(
      ".industry-dropdown-container",
    );

    if (isClickOutside) {
      showIndustryDropdown.value = false;
    }
  }
};

// Add event listener for click outside
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  fetchFilterOptions();

  // Set CSS variable for the ring color based on the current theme
  document.documentElement.style.setProperty(
    "--ring-color",
    `var(--${themeColorName}-500)`,
  );
});

// Remove event listener when component is unmounted
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Add an industry to the selected industries
const addIndustry = (industryId: number) => {
  if (!selectedIndustries.value.includes(industryId)) {
    selectedIndustries.value.push(industryId);
    emitFilters();
  }
  industrySearchQuery.value = ""; // Clear search after selection
  showIndustryDropdown.value = false; // Close dropdown after selection
};

// Remove an industry from the selected industries
const removeIndustry = (industryId: number) => {
  selectedIndustries.value = selectedIndustries.value.filter(
    (id) => id !== industryId,
  );
  emitFilters();
};

// Using global degree store for adding/removing degrees

const emitFilters = () => {
  // Create an empty filter object
  const filters: CareerFilterParams = {};

  // Add name search filter
  if (searchQuery.value) {
    filters.name = searchQuery.value;
  }

  // Add degree ids filter from global store
  if (degreeStore.selectedDegrees.length > 0) {
    filters.degree_ids = degreeStore.selectedDegrees;
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

  emit("update:filters", filters);
};

const handleFilterChange = () => {
  emitFilters();
};

// const applyEmploymentFilters = () => {
//   // This will trigger the filter update with current employment filter values
//   handleFilterChange();
// };

const resetAllFilters = () => {
  searchQuery.value = "";
  degreeStore.reset(); // Reset degree store
  selectedIndustries.value = [];
  industrySearchQuery.value = "";
  selectedEaseOfEmployment.value = null;
  selectedSelfEmployment.value = null;
  selectedEmploymentType.value = null;
  showIndustryDropdown.value = false;
  showEmploymentInfo.value = false;
  emitFilters();
};
</script>

<style scoped>
/* Scrollbar styling */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 1px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}

/* Input focus styling - dynamically uses the current theme color */
input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--ring-color, rgba(59, 130, 246, 0.5));
}

/* Hover effect for buttons */
button:not(.active):hover {
  background-color: rgba(var(--hover-bg, 0, 0, 0), 0.05);
}
</style>
