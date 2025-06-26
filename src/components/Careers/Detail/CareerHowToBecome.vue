<template>
  <div class="space-y-8">
    <!-- How to become section -->
    <div id="how-to-become" class="mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How to become a {{ howToBecome?.name }}</h2>
      
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Education Requirements</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          The typical education level required for a {{ howToBecome?.name.toLowerCase() }} is a <strong>{{ howToBecome?.education_level }}</strong>.
        </p>
        
        <div v-if="howToBecome?.education_levels && howToBecome.education_levels.length > 0" class="space-y-4 mt-4">
          <div v-for="(level, index) in howToBecome.education_levels" :key="index" class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-1">{{ level.level }}</h4>
            <p class="text-gray-700 dark:text-gray-300">{{ level.description }}</p>
          </div>
        </div>
      </div>
      
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Recommended Degrees</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-3">
          The following degrees are commonly pursued by those looking to become a {{ howToBecome?.name.toLowerCase() }}:
        </p>
        
        <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li v-for="(degree, index) in howToBecome?.degrees" :key="index" class="leading-relaxed">
            {{ degree }}
          </li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Steps to Become a {{ howToBecome?.name }}</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-3">
          Here's a step-by-step guide to becoming a {{ howToBecome?.name.toLowerCase() }}:
        </p>
        
        <ol class="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li v-for="(step, index) in howToBecome?.steps" :key="index" class="leading-relaxed">
            {{ step }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { CareerHowToBecome as CareerHowToBecomeType } from '@/types/career';

const props = defineProps<{
  howToBecome?: CareerHowToBecomeType;
  isLoading: boolean;
}>();
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

div[id^="how-to-become"] {
  animation: fadeIn 0.5s ease-out forwards;
}
</style>
