<template>
  <div class="space-y-8">
    <!-- How to become section -->
    <div id="how-to-become" class="mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How to become a {{ howToBecome?.name }}</h2>

      <!-- Education Requirements Section -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center">
          <span class="inline-block p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </span>
          Education Requirements
        </h3>
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

      <!-- Recommended Degrees Section -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center">
          <span class="inline-block p-2 rounded-full bg-green-50 dark:bg-green-900/20 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </span>
          Recommended Degrees
        </h3>
        <p class="text-gray-700 dark:text-gray-300 mb-3">
          The following degrees are commonly pursued by those looking to become a {{ howToBecome?.name.toLowerCase() }}:
        </p>

        <div v-if="howToBecome?.degrees && howToBecome.degrees.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div v-for="(degree, index) in howToBecome.degrees" :key="index" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <div class="p-4 flex items-center">
              <div class="flex-shrink-0 mr-3">
                <img v-if="degree.image_url" :src="degree.image_url" :alt="degree.name" class="w-12 h-12 rounded-md object-cover" />
                <div v-else class="w-12 h-12 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 dark:text-gray-200">{{ degree.name }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Career Path Steps Section -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center">
          <span class="inline-block p-2 rounded-full mr-3"
                :class="`bg-${themeColor}-50 dark:bg-${themeColor}-900/20`">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="`text-${themeColor}-500`" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          Steps to Become a {{ howToBecome?.name }}
        </h3>
        <p class="text-gray-700 dark:text-gray-300 mb-3">
          Here's a step-by-step guide to becoming a {{ howToBecome?.name.toLowerCase() }}:
        </p>

        <!-- Path overview if available -->
        <div v-if="howToBecome?.path_overview" class="mb-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <p class="text-gray-700 dark:text-gray-300">{{ howToBecome.path_overview }}</p>
        </div>

        <!-- Steps as UL/LI with nice styling -->
        <div v-if="howToBecome?.steps && howToBecome.steps.length > 0" class="mt-6">
          <!-- Structured or Simple Structure with page_type="structured" -->
          <ul v-if="howToBecome.page_type === 'structured'" class="steps-list relative">
            <li v-for="(step, index) in howToBecome.steps" :key="index"
                class="step-item mb-6 pl-12 pb-2 relative"
                :class="{'last-step': index === howToBecome.steps.length - 1}">

              <!-- Step number indicator with theme color -->
              <div class="step-number absolute left-0 top-0 flex-shrink-0 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold shadow-md z-10"
                   :class="`bg-gradient-to-br from-${themeColor}-400 to-${themeColor}-600 dark:from-${themeColor}-500 dark:to-${themeColor}-700`">
                {{ step.number }}
              </div>

              <!-- Step content -->
              <div class="step-content bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <!-- Step header with title -->
                <div class="p-4 border-b border-gray-200 dark:border-gray-700"
                     :class="`bg-${themeColor}-50/50 dark:bg-${themeColor}-900/10`">
                  <h4 class="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                    {{ step.title || `Step ${step.number}` }}
                  </h4>
                </div>

                <!-- Step description -->
                <div class="p-4">
                  <p class="text-gray-700 dark:text-gray-300">{{ step.content }}</p>

                  <!-- Sub-steps if available -->
                  <div v-if="step.sub_steps && step.sub_steps.length > 0" class="mt-4 pl-4"
                       :class="`border-l-2 border-${themeColor}-200 dark:border-${themeColor}-800`">
                    <ul class="sub-steps-list space-y-2">
                      <li v-for="(subStep, subIndex) in step.sub_steps" :key="subIndex" class="text-gray-700 dark:text-gray-300 flex items-start">
                        <span class="inline-block w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium mr-2 mt-0.5"
                              :class="`bg-${themeColor}-100 dark:bg-${themeColor}-900/30 text-${themeColor}-600 dark:text-${themeColor}-400`">
                          {{ subIndex + 1 }}
                        </span>
                        <span>{{ subStep }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <!-- Simple Structure with page_type="simple" -->
          <ul v-else class="simple-steps-list space-y-4">
            <li v-for="(step, index) in howToBecome.steps" :key="index"
                class="simple-step-item bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">

              <!-- Step header with number and title -->
              <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center"
                   :class="`bg-${themeColor}-50/50 dark:bg-${themeColor}-900/10`">
                <div class="flex-shrink-0 mr-3 w-8 h-8 rounded-full flex items-center justify-center font-semibold shadow-sm"
                     :class="`bg-${themeColor}-100 dark:bg-${themeColor}-900/30 text-${themeColor}-600 dark:text-${themeColor}-400`">
                  {{ step.number }}
                </div>
                <h4 class="font-semibold text-gray-800 dark:text-gray-200">
                  {{ step.title || `Step ${step.number}` }}
                </h4>
              </div>

              <!-- Step content -->
              <div class="p-4">
                <p class="text-gray-700 dark:text-gray-300">{{ step.content }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Certifications and Resources Section -->
      <div v-if="howToBecome?.resources && howToBecome.resources.length > 0">
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center">
          <span class="inline-block p-2 rounded-full bg-purple-50 dark:bg-purple-900/20 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </span>
          Certifications and Resources
        </h3>
        <p class="text-gray-700 dark:text-gray-300 mb-3">
          The following certifications and resources can help you advance your career as a {{ howToBecome?.name.toLowerCase() }}:
        </p>

        <div class="space-y-4 mt-4">
          <div v-for="(resource, index) in howToBecome.resources" :key="index"
               class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-pointer" @click="toggleResourceInfo(index)">
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <span class="inline-block p-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  <h4 class="font-semibold text-gray-800 dark:text-gray-200">{{ resource.name }}</h4>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                    {{ resource.type }}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 transition-transform duration-200" :class="{ 'rotate-180': expandedResources.includes(index) }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div v-if="expandedResources.includes(index)" class="p-4">
              <p class="text-gray-700 dark:text-gray-300 mb-3">{{ resource.description }}</p>
              <a v-if="resource.url" :href="resource.url" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
                Visit Website
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, watch, onMounted } from 'vue';
import type { CareerHowToBecome as CareerHowToBecomeType } from '@/types/career';
import { currentTheme } from '@/lib/theme-utils';

const props = defineProps<{
  howToBecome?: CareerHowToBecomeType;
  isLoading: boolean;
}>();

// State for expanded resources
const expandedResources = ref<number[]>([]);

// Toggle resource information
const toggleResourceInfo = (index: number) => {
  if (expandedResources.value.includes(index)) {
    // Close the current resource
    expandedResources.value = expandedResources.value.filter(i => i !== index);
  } else {
    // Close any open resources and open the new one
    expandedResources.value = [index];
  }
};

// Computed property to determine if the career has a structured path or simple structure
const hasStructuredPath = computed(() => {
  return props.howToBecome?.page_type === 'structured';
});

// Get current theme color for styling
const themeColor = computed(() => {
  return currentTheme.value.color;
});

// Set CSS variables for theme colors
const setThemeVariables = () => {
  document.documentElement.style.setProperty('--theme-color-300', `var(--${themeColor.value}-300)`);
  document.documentElement.style.setProperty('--theme-color-500', `var(--${themeColor.value}-500)`);
  document.documentElement.style.setProperty('--theme-color-700', `var(--${themeColor.value}-700)`);
  document.documentElement.style.setProperty('--theme-color-rgb', themeColor.value === 'blue' ? '59, 130, 246' :
    themeColor.value === 'green' ? '34, 197, 94' :
    themeColor.value === 'red' ? '239, 68, 68' :
    themeColor.value === 'purple' ? '168, 85, 247' : '251, 146, 60');
  document.documentElement.style.setProperty('--theme-gradient', `linear-gradient(to bottom, var(--${themeColor.value}-300), var(--${themeColor.value}-500), var(--${themeColor.value}-700))`);
  document.documentElement.style.setProperty('--theme-shadow', `rgba(var(--theme-color-rgb), 0.5)`);
};

// Watch for theme changes and update CSS variables
watch(themeColor, () => {
  setThemeVariables();
}, { immediate: true });

// Set theme variables when component is mounted
onMounted(() => {
  setThemeVariables();
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

div[id^="how-to-become"] {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Steps list styling */
.steps-list {
  position: relative;
}

.steps-list::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 4.5px; /* Center the line with the step numbers */
  width: 2px;
  background: var(--theme-gradient, linear-gradient(to bottom, var(--theme-color-300), var(--theme-color-500), var(--theme-color-700)));
  z-index: 1;
}

.dark .steps-list::before {
  background: var(--theme-gradient, linear-gradient(to bottom, var(--theme-color-300), var(--theme-color-500), var(--theme-color-700)));
  opacity: 0.6;
}

.step-item {
  position: relative;
}

.step-item.last-step::after {
  display: none;
}

/* Hover effect for step items */
.step-item:hover .step-number {
  transform: scale(1.1);
  box-shadow: 0 0 15px var(--theme-shadow, rgba(var(--theme-color-rgb), 0.5));
}

.step-item:hover .step-content {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Transition effects */
.step-number {
  transition: all 0.3s ease;
}

.step-content {
  transition: all 0.3s ease;
}

/* Simple steps list styling */
.simple-steps-list {
  list-style: none;
  padding: 0;
}

.simple-step-item {
  transition: all 0.3s ease;
}

.simple-step-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
