<template>
  <div class="space-y-8">
    <!-- Work Environment section -->
    <div id="work-environment" class="mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">What is the workplace of a {{ workEnvironment?.name }} like?</h2>
      
      <!-- Employment Details -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Employment Details</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-1">Ease of Employment</h4>
            <div class="flex items-center">
              <span :class="getEmploymentBadgeClass(workEnvironment?.employment?.ease_of_employment)">
                {{ workEnvironment?.employment?.ease_of_employment }}
              </span>
            </div>
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-1">Self-Employment</h4>
            <div class="flex items-center">
              <span :class="getEmploymentBadgeClass(workEnvironment?.employment?.self_employment)">
                {{ workEnvironment?.employment?.self_employment }}
              </span>
            </div>
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-1">Employment Type</h4>
            <div class="flex items-center">
              <span :class="getEmploymentTypeBadgeClass(workEnvironment?.employment?.employment_type)">
                {{ workEnvironment?.employment?.employment_type }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Workplaces -->
      <div v-if="workEnvironment?.workplaces && workEnvironment.workplaces.length > 0" class="mb-6">
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Common Workplaces</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-3">
          {{ workEnvironment?.name }}s typically work in the following environments:
        </p>
        
        <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li v-for="(workplace, index) in workEnvironment.workplaces" :key="index" class="leading-relaxed">
            {{ workplace }}
          </li>
        </ul>
      </div>
      
      <!-- Work Schedule -->
      <div v-if="workEnvironment?.work_schedule" class="mb-6">
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Work Schedule</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          {{ workEnvironment?.work_schedule?.schedule_description }}
        </p>
        
        <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <div class="flex justify-between mb-2">
            <span class="text-sm text-gray-600 dark:text-gray-400">Full-time</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">Part-time</span>
          </div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-blue-500" 
              :style="`width: ${workEnvironment?.work_schedule?.full_time_percent}%`"
            ></div>
          </div>
          <div class="flex justify-between mt-1">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ workEnvironment?.work_schedule?.full_time_percent }}%</span>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ workEnvironment?.work_schedule?.part_time_percent }}%</span>
          </div>
        </div>
      </div>
      
      <!-- Work Environments -->
      <div v-if="workEnvironment?.environments && workEnvironment.environments.length > 0">
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Work Environment Factors</h3>
        
        <div class="space-y-4">
          <div v-for="(env, index) in workEnvironment.environments" :key="index" class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-1">{{ env.type }}</h4>
            <p class="text-gray-700 dark:text-gray-300">{{ env.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { CareerWorkEnvironment as CareerWorkEnvironmentType } from '@/types/career';

const props = defineProps<{
  workEnvironment?: CareerWorkEnvironmentType;
  isLoading: boolean;
}>();

// Get badge class for employment difficulty
const getEmploymentBadgeClass = (level?: string) => {
  const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
  
  if (!level) return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
  
  const classes = {
    'Easy': `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`,
    'Medium': `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`,
    'Hard': `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`
  };
  
  return classes[level] || `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
};

// Get badge class for employment type
const getEmploymentTypeBadgeClass = (type?: string) => {
  const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
  
  if (!type) return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
  
  const classes = {
    'Part-time': `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`,
    'Mixed': `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`,
    'Full-time': `${baseClasses} bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200`
  };
  
  return classes[type] || `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
};
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

div[id^="work-environment"] {
  animation: fadeIn 0.5s ease-out forwards;
}
</style>
