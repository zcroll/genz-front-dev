<template>
  <div class="career-timeline-container">
    <div class="relative">
      <!-- Vertical line -->
      <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

      <!-- Timeline items -->
      <div class="space-y-6">
        <div
          v-for="(step, index) in timelineSteps"
          :key="index"
          class="relative pl-12 timeline-item"
          :style="{'--animation-delay': `${index * 0.1}s`}"
        >
          <!-- Timeline bullet -->
          <div
            class="absolute left-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center z-10"
            :class="getColorClasses(index)"
          >
            <span class="text-xs font-medium">{{ index + 1 }}</span>
          </div>

          <!-- Content card -->
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-1">{{ step }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">Career Stage {{ index + 1 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  pathwayId: {
    type: String,
    required: true
  },
  progressionData: {
    type: Array,
    required: true
  },
  themeColor: {
    type: String,
    default: 'indigo'
  }
});

// Get the timeline steps for the specified pathway
const timelineSteps = computed(() => {
  const pathwayData = props.progressionData.find(item => item.from_pathway_id === props.pathwayId);
  return pathwayData ? pathwayData.typical_progression : [];
});

// Get Tailwind color classes based on theme color and index
const getColorClasses = (index: number) => {
  const colorMap: Record<string, string[]> = {
    'indigo': [
      'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
      'bg-indigo-200 text-indigo-700 dark:bg-indigo-800/40 dark:text-indigo-300',
      'bg-indigo-300 text-indigo-800 dark:bg-indigo-700/50 dark:text-indigo-200',
      'bg-indigo-400 text-indigo-900 dark:bg-indigo-600/60 dark:text-indigo-100',
      'bg-indigo-500 text-white dark:bg-indigo-500/70 dark:text-white'
    ],
    'blue': [
      'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      'bg-blue-200 text-blue-700 dark:bg-blue-800/40 dark:text-blue-300',
      'bg-blue-300 text-blue-800 dark:bg-blue-700/50 dark:text-blue-200',
      'bg-blue-400 text-blue-900 dark:bg-blue-600/60 dark:text-blue-100',
      'bg-blue-500 text-white dark:bg-blue-500/70 dark:text-white'
    ],
    'green': [
      'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      'bg-green-200 text-green-700 dark:bg-green-800/40 dark:text-green-300',
      'bg-green-300 text-green-800 dark:bg-green-700/50 dark:text-green-200',
      'bg-green-400 text-green-900 dark:bg-green-600/60 dark:text-green-100',
      'bg-green-500 text-white dark:bg-green-500/70 dark:text-white'
    ],
    'purple': [
      'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      'bg-purple-200 text-purple-700 dark:bg-purple-800/40 dark:text-purple-300',
      'bg-purple-300 text-purple-800 dark:bg-purple-700/50 dark:text-purple-200',
      'bg-purple-400 text-purple-900 dark:bg-purple-600/60 dark:text-purple-100',
      'bg-purple-500 text-white dark:bg-purple-500/70 dark:text-white'
    ]
  };

  // Default to indigo if color not found
  const colors = colorMap[props.themeColor] || colorMap['indigo'];

  // Use modulo to cycle through colors if more steps than colors
  return colors[index % colors.length];
};
</script>

<style scoped>
.career-timeline-container {
  width: 100%;
  margin-top: 1rem;
  position: relative;
}

/* Animation */
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

.timeline-item {
  animation: fadeIn 0.5s ease-out forwards;
  animation-delay: var(--animation-delay, 0s);
}
</style>
