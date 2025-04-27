<template>
  <div class="flex-1 flex flex-col space-y-8 container mx-auto px-4 max-w-7xl">
    <!-- Hero Section -->
    <Card :class="['relative p-8 overflow-hidden']">
      <CardContent>
        <div class="relative">
          <h1 :class="[
            'text-3xl md:text-4xl font-bold mb-4',
            themeStore.isDarkMode ? 'text-white' : 'text-gray-900'
          ]">
            Explore Degrees
          </h1>
          <p>
            Discover programs and educational opportunities
          </p>
        </div>
      </CardContent>
    </Card>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Filters Sidebar -->
      <div class="lg:col-span-1">
        <DegreeFilters @update:filters="handleFiltersUpdate" @reset="resetFilters" />
      </div>

      <!-- Degrees List -->
      <div class="lg:col-span-3">
        <!-- Results Count -->
        <div class="mb-6 flex justify-between items-center">
          <p>
            {{ degrees.total }} results found
          </p>
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600 dark:text-gray-300">Per page:</label>
            <select
              v-model="perPage"
              @change="handlePerPageChange"
              class="text-sm rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        <!-- Degrees Grid -->
        <TransitionGroup
            name="degree-list"
            tag="div"
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
            v-if="degrees.data.length > 0 && !isLoading"
            appear
        >
          <DegreeCard
              v-for="(degree, index) in degrees.data"
              :key="degree.id || index"
              :degree="degree"
              :style="{ animationDelay: `${index * 50}ms` }"
              class="degree-card"
          />
        </TransitionGroup>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-t-2" :class="`border-${themeStore.color}-500`"></div>
          <p class="mt-2 text-gray-500 dark:text-gray-400">Loading degrees...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="degrees.data.length === 0" class="text-center py-8">
          <h3 class="text-lg font-medium mb-2">No degrees found</h3>
          <p class="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
          <button
            @click="resetFilters"
            class="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="degrees.data.length > 0 && !isLoading" class="mt-8 flex justify-center">
          <div class="flex items-center gap-2">
            <button
              @click="handlePageChange(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 rounded-md border"
              :class="[
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                themeStore.isDarkMode
                  ? 'border-gray-700 text-gray-300'
                  : 'border-gray-300 text-gray-700'
              ]"
            >
              Previous
            </button>

            <div class="flex items-center gap-1">
              <template v-for="page in paginationRange" :key="page">
                <button
                  v-if="page !== '...'"
                  @click="handlePageChange(page)"
                  class="w-8 h-8 flex items-center justify-center rounded-md"
                  :class="[
                    page === currentPage
                      ? `bg-${themeStore.color}-500 text-white`
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                    themeStore.isDarkMode && page !== currentPage
                      ? 'text-gray-300'
                      : page !== currentPage ? 'text-gray-700' : ''
                  ]"
                >
                  {{ page }}
                </button>
                <span
                  v-else
                  class="px-1"
                  :class="themeStore.isDarkMode ? 'text-gray-500' : 'text-gray-400'"
                >
                  ...
                </span>
              </template>
            </div>

            <button
              @click="handlePageChange(currentPage + 1)"
              :disabled="currentPage === lastPage"
              class="px-3 py-1 rounded-md border"
              :class="[
                currentPage === lastPage
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                themeStore.isDarkMode
                  ? 'border-gray-700 text-gray-300'
                  : 'border-gray-300 text-gray-700'
              ]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';
import { Card, CardContent } from "@/components/ui/card";
import { useThemeStore } from '@/stores/theme';
import DegreeCard from '@/components/Degrees/DegreeCard.vue';
import DegreeFilters from '@/components/Degrees/DegreeFilters.vue';
import { useNavigationStore } from '@/stores/navigation/navigationStore';
import MainLayout from "@/layout/Main-layout.vue";
import { fetchDegrees } from '@/services/degreeService';
import type { DegreeFilterParams } from '@/types/degree';

defineOptions({
  layout: MainLayout,
});

// Initialize theme store
const themeStore = useThemeStore();

// Pagination state
const currentPage = ref(1);
const perPage = ref(15);
const lastPage = ref(1);

// State for degrees data
const degrees = ref({
  data: [],
  total: 0,
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0
  }
});
const isLoading = ref(true);

// Current active filters
const activeFilters = ref({});

// Scroll position management
const savedScrollPosition = ref(0);

// Computed pagination range
const paginationRange = computed(() => {
  const range = [];
  const totalPages = lastPage.value;
  const currentPageVal = currentPage.value;

  // Always show first page
  range.push(1);

  // If current page is more than 3, add ellipsis after first page
  if (currentPageVal > 3) {
    range.push('...');
  }

  // Add pages around current page
  for (let i = Math.max(2, currentPageVal - 1); i <= Math.min(totalPages - 1, currentPageVal + 1); i++) {
    if (i > 1 && i < totalPages) {
      range.push(i);
    }
  }

  // If current page is less than total pages - 2, add ellipsis before last page
  if (currentPageVal < totalPages - 2) {
    range.push('...');
  }

  // Always show last page if there's more than one page
  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
});

// Save current scroll position
const saveScrollPosition = () => {
  savedScrollPosition.value = window.scrollY || document.documentElement.scrollTop;
};

// Restore saved scroll position
const restoreScrollPosition = async () => {
  await nextTick();
  window.scrollTo({
    top: savedScrollPosition.value,
    behavior: 'auto' // Use 'auto' instead of 'smooth' to prevent visible scrolling
  });
};

// Fetch degrees from API
const fetchDegreesData = async (filters: DegreeFilterParams = {}, preserveScroll = false) => {
  try {
    // Save scroll position if needed
    if (preserveScroll) {
      saveScrollPosition();
    }

    isLoading.value = true;

    // Store the active filters
    activeFilters.value = filters;

    // Add pagination parameters
    const paginatedFilters = {
      ...filters,
      page: currentPage.value,
      per_page: perPage.value
    };

    // Call the API service
    const response = await fetchDegrees(paginatedFilters);

    // Update the degrees state
    if (response.success) {
      degrees.value = {
        data: response.data || [],
        total: response.meta?.total || 0,
        meta: response.meta || {
          current_page: 1,
          last_page: 1,
          per_page: 15,
          total: 0
        }
      };

      // Update pagination state
      lastPage.value = response.meta?.last_page || 1;
      currentPage.value = response.meta?.current_page || 1;
    } else {
      // Handle error response
      degrees.value = {
        data: [],
        total: 0,
        meta: {
          current_page: 1,
          last_page: 1,
          per_page: 15,
          total: 0
        }
      };
      lastPage.value = 1;
      currentPage.value = 1;
    }
  } catch (error) {
    console.error('Error fetching degrees:', error);
    // Set empty data on error
    degrees.value = {
      data: [],
      total: 0,
      meta: {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0
      }
    };
    lastPage.value = 1;
    currentPage.value = 1;
  } finally {
    isLoading.value = false;

    // Restore scroll position if needed
    if (preserveScroll) {
      restoreScrollPosition();
    }
  }
};

// Handle filter updates from the filter component
const handleFiltersUpdate = (filters: DegreeFilterParams) => {
  // Reset to first page when filters change
  currentPage.value = 1;
  fetchDegreesData(filters, true); // Preserve scroll position
};

// Handle page change
const handlePageChange = (page) => {
  if (page < 1 || page > lastPage.value) return;
  saveScrollPosition();
  currentPage.value = page;
  fetchDegreesData(activeFilters.value, true); // Preserve scroll position
};

// Handle per page change
const handlePerPageChange = () => {
  saveScrollPosition();
  currentPage.value = 1; // Reset to first page
  fetchDegreesData(activeFilters.value, true); // Preserve scroll position
};

// Reset all filters and fetch all degrees
const resetFilters = () => {
  // For reset, we don't preserve scroll position as user likely wants to see from the top
  currentPage.value = 1;
  fetchDegreesData({}, false);
};

onMounted(() => {
  fetchDegreesData();
});
</script>

<style scoped>
.degree-card {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.degree-list-enter-active,
.degree-list-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.degree-list-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.degree-list-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

.degree-list-move {
  transition: transform 0.5s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .degree-list-enter-active,
  .degree-list-leave-active,
  .degree-list-move {
    transition: none;
  }
}

/* Scrollbar styling */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(250, 204, 21, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(250, 204, 21, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(250, 204, 21, 0.7);
}
</style>
