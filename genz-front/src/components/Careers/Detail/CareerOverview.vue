<template>
  <div class="space-y-8">
    <!-- Main Overview Section -->
    <div id="overview" class="overflow-hidden transition-all duration-300 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <!-- Header -->
      <div class="border-b border-gray-100 dark:border-gray-800 p-6">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-full" :class="`bg-${themeColorName}-100 dark:bg-${themeColorName}-900/30`">
            <Briefcase :class="`h-6 w-6 text-${themeColorName}-500`" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ overview?.name }} Overview</h2>
        </div>
        <p class="mt-2 text-gray-500 dark:text-gray-400">
          Learn about what a {{ overview?.name.toLowerCase() }} does and if this career is right for you
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-t-2" :class="`border-${themeColorName}-500`"></div>
        <p class="mt-4 text-gray-500 dark:text-gray-400">Loading career overview...</p>
      </div>

      <div v-else-if="!overview" class="py-8 text-center">
        <p class="text-gray-500 dark:text-gray-400">No overview information available for this career.</p>
      </div>

      <div v-else class="p-6">
        <!-- What is a Career section -->
        <div id="what-is" class="mb-8">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-1.5 rounded-full" :class="`bg-${themeColorName}-100 dark:bg-${themeColorName}-900/30`">
              <HelpCircle :class="`h-5 w-5 text-${themeColorName}-500`" />
            </div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
              What is a {{ overview?.name }}?
            </h3>
          </div>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed pl-9">
            {{ overview?.definition }}
          </p>
        </div>

        <!-- What does a Career do section -->
        <div id="what-does" class="mb-8">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-1.5 rounded-full" :class="`bg-${themeColorName}-100 dark:bg-${themeColorName}-900/30`">
              <ClipboardList :class="`h-5 w-5 text-${themeColorName}-500`" />
            </div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
              What does a {{ overview?.name }} do?
            </h3>
          </div>

          <div class="pl-9">
            <h4 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Duties and Responsibilities</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-3">
              Here are the key duties and responsibilities of a {{ overview?.name.toLowerCase() }}:
            </p>

            <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li v-for="(duty, index) in overview?.duties" :key="index" class="leading-relaxed">
                {{ duty }}
              </li>
            </ul>

            <h4 v-if="overview?.career_types && overview.career_types.length > 0" class="text-lg font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Types of {{ overview?.name }}s</h4>
            <p v-if="overview?.career_types && overview.career_types.length > 0" class="text-gray-700 dark:text-gray-300 mb-3">
              {{ overview?.name }}s can be categorized into various types based on their specializations and approaches:
            </p>

            <div v-if="overview?.career_types && overview.career_types.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div
                v-for="(type, index) in overview.career_types"
                :key="index"
                class="relative p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-200"
                :class="`hover:border-${themeColorName}-200 dark:hover:border-${themeColorName}-800`"
                :style="{animationDelay: getAnimationDelay(index)}"
              >
                <div class="flex flex-col gap-2">
                  <div class="flex flex-wrap items-center gap-2 mb-2">
                    <h5 class="font-medium text-gray-800 dark:text-gray-200 mr-1">
                      {{ type.name }}
                    </h5>
                    <span class="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">
                      Career Type
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ type.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Are you suited to be a career? -->
        <div id="suited" class="mb-8">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-1.5 rounded-full" :class="`bg-${themeColorName}-100 dark:bg-${themeColorName}-900/30`">
              <UserCheck :class="`h-5 w-5 text-${themeColorName}-500`" />
            </div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Are you suited to be a {{ overview?.name.toLowerCase() }}?
            </h3>
          </div>

          <div class="pl-9">
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {{ overview?.name }}s have distinct personalities. They tend to be individuals with specific traits and characteristics that help them excel in this field.
            </p>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Does this sound like you? Take our free career test to find out if {{ overview?.name.toLowerCase() }} is one of your top career matches.
            </p>

            <div class="mt-6 flex flex-col sm:flex-row gap-3">
              <button :class="[
                'px-5 py-2.5 rounded-md text-white font-medium transition-colors duration-300 shadow-sm',
                `bg-${themeColorName}-500 hover:bg-${themeColorName}-600`
              ]">
                Take the free career test
              </button>
              <button class="px-5 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm">
                Learn more about the career test
              </button>
            </div>
          </div>
        </div>

        <!-- Career Stats Section with Badges -->
        <div v-if="overview" class="mb-8">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-1.5 rounded-full" :class="`bg-${themeColorName}-100 dark:bg-${themeColorName}-900/30`">
              <BarChart :class="`h-5 w-5 text-${themeColorName}-500`" />
            </div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Career Statistics
            </h3>
          </div>

          <div class="pl-9 grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Salary Badge -->
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <DollarSign class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Average Salary</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs px-3 py-1.5 rounded-full font-medium shadow-sm bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                  ${{ overview.salary.toLocaleString() }} per year
                </span>
              </div>
            </div>

            <!-- Satisfaction Badge -->
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <ThumbsUp class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Job Satisfaction</span>
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="text-xs px-3 py-1.5 rounded-full font-medium shadow-sm"
                  :class="{
                    'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400': overview.satisfaction === 'High',
                    'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400': overview.satisfaction === 'Medium',
                    'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400': overview.satisfaction === 'Low'
                  }"
                >
                  {{ overview.satisfaction }} Satisfaction
                </span>
              </div>
            </div>

            <!-- Workspace Badges -->
            <div class="flex flex-col gap-2 md:col-span-2">
              <div class="flex items-center gap-2">
                <Building class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Common Workplaces</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(workplace, index) in overview.workspace"
                  :key="index"
                  class="text-xs px-3 py-1.5 rounded-full font-medium shadow-sm bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                >
                  {{ workplace }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { currentTheme } from '@/lib/theme-utils';
import { useThemeStore } from '@/stores/theme/themeStore';
import type { CareerOverview as CareerOverviewType } from '@/types/career';
import { Briefcase, HelpCircle, ClipboardList, UserCheck, BarChart, DollarSign, ThumbsUp, Building, Info } from 'lucide-vue-next';

const props = defineProps<{
  overview?: CareerOverviewType;
  isLoading: boolean;
}>();

// Get theme store
const themeStore = useThemeStore();

// Get the current theme color
const themeColorName = computed(() => {
  return currentTheme.value.replace('-theme', '') || 'blue';
});

// Animation delay for staggered animations
const getAnimationDelay = (index: number) => {
  return `${index * 100}ms`;
};

// Determine if we're in dark mode
const isDarkMode = computed(() => {
  return themeStore.isDarkMode;
});

// Get card style based on theme - simplified as we're using Tailwind classes directly
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

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes expandIn {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    max-height: 1000px;
    transform: translateY(0);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.4;
  }
}

/* Apply animations */
h2, h3 {
  animation: fadeIn 0.5s ease-out forwards;
}

div[id^="overview"] {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Card animations */
div[id^="what-"], div[id^="suited"] {
  animation: scaleIn 0.5s ease-out forwards;
}

/* Workplace badge hover effect */
.group:hover .group-hover\:visible {
  visibility: visible;
  opacity: 1;
}

/* Animation delays */
.animation-delay-300 {
  animation-delay: 300ms;
}

/* Ensure animations only play once */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Pulse animation */
.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}
</style>
