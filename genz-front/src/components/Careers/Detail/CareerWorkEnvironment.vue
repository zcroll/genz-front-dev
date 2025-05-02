<template>
  <div class="space-y-8">
    <!-- Work Environment section -->
    <div id="work-environment" class="mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">What is the workplace of a {{ workEnvironment?.name }} like?</h2>

      <!-- Employment Details -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <span class="inline-block p-2 rounded-full bg-green-50 dark:bg-green-900/20 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          Employment Details
        </h3>

        <div class="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg mb-6">
          <div class="flex items-center justify-between cursor-pointer" @click="toggleEmploymentInfo">
            <p class="text-gray-700 dark:text-gray-300 font-medium">
              What are the employment characteristics of this career?
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 transition-transform duration-200" :class="{ 'rotate-180': showEmploymentInfo }" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>

          <div v-if="showEmploymentInfo" class="mt-3 transition-all duration-300 ease-in-out">
            <p class="text-gray-700 dark:text-gray-300 mb-3">
              Employment characteristics include how easy it is to find a job in this field, whether self-employment is common, and the typical work schedule.
              These factors can help you determine if this career aligns with your goals and preferences.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm p-5">
            <div class="flex items-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h4 class="font-medium text-gray-800 dark:text-gray-200">Ease of Employment</h4>
            </div>
            <div class="flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 py-3 rounded-lg">
              <span :class="getEmploymentBadgeClass(workEnvironment?.employment?.ease_of_employment)" class="text-sm">
                {{ workEnvironment?.employment?.ease_of_employment }}
              </span>
            </div>
            <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <div class="flex items-center justify-between cursor-pointer text-xs" @click="toggleEaseInfo">
                <p class="text-gray-600 dark:text-gray-400 font-medium">What does this mean?</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 transition-transform duration-200" :class="{ 'rotate-180': showEaseInfo }" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
              <div v-if="showEaseInfo" class="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/30 p-2 rounded-md">
                Indicates how difficult it is to find employment in this field, considering factors like job availability and competition.
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm p-5">
            <div class="flex items-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h4 class="font-medium text-gray-800 dark:text-gray-200">Self-Employment</h4>
            </div>
            <div class="flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 py-3 rounded-lg">
              <span :class="getEmploymentBadgeClass(workEnvironment?.employment?.self_employment)" class="text-sm">
                {{ workEnvironment?.employment?.self_employment }}
              </span>
            </div>
            <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <div class="flex items-center justify-between cursor-pointer text-xs" @click="toggleSelfEmploymentInfo">
                <p class="text-gray-600 dark:text-gray-400 font-medium">What does this mean?</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 transition-transform duration-200" :class="{ 'rotate-180': showSelfEmploymentInfo }" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
              <div v-if="showSelfEmploymentInfo" class="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/30 p-2 rounded-md">
                Indicates how feasible it is to work independently or start your own business in this field.
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm p-5">
            <div class="flex items-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 class="font-medium text-gray-800 dark:text-gray-200">Employment Type</h4>
            </div>
            <div class="flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 py-3 rounded-lg">
              <span :class="getEmploymentTypeBadgeClass(workEnvironment?.employment?.employment_type)" class="text-sm">
                {{ workEnvironment?.employment?.employment_type }}
              </span>
            </div>
            <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <div class="flex items-center justify-between cursor-pointer text-xs" @click="toggleEmploymentTypeInfo">
                <p class="text-gray-600 dark:text-gray-400 font-medium">What does this mean?</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 transition-transform duration-200" :class="{ 'rotate-180': showEmploymentTypeInfo }" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
              <div v-if="showEmploymentTypeInfo" class="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/30 p-2 rounded-md">
                Indicates whether jobs in this field are typically full-time, part-time, or a mix of both.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Workplaces -->
      <div v-if="workEnvironment?.workplaces && workEnvironment.workplaces.length > 0" class="mb-6">
        <h3 class="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <span class="inline-block p-2 rounded-full bg-orange-50 dark:bg-orange-900/20 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </span>
          Common Workplaces
        </h3>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          {{ workEnvironment?.name }}s typically work in the following environments:
        </p>

        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm p-5">
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li v-for="(workplace, index) in workEnvironment.workplaces" :key="index" class="flex items-start p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700 dark:text-gray-300">{{ workplace }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Work Schedule -->
      <div v-if="workEnvironment?.work_schedule" class="mb-6">
        <h3 class="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <span class="inline-block p-2 rounded-full bg-purple-50 dark:bg-purple-900/20 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          Work Schedule
        </h3>

        <!-- Work Schedule InfoGraphic Component -->
        <div class="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm mb-6">
          <InfoGraphic
            :questionId="7"
            :question="`Do ${workEnvironment?.name || 'professionals'} work full-time or part-time?`"
            :data="[
              {
                label: 'Full-time',
                value: workEnvironment?.work_schedule?.full_time_percent || 0,
                color: '#8e44ad'
              },
              {
                label: 'Part-time',
                value: workEnvironment?.work_schedule?.part_time_percent || 0,
                color: '#3d7a78'
              }
            ]"
            :caption="`${workEnvironment?.work_schedule?.full_time_percent || 0}% of ${workEnvironment?.name || 'professionals'} work in full-time roles while ${workEnvironment?.work_schedule?.part_time_percent || 0}% work part-time.`"
          />
        </div>
      </div>

      <!-- Work Environments -->
      <div v-if="workEnvironment?.environments && workEnvironment.environments.length > 0">
        <h3 class="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <span class="inline-block p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </span>
          Work Environment Factors
        </h3>

        <div class="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg mb-6">
          <p class="text-gray-700 dark:text-gray-300 mb-3">
            The work environment of a {{ workEnvironment?.name }} involves various factors that affect daily tasks and job satisfaction.
            Below are key aspects of this career's work environment, with higher percentages indicating stronger presence of that factor.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" style="grid-auto-flow: dense;">
          <div v-for="(env, index) in sortedEnvironments" :key="index"
               :class="[
                 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300',
                 expandedEnvironments.includes(env.type) ? 'md:col-span-2' : ''
               ]">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-pointer" @click="toggleEnvironmentInfo(env.type)">
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200">{{ env.type }}</h4>
                <div class="flex items-center space-x-2">
                  <span v-if="env.value !== undefined" class="text-sm font-bold px-3 py-1 rounded-full" :class="getFactorBadgeClass(env.value)">
                    {{ Math.round(env.value) }}%
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 transition-transform duration-200" :class="{ 'rotate-180': expandedEnvironments.includes(env.type) }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-4">
              <div v-if="env.value !== undefined" class="mb-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div class="h-full rounded-full flex items-center justify-center text-xs text-white font-medium" :style="`width: ${Math.round(env.value)}%`" :class="getFactorBarColor(env.value)">
                  <span v-if="env.value >= 30">{{ Math.round(env.value) }}%</span>
                </div>
              </div>
              <div v-if="env.value !== undefined" class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                <span>Low</span>
                <span>High</span>
              </div>

              <!-- Description section (shown when expanded) -->
              <div v-if="expandedEnvironments.includes(env.type)" class="mt-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/30 p-4 rounded-md transition-all duration-300 ease-in-out">
                <p class="leading-relaxed">{{ env.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { currentTheme } from '@/lib/theme-utils';
import type { CareerWorkEnvironment as CareerWorkEnvironmentType } from '@/types/career';
import InfoGraphic from './InfoGraphic.vue';

// Get the current theme color
const themeColorName = computed(() => {
  return currentTheme.value.replace('-theme', '') || 'blue';
});

// Sort environments by value (highest first)
const sortedEnvironments = computed(() => {
  if (!props.workEnvironment?.environments) return [];
  return [...props.workEnvironment.environments].sort((a, b) => {
    // If both have values, sort by value (highest first)
    if (a.value !== undefined && b.value !== undefined) {
      return b.value - a.value;
    }
    // If only one has a value, prioritize the one with a value
    if (a.value !== undefined) return -1;
    if (b.value !== undefined) return 1;
    // If neither has a value, maintain original order
    return 0;
  });
});

// State for expanded environment factors
const expandedEnvironments = ref<string[]>([]);

// Toggle environment factor information
const toggleEnvironmentInfo = (type: string) => {
  if (expandedEnvironments.value.includes(type)) {
    // Close the current card
    expandedEnvironments.value = [];
  } else {
    // Close any open card and open the new one
    expandedEnvironments.value = [type];
  }
};

// State for employment details information
const showEmploymentInfo = ref(false);
const showEaseInfo = ref(false);
const showSelfEmploymentInfo = ref(false);
const showEmploymentTypeInfo = ref(false);

// Toggle employment details information
const toggleEmploymentInfo = () => {
  showEmploymentInfo.value = !showEmploymentInfo.value;
};

// Toggle ease of employment information
const toggleEaseInfo = () => {
  showEaseInfo.value = !showEaseInfo.value;
};

// Toggle self-employment information
const toggleSelfEmploymentInfo = () => {
  showSelfEmploymentInfo.value = !showSelfEmploymentInfo.value;
};

// Toggle employment type information
const toggleEmploymentTypeInfo = () => {
  showEmploymentTypeInfo.value = !showEmploymentTypeInfo.value;
};

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

// Get badge class for environment factor value
const getFactorBadgeClass = (value: number) => {
  const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';

  if (value >= 80) {
    return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
  } else if (value >= 60) {
    return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
  } else if (value >= 40) {
    return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
  } else if (value >= 20) {
    return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`;
  } else {
    return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
  }
};

// Get bar color for environment factor value
const getFactorBarColor = (value: number) => {
  if (value >= 80) {
    return 'bg-green-500';
  } else if (value >= 60) {
    return 'bg-blue-500';
  } else if (value >= 40) {
    return 'bg-yellow-500';
  } else if (value >= 20) {
    return 'bg-orange-500';
  } else {
    return 'bg-red-500';
  }
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
