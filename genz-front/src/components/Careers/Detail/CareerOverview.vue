<template>
  <div class="space-y-8">
    <!-- What is a Career section -->
    <div id="what-is" class="mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <h2 class="text-2xl font-bold mb-4 text-primary-heading dark:text-white">What is a {{ overview?.name }}?</h2>
      <p class="text-primary-content dark:text-gray-300 leading-relaxed">
        {{ overview?.definition }}
      </p>
    </div>

    <!-- What does a Career do section -->
    <div id="what-does" class="mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <h2 class="text-2xl font-bold mb-4 text-primary-heading dark:text-white">What does a {{ overview?.name }} do?</h2>

      <h3 class="text-xl font-semibold mb-3 text-primary-heading dark:text-gray-200">Duties and Responsibilities</h3>
      <p class="text-primary-content dark:text-gray-300 mb-3">
        Here are the key duties and responsibilities of a {{ overview?.name.toLowerCase() }}:
      </p>

      <ul class="list-disc pl-6 space-y-2 text-primary-content dark:text-gray-300">
        <li v-for="(duty, index) in overview?.duties" :key="index" class="leading-relaxed">
          {{ duty }}
        </li>
      </ul>

      <h3 v-if="overview?.career_types && overview.career_types.length > 0" class="text-xl font-semibold mt-6 mb-3 text-primary-heading dark:text-gray-200">Types of {{ overview?.name }}s</h3>
      <p v-if="overview?.career_types && overview.career_types.length > 0" class="text-primary-content dark:text-gray-300 mb-3">
        {{ overview?.name }}s can be categorized into various types based on their specializations and approaches. Here are some common types:
      </p>

      <div v-if="overview?.career_types && overview.career_types.length > 0" class="space-y-4 mt-4">
        <div v-for="(type, index) in overview.career_types" :key="index" class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-primary-heading dark:text-gray-200 mb-1">{{ type.name }}</h4>
          <p class="text-primary-content dark:text-gray-300">{{ type.description }}</p>
        </div>
      </div>
    </div>

    <!-- Are you suited to be a career? -->
    <div id="suited" class="mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <h2 class="text-2xl font-bold mb-4 text-primary-heading dark:text-white">Are you suited to be a {{ overview?.name.toLowerCase() }}?</h2>
      <p class="text-primary-content dark:text-gray-300 leading-relaxed mb-4">
        {{ overview?.name }}s have distinct personalities. They tend to be individuals with specific traits and characteristics that help them excel in this field.
      </p>
      <p class="text-primary-content dark:text-gray-300 leading-relaxed">
        Does this sound like you? Take our free career test to find out if {{ overview?.name.toLowerCase() }} is one of your top career matches.
      </p>

      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <button :class="[
          'px-4 py-2 rounded-md text-white font-medium transition-colors shadow-sm',
          `bg-${themeColorName}-500 hover:bg-${themeColorName}-600`
        ]">
          Take the free test now
        </button>
        <button class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary-content dark:text-gray-200 font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm">
          Learn more about the career test
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { currentTheme } from '@/lib/theme-utils';
import type { CareerOverview as CareerOverviewType } from '@/types/career';

const props = defineProps<{
  overview?: CareerOverviewType;
  isLoading: boolean;
}>();

// Get the current theme color
const themeColorName = computed(() => {
  return currentTheme.value.replace('-theme', '') || 'blue';
});
</script>

<style scoped>
/* Animation for content sections */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h2, h3 {
  animation: fadeIn 0.5s ease-out forwards;
}

div[id^="what-"], div[id^="suited"] {
  animation: fadeIn 0.5s ease-out forwards;
}
</style>
