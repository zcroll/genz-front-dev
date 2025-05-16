<template>
  <div
    class="sticky top-20 transition-all duration-200"
    style="max-height: calc(100vh - 6rem)"
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
            class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
            :style="{ color: `var(--${themeColorName}-500)` }"
          />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search degrees"
            class="w-full h-11 pl-10 rounded-3xl shadow-sm transition-colors duration-200 border focus:outline-none"
            :class="`focus:ring-2 focus:ring-${themeColorName}-500 focus:border-${themeColorName}-500`"
            :style="{
              backgroundColor: themeStore.isDarkMode
                ? 'rgba(30, 30, 30, 0.5)'
                : 'rgba(255, 255, 255, 0.5)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)',
              '::placeholder': { color: 'var(--text-secondary)' },
            }"
            @input="debouncedSearch"
          />
        </div>
      </CardHeader>

      <!-- Scrollable Content -->
      <CardContent
        variant="frosted"
        class="space-y-6 overflow-y-auto"
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
        <div v-else class="space-y-6">
          <!-- Academic Areas Filter -->
          <div
            class="filter-section transition-all duration-200 rounded-lg p-4"
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
              <BookOpenIcon
                class="h-4 w-4"
                :style="{ color: 'var(--text-tertiary)' }"
              />
              <span :style="{ color: 'var(--text-primary)' }">
                Area of Study
              </span>
            </label>

            <!-- Selected Areas Tags -->
            <div
              v-if="selectedAreas.length > 0"
              class="flex flex-wrap gap-2 mb-3"
            >
              <div
                v-for="area in selectedAreas"
                :key="area"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs"
                :style="{
                  backgroundColor: themeStore.isDarkMode
                    ? 'rgba(50, 50, 50, 0.8)'
                    : 'rgba(240, 240, 240, 0.8)',
                  color: 'var(--text-primary)',
                }"
              >
                {{ area }}
                <button
                  @click.stop="removeArea(area)"
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

            <!-- Search for areas with dropdown -->
            <div class="relative area-dropdown-container">
              <div class="relative">
                <Search
                  class="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3"
                  :style="{ color: `var(--${themeColorName}-500)` }"
                />
                <input
                  v-model="areaSearchQuery"
                  type="search"
                  placeholder="Search and select areas of study"
                  @focus="showAreaDropdown = true"
                  @click.stop="showAreaDropdown = true"
                  class="w-full h-10 pl-7 pr-2 rounded-lg shadow-sm transition-colors duration-200 text-sm border focus:outline-none"
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

              <!-- Dropdown for areas -->
              <div
                v-if="showAreaDropdown && filteredAreas.length > 0"
                class="absolute z-10 mt-1 w-full rounded-md shadow-lg border"
                :style="{
                  backgroundColor: 'var(--content-surface-primary)',
                  borderColor: 'var(--border-subtle)',
                }"
              >
                <div class="max-h-60 overflow-y-auto py-1 custom-scrollbar">
                  <div
                    v-for="area in filteredAreas"
                    :key="area.name"
                    @click.stop="addArea(area.name)"
                    class="px-3 py-2 cursor-pointer text-sm"
                    :class="{
                      'bg-gray-100 dark:bg-gray-700': selectedAreas.includes(
                        area.name,
                      ),
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
                    {{ area.name }}
                  </div>
                </div>
              </div>

              <!-- No results message -->
              <div
                v-if="
                  showAreaDropdown &&
                  areaSearchQuery &&
                  filteredAreas.length === 0
                "
                class="absolute z-10 mt-1 w-full rounded-md shadow-lg p-3 text-sm text-center border"
                :style="{
                  backgroundColor: 'var(--content-surface-primary)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }"
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
            class="w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
            variant="outline"
            :class="`hover:bg-${themeColorName}-100 dark:hover:bg-${themeColorName}-900/20 focus:ring-2 focus:ring-${themeColorName}-500 focus:ring-offset-2 focus:outline-none`"
          >
            Reset Filters
          </Button>
        </div>

        <!-- Help Section -->
        <div
          class="mt-8 p-4 rounded-lg border transition-colors duration-200"
          :style="{
            backgroundColor: themeStore.isDarkMode
              ? 'rgba(30, 30, 30, 0.5)'
              : 'rgba(255, 255, 255, 0.5)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
          }"
        >
          <h4
            class="text-sm font-medium mb-2"
            :style="{ color: 'var(--text-primary)' }"
          >
            Need Help?
          </h4>
          <p class="text-sm">
            Use the filters above to narrow down your degree search results.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { debounce } from "lodash";
import { Search } from "lucide-vue-next";
import { AcademicCapIcon, BookOpenIcon } from "@heroicons/vue/24/outline";
import { useThemeStore } from "@/stores/theme/themeStore";
import { fetchDegreeFilterOptions } from "@/services/degreeService";
import type { DegreeFilterParams } from "@/types/degree";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentTheme } from "@/lib/theme-utils";

const emit = defineEmits(["update:filters", "reset"]);
const themeStore = useThemeStore();

// Get the current theme color (blue, green, purple, amber)
const themeColorName = computed(() => {
  // Get theme from theme-utils
  const themeId = currentTheme.value;
  // Remove '-theme' suffix if present
  return themeId.replace("-theme", "");
});

// Loading state
const isLoading = ref(true);

// Filter state
const searchQuery = ref("");
const selectedAreas = ref([]);
const areaSearchQuery = ref("");
const showAreaDropdown = ref(false);

// Filter options from API
const degreeLevels = ref([]);
const academicAreas = ref([]);

// Filtered areas based on search
const filteredAreas = computed(() => {
  if (!areaSearchQuery.value) return academicAreas.value;

  const query = areaSearchQuery.value.toLowerCase();
  return academicAreas.value.filter((area) =>
    area.name.toLowerCase().includes(query),
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

// Watch for changes in area search query
watch(areaSearchQuery, () => {
  if (areaSearchQuery.value.length > 0) {
    showAreaDropdown.value = true;
  }
});

// Watch for changes in theme color
watch(
  () => themeStore.currentThemeId,
  () => {
    // Update the ring color when theme changes
    document.documentElement.style.setProperty(
      "--ring-color",
      `var(--${themeColorName.value}-500)`,
    );
  },
);

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  // Only process if dropdown is open
  if (showAreaDropdown.value) {
    // Check if click is outside the dropdown container
    const isClickOutside = !event.target.closest(".area-dropdown-container");

    if (isClickOutside) {
      showAreaDropdown.value = false;
      console.log("Closing dropdown due to outside click");
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
    `var(--${themeColorName.value}-500)`,
  );
});

// Remove event listener when component is unmounted
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Add an area to the selected areas
const addArea = (areaName) => {
  if (!selectedAreas.value.includes(areaName)) {
    selectedAreas.value.push(areaName);
    emitFilters();
  }
  areaSearchQuery.value = ""; // Clear search after selection
  showAreaDropdown.value = false; // Close dropdown after selection
};

// Remove an area from the selected areas
const removeArea = (areaName) => {
  selectedAreas.value = selectedAreas.value.filter((area) => area !== areaName);
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

  emit("update:filters", filters);
};

const handleFilterChange = () => {
  emitFilters();
};

const resetAllFilters = () => {
  searchQuery.value = "";
  selectedAreas.value = [];
  areaSearchQuery.value = "";
  showAreaDropdown.value = false;
  emit("reset");
};

// Note: We already have an onMounted hook above that includes fetchFilterOptions
</script>

<style scoped>
/* Same styles as JobFilters.vue */
.filter-section {
  padding: 1rem;
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

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
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
