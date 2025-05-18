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

          <!-- Key stats -->
          <div class="pt-2">
            <h3 class="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              {{ getSectionStatsTitle() }}
            </h3>
            <div class="space-y-2.5">
              <!-- Overview Section Stats -->
              <template v-if="activeTab === 'overview'">
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

                <!-- Industry info -->
                <div v-if="careerOverview?.career_types && careerOverview.career_types.length > 0" class="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2 20h20"/>
                      <path d="M5 20V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v13"/>
                      <path d="M13 20V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v17"/>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Industry</span>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ careerOverview.career_types[0].name }}
                  </span>
                </div>
              </template>

              <!-- How to Become Section Stats -->
              <template v-if="activeTab === 'how-to-become' && careerHowToBecome">
                <!-- Education Level -->
                <div class="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Education Level</span>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ getHighestEducationLevel() }}
                  </span>
                </div>

                <!-- Related Degrees -->
                <div v-if="careerHowToBecome.degrees && careerHowToBecome.degrees.length > 0" class="p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                  <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                      </svg>
                      <span class="text-sm text-gray-700 dark:text-gray-300">Related Degrees</span>
                    </div>
                    <span class="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {{ careerHowToBecome.degrees.length }} total
                    </span>
                  </div>

                  <!-- List of degrees (up to 3) -->
                  <ul class="mt-1 space-y-1 pl-6 list-disc text-sm">
                    <li v-for="(degree, index) in careerHowToBecome.degrees.slice(0, 3)" :key="degree.id" class="text-gray-700 dark:text-gray-300">
                      {{ degree.name }}
                    </li>
                    <li v-if="careerHowToBecome.degrees.length > 3" class="text-gray-500 dark:text-gray-400 italic text-xs">
                      + {{ careerHowToBecome.degrees.length - 3 }} more degrees
                    </li>
                  </ul>
                </div>

                <!-- Steps to Become -->
                <div v-if="careerHowToBecome.steps && careerHowToBecome.steps.length > 0" class="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Career Path</span>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ careerHowToBecome.steps.length }} Steps
                  </span>
                </div>
              </template>

              <!-- Personality Section Stats -->
              <template v-if="activeTab === 'personality' && careerPersonality">
                <!-- Top Holland Code -->
                <div v-if="careerPersonality.holland_codes && careerPersonality.holland_codes.length > 0" class="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
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

                <!-- Top Big Five Trait -->
                <div v-if="careerPersonality.big_five_traits && careerPersonality.big_five_traits.length > 0" class="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Top Big Five Trait</span>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ getTopBigFiveTrait() }}
                  </span>
                </div>

                <!-- Personality Match -->
                <div class="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Personality Match</span>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ careerOverview?.satisfaction || 'N/A' }}
                  </span>
                </div>
              </template>

              <!-- Work Environment Section Stats -->
              <template v-if="activeTab === 'work-environment' && careerWorkEnvironment">
                <!-- Employment Type -->
                <div v-if="careerWorkEnvironment.employment" class="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Employment Type</span>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">{{ careerWorkEnvironment.employment.employment_type }}</span>
                </div>

                <!-- Ease of Employment -->
                <div v-if="careerWorkEnvironment.employment" class="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Ease of Employment</span>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">{{ careerWorkEnvironment.employment.ease_of_employment }}</span>
                </div>

                <!-- Work Schedule -->
                <div v-if="careerWorkEnvironment.work_schedule" class="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Full-time</span>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">{{ careerWorkEnvironment.work_schedule.full_time_percent }}%</span>
                </div>
              </template>

              <!-- Tech Skills Section Stats -->
              <template v-if="(activeTab === 'tech-skills' || activeTab === 'technologies' || activeTab === 'skills') && careerOverview">
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
              </template>
            </div>
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

// Get the section stats title based on active tab
const getSectionStatsTitle = (): string => {
  switch (props.activeTab) {
    case 'overview':
      return 'Career Overview';
    case 'how-to-become':
      return 'Education & Training';
    case 'personality':
      return 'Personality Traits';
    case 'work-environment':
      return 'Work Conditions';
    case 'tech-skills':
    case 'technologies':
    case 'skills':
      return 'Technical Skills';
    default:
      return 'Career Stats';
  }
};

// Get the top Big Five trait if available
const getTopBigFiveTrait = (): string => {
  if (!props.careerPersonality?.big_five_traits || props.careerPersonality.big_five_traits.length === 0) {
    return 'N/A';
  }

  // Sort by order field (or value if order not available)
  const sortedTraits = [...props.careerPersonality.big_five_traits].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return b.value - a.value;
  });

  return sortedTraits[0].trait;
};

// Get the highest education level based on hierarchy
const getHighestEducationLevel = (): string => {
  if (!props.careerHowToBecome?.education_level) {
    return 'N/A';
  }

  const educationLevel = props.careerHowToBecome.education_level.toLowerCase();

  // Check for doctorate level
  if (educationLevel.includes('doctorate') || educationLevel.includes('ph.d') || educationLevel.includes('doctoral')) {
    return 'Doctorate';
  }

  // Check for master's level
  if (educationLevel.includes('master') || educationLevel.includes('graduate degree')) {
    return 'Master\'s degree';
  }

  // Check for bachelor's level
  if (educationLevel.includes('bachelor') || educationLevel.includes('undergraduate degree')) {
    return 'Bachelor\'s degree';
  }

  // Check for associate or certificate level
  if (educationLevel.includes('associate') || educationLevel.includes('certificate')) {
    return 'Certificate or associate degree';
  }

  // Default to high school diploma
  if (educationLevel.includes('high school') || educationLevel.includes('diploma') || educationLevel.includes('ged')) {
    return 'High school diploma';
  }

  // Return the original value if it doesn't match any of the above
  return props.careerHowToBecome.education_level;
};
</script>