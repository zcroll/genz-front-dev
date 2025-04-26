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
        <div class="mb-6">
          <p >
            {{ degrees.total }} results found
          </p>
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

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-center py-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Card, CardContent } from "@/components/ui/card";
import { useThemeStore } from '@/stores/theme';
import DegreeCard from '@/components/Degrees/DegreeCard.vue';
import DegreeFilters from '@/components/Degrees/DegreeFilters.vue';
import { useNavigationStore } from '@/stores/navigation/navigationStore';
import MainLayout from "@/layout/Main-layout.vue";
import { fetchDegrees, DegreeFilterParams } from '@/services/degreeService';

defineOptions({
  layout: MainLayout,
});

// Initialize theme store
const themeStore = useThemeStore();

// State for degrees data
const degrees = ref({
  data: [],
  total: 0
});
const isLoading = ref(true);

// Current active filters
const activeFilters = ref({});

// Fetch degrees from API
const fetchDegreesData = async (filters = {}) => {
  try {
    isLoading.value = true;

    // Store the active filters
    activeFilters.value = filters;

    // Call the API service
    const response = await fetchDegrees(filters);

    // Update the degrees state
    degrees.value = {
      data: response.data || [],
      total: response.total || 0
    };
  } catch (error) {
    console.error('Error fetching degrees:', error);
    // Set empty data on error
    degrees.value = {
      data: [],
      total: 0
    };
  } finally {
    isLoading.value = false;
  }
};

// Handle filter updates from the filter component
const handleFiltersUpdate = (filters) => {
  fetchDegreesData(filters);
};

// Reset all filters and fetch all degrees
const resetFilters = () => {
  fetchDegreesData({});
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
