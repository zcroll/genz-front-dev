<template>
  <div class="mb-10">
    <div v-if="isLoading" class="animate-pulse">
      <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
      <div class="flex flex-col sm:flex-row sm:items-center gap-3">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      </div>
    </div>
    
    <template v-else>
      <h1 class="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
        What does a {{ careerOverview?.name?.toLowerCase() || 'professional' }} do?
      </h1>
      <div class="flex flex-col sm:flex-row sm:items-center gap-3">
        <span
          :class="[
            'px-3 py-1 text-sm font-medium rounded-full text-white inline-flex items-center justify-center shadow-sm',
            `bg-${themeColorName}-500 hover:bg-${themeColorName}-600 transition-colors`,
          ]"
        >
          {{ careerOverview?.satisfaction || 'N/A' }} Satisfaction
        </span>
        <p class="text-gray-600 dark:text-gray-400">
          <strong>Would you make a good {{ careerOverview?.name?.toLowerCase() || 'professional' }}?</strong>
          Take our career test and find your match with over 800 careers.
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { currentTheme } from '@/lib/theme-utils';
import type { CareerOverview } from '@/types/career';

const props = defineProps<{
  careerOverview: CareerOverview | null;
  isLoading: boolean;
}>();

// Get the current theme color
const themeColorName = computed(() => {
  return currentTheme.value.replace('-theme', '') || 'blue';
});
</script>