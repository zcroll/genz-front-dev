<template>
  <div class="work-schedule-container">
    <!-- Title -->
    <h4 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
      Do {{ careerName }} work full-time or part-time?
    </h4>

    <!-- Stacked Bar Graph -->
    <div class="mb-8">
      <!-- Percentage display above bar -->
      <div class="flex justify-between mb-1">
        <div class="flex flex-col items-center" :style="`width: ${fullTimePercent}%`">
          <span class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ fullTimePercent }}</span>
          <span class="text-sm text-gray-500 dark:text-gray-400">%</span>
        </div>
        <div class="flex flex-col items-center" :style="`width: ${partTimePercent}%`">
          <span class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ partTimePercent }}</span>
          <span class="text-sm text-gray-500 dark:text-gray-400">%</span>
        </div>
      </div>

      <!-- Graph -->
      <div class="w-full h-14 flex rounded-lg overflow-hidden mb-3 shadow-md">
        <!-- Full-time section -->
        <div
          class="bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center text-white font-medium relative transition-all duration-300"
          :style="`width: ${fullTimePercent}%`"
        >
          <span v-if="fullTimePercent >= 20" class="text-sm font-semibold tracking-wide">Full-time</span>
        </div>
        <!-- Part-time section -->
        <div
          class="bg-gradient-to-r from-purple-500 to-purple-400 flex items-center justify-center text-white font-medium relative transition-all duration-300"
          :style="`width: ${partTimePercent}%`"
        >
          <span v-if="partTimePercent >= 20" class="text-sm font-semibold tracking-wide">Part-time</span>
        </div>
      </div>

      <!-- Legend -->
      <ul class="flex justify-between text-sm">
        <li class="flex items-center">
          <div class="w-4 h-4 rounded-sm mr-2 bg-gradient-to-r from-blue-600 to-blue-500 shadow-sm"></div>
          <span class="text-gray-700 dark:text-gray-300 font-medium">Full-time ({{ fullTimePercent }}%)</span>
        </li>
        <li class="flex items-center">
          <div class="w-4 h-4 rounded-sm mr-2 bg-gradient-to-r from-purple-500 to-purple-400 shadow-sm"></div>
          <span class="text-gray-700 dark:text-gray-300 font-medium">Part-time ({{ partTimePercent }}%)</span>
        </li>
      </ul>
    </div>

    <!-- Description -->
    <p class="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
      {{ fullTimePercent }}% of {{ careerName }} work in full-time roles while {{ partTimePercent }}% work part-time.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  careerName: string;
  fullTimePercent: number;
  partTimePercent: number;
}

const props = defineProps<Props>();

// Ensure percentages add up to 100%
const normalizedFullTimePercent = computed(() => {
  const total = props.fullTimePercent + props.partTimePercent;
  return total === 0 ? 0 : Math.round((props.fullTimePercent / total) * 100);
});

const normalizedPartTimePercent = computed(() => {
  return 100 - normalizedFullTimePercent.value;
});
</script>

<style scoped>
.work-schedule-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.75rem;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

:deep(.dark) .work-schedule-container {
  background-color: rgba(30, 41, 59, 0.5);
}

@media (prefers-color-scheme: dark) {
  .work-schedule-container {
    background-color: rgba(30, 41, 59, 0.5);
  }
}
</style>
