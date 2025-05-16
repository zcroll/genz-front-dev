<template>
  <div v-bind="$attrs" class="sticky top-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
    <!-- Skeleton loader for loading state -->
    <div v-if="isLoading" class="animate-pulse">
      <!-- Card header skeleton -->
      <div class="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          <div class="flex-1">
            <div class="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
          </div>
        </div>
      </div>
      
      <!-- Card content skeleton -->
      <div class="p-6">
        <div class="space-y-4">
          <!-- Current section info skeleton -->
          <div class="pb-4 border-b border-gray-200 dark:border-gray-700">
            <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-3"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mt-2"></div>
          </div>
          
          <!-- Navigation skeleton -->
          <div>
            <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mb-2"></div>
            <div class="flex flex-wrap gap-2">
              <div class="h-8 bg-gray-200 dark:bg-gray-600 rounded w-20"></div>
              <div class="h-8 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
              <div class="h-8 bg-gray-200 dark:bg-gray-600 rounded w-20"></div>
            </div>
          </div>
          
          <!-- Stats skeleton -->
          <div>
            <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mb-2"></div>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
              </div>
              <div class="flex justify-between items-center">
                <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-28"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Actual content when loaded -->
    <template v-else>
      <!-- Card header with career info -->
      <div class="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <div class="flex items-center space-x-4">
          <img
            v-if="careerOverview?.image"
            :src="careerOverview.image"
            :alt="careerOverview?.name || 'Career'"
            class="w-16 h-16 rounded-lg object-cover shadow-sm border border-gray-100 dark:border-gray-700"
          />
          <div v-else class="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ careerOverview?.name }}
            </h2>
            <div class="mt-1">
              <span
                :class="[
                  'px-2 py-1 text-xs font-medium rounded-full text-white shadow-sm',
                  `bg-${themeColorName}-500`,
                ]"
              >
                {{ careerOverview?.satisfaction || 'N/A' }} Satisfaction
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Card content -->
      <div class="p-6">
        <div class="space-y-5">
          <!-- Current section info -->
          <div class="pb-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Current Section
            </h3>
            <div :class="[
              'px-3 py-2 rounded-md text-sm border', 
              `border-${themeColorName}-200 dark:border-${themeColorName}-800/40 bg-${themeColorName}-50 dark:bg-${themeColorName}-900/20`
            ]">
              <div class="font-medium" :class="`text-${themeColorName}-700 dark:text-${themeColorName}-300`">
                {{ getCurrentSectionName() }}
              </div>
              <div class="text-gray-600 dark:text-gray-400 text-xs mt-1">
                {{ getCurrentSectionDescription() }}
              </div>
            </div>
          </div>
          
          <!-- Available sections -->
          <div>
            <h3 class="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Navigation
            </h3>
            <div class="flex flex-wrap gap-2">
              <router-link
                v-for="item in navigationItems.filter(item => item.available && item.key !== activeTab)"
                :key="item.key"
                :to="{ path: item.uri }"
                :class="[
                  'px-2 py-1 text-xs font-medium rounded-md transition-colors',
                  `text-${themeColorName}-600 dark:text-${themeColorName}-400 
                   bg-gray-100 dark:bg-gray-800 
                   hover:bg-${themeColorName}-100 dark:hover:bg-${themeColorName}-900/30 
                   border border-gray-200 dark:border-gray-700`
                ]"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
          
          <!-- Key stats -->
          <div class="pt-2">
            <h3 class="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Career Stats
            </h3>
            <div class="space-y-2.5">
              <!-- Salary stat -->
              <div class="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span class="text-sm text-gray-700 dark:text-gray-300">Avg Salary</span>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">${{ formatSalary(careerOverview?.salary) }}</span>
              </div>
              
              <!-- Satisfaction stat -->
              <div class="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span class="text-sm text-gray-700 dark:text-gray-300">Satisfaction</span>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ careerOverview?.satisfaction || 'N/A' }}</span>
              </div>
              
              <!-- Dynamic section-specific stats -->
              <template v-if="activeTab === 'work-environment' && careerWorkEnvironment?.employment">
                <div class="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Employment</span>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">{{ careerWorkEnvironment.employment.ease_of_employment }}</span>
                </div>
                
                <div class="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Schedule</span>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">{{ careerWorkEnvironment.employment.employment_type }}</span>
                </div>
              </template>
              
              <template v-if="activeTab === 'personality' && careerPersonality?.holland_codes && careerPersonality.holland_codes.length > 0">
                <div class="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Top Holland Code</span>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ getTopHollandCode() }}
                  </span>
                </div>
              </template>
              
              <template v-if="activeTab === 'how-to-become' && careerHowToBecome?.education_level">
                <div class="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Education</span>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ careerHowToBecome.education_level }}
                  </span>
                </div>
              </template>
            </div>
          </div>
          
          <!-- Section action -->
          <div class="pt-2 mt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              :class="[
                'w-full px-4 py-2 rounded-md text-white font-medium transition-colors shadow-sm text-sm',
                `bg-${themeColorName}-500 hover:bg-${themeColorName}-600`,
              ]"
            >
              See Related {{ getRelatedContentName() }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { currentTheme } from '@/lib/theme-utils';
import type {
  CareerOverview,
  CareerHowToBecome,
  CareerPersonality,
  CareerWorkEnvironment,
  CareerNavigationItem,
} from '@/types/career';

const props = defineProps<{
  careerOverview: CareerOverview | null;
  careerHowToBecome: CareerHowToBecome | null;
  careerPersonality: CareerPersonality | null;
  careerWorkEnvironment: CareerWorkEnvironment | null;
  activeTab: string;
  isLoading: boolean;
  navigationItems: CareerNavigationItem[];
}>();

// Get the current theme color
const themeColorName = computed(() => {
  return currentTheme.value.replace("-theme", "") || "blue";
});

// Format salary with commas
const formatSalary = (salary?: number): string => {
  if (!salary && salary !== 0) return "N/A";
  return salary.toLocaleString();
};

// Get the current section name
const getCurrentSectionName = (): string => {
  if (!props.navigationItems) return 'Overview';
  const currentSection = props.navigationItems.find(item => item.key === props.activeTab);
  return currentSection?.name || 'Overview';
};

// Get description based on current section
const getCurrentSectionDescription = (): string => {
  switch (props.activeTab) {
    case 'overview':
      return 'Overview of the career duties, responsibilities, and general information.';
    case 'how-to-become':
      return 'Education, training, and steps required to enter this profession.';
    case 'personality':
      return 'Personality traits and characteristics that make someone successful in this career.';
    case 'work-environment':
      return 'Typical workplace settings, conditions, and employment types.';
    case 'tech-skills':
    case 'technologies':
    case 'skills':
      return 'Technical skills, tools, and technologies used in this profession.';
    default:
      return 'Information about this career section.';
  }
};

// Get the top Holland code if available
const getTopHollandCode = (): string => {
  if (!props.careerPersonality?.holland_codes || props.careerPersonality.holland_codes.length === 0) {
    return 'N/A';
  }
  
  // Sort by order field (or value if order not available)
  const sortedCodes = [...props.careerPersonality.holland_codes].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return b.value - a.value;
  });
  
  return sortedCodes[0].code;
};

// Get related content name based on section
const getRelatedContentName = (): string => {
  switch (props.activeTab) {
    case 'overview':
      return 'Careers';
    case 'how-to-become':
      return 'Degrees';
    case 'personality':
      return 'Personality Types';
    case 'work-environment':
      return 'Workplaces';
    case 'tech-skills':
    case 'technologies':
    case 'skills':
      return 'Technologies';
    default:
      return 'Content';
  }
};
</script>