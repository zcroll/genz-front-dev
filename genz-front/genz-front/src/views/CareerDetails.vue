<template>
  <div class="container mx-auto py-8 px-4 max-w-7xl">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-t-2" :class="`border-${themeColorName}-500`"></div>
      <p class="mt-4 text-gray-500 dark:text-gray-400">Loading career details...</p>
    </div>

    <template v-else>
      <!-- Shadcn Breadcrumb navigation with Lucide icons -->
      <AppBreadcrumb :items="breadcrumbItems" />

      <!-- Career title and compatibility with enhanced styling -->
      <div class="mb-10">
        <h1 class="text-4xl font-bold mb-3 text-gray-900 dark:text-white">What does a {{ careerOverview?.name?.toLowerCase() }} do?</h1>
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <span :class="[
            'px-3 py-1 text-sm font-medium rounded-full text-white inline-flex items-center justify-center shadow-sm',
            `bg-${themeColorName}-500 hover:bg-${themeColorName}-600 transition-colors`
          ]">
            {{ careerOverview?.satisfaction }} Satisfaction
          </span>
          <p class="text-gray-600 dark:text-gray-400">
            <strong>Would you make a good {{ careerOverview?.name?.toLowerCase() }}?</strong> Take our career test and find your match with over 800 careers.
          </p>
        </div>
      </div>

      <!-- Career content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left sidebar with career summary - enhanced styling -->
        <div class="lg:col-span-1">
          <div class="sticky top-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">

            <!-- Card header with enhanced styling -->
            <div class="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
              <div class="flex items-center space-x-4">
                <img
                  v-if="careerOverview?.image"
                  :src="careerOverview.image"
                  :alt="careerOverview.name"
                  class="w-16 h-16 rounded-lg object-cover shadow-sm border border-gray-100 dark:border-gray-700"
                />
                <div v-else class="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <div>
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ careerOverview?.name }}</h2>
                  <div class="mt-1">
                    <span :class="[
                      'px-2 py-1 text-xs font-medium rounded-full text-white shadow-sm',
                      `bg-${themeColorName}-500`
                    ]">
                      {{ careerOverview?.satisfaction }} Satisfaction
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card content -->
            <div class="p-6">
              <div class="space-y-4">
                <!-- Career test CTA with enhanced styling -->
                <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                  <p class="text-sm mb-3 text-gray-700 dark:text-gray-300">
                    <strong>Would you make a good {{ careerOverview?.name?.toLowerCase() }}?</strong> Take our career test and find your match with over 800 careers.
                  </p>
                  <div class="flex flex-col sm:flex-row gap-3">
                    <button :class="[
                      'px-4 py-2 rounded-md text-white font-medium transition-colors shadow-sm',
                      `bg-${themeColorName}-500 hover:bg-${themeColorName}-600`
                    ]">
                      Take the free test now
                    </button>
                    <button class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm">
                      Learn more
                    </button>
                  </div>
                </div>

                <!-- Career stats with enhanced styling -->
                <div class="space-y-3">
                  <div class="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div class="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <span class="font-medium text-gray-700 dark:text-gray-300">Avg Salary</span>
                    </div>
                    <span class="text-gray-900 dark:text-white font-medium">${{ formatSalary(careerOverview?.salary) }}</span>
                  </div>

                  <div class="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div class="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      <span class="font-medium text-gray-700 dark:text-gray-300">Satisfaction</span>
                    </div>
                    <span class="text-gray-900 dark:text-white font-medium">{{ careerOverview?.satisfaction }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main content area -->
        <div class="lg:col-span-2">
          <!-- Dynamic Navigation tabs with enhanced styling -->
          <CareerNavigation
            :slug="route.params.slug as string"
            :active-tab="activeTab"
            :is-loading="isLoadingNavigation"
            @navigation-loaded="handleNavigationLoaded"
          />

          <!-- Tab content with enhanced styling -->
          <CareerOverview
            v-if="activeTab === 'overview'"
            :overview="careerOverview"
            :isLoading="isLoadingOverview"
          />

          <CareerHowToBecome
            v-if="activeTab === 'how-to-become'"
            :howToBecome="careerHowToBecome"
            :isLoading="isLoadingHowToBecome"
          />

          <CareerPersonality
            v-if="activeTab === 'personality'"
            :personality="careerPersonality"
            :isLoading="isLoadingPersonality"
          />

          <CareerWorkEnvironment
            v-if="activeTab === 'work-environment'"
            :workEnvironment="careerWorkEnvironment"
            :isLoading="isLoadingWorkEnvironment"
          />

          <CareerTechSkills
            v-if="activeTab === 'tech-skills'"
            :techSkills="careerTechSkills"
            :isLoading="isLoadingTechSkills"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { currentTheme } from '@/lib/theme-utils';
import MainLayout from "@/layout/Main-layout.vue";
import CareerOverview from '@/components/Careers/Detail/CareerOverview.vue';
import CareerHowToBecome from '@/components/Careers/Detail/CareerHowToBecome.vue';
import CareerPersonality from '@/components/Careers/Detail/CareerPersonality.vue';
import CareerWorkEnvironment from '@/components/Careers/Detail/CareerWorkEnvironment.vue';
import CareerTechSkills from '@/components/Careers/Detail/CareerTechSkills.vue';
import CareerNavigation from '@/components/Careers/Detail/CareerNavigation.vue';
import {
  fetchCareerOverview,
  fetchCareerHowToBecome,
  fetchCareerPersonality,
  fetchCareerWorkEnvironment,
  fetchCareerTechSkills
} from '@/services/careerService';
import type {
  CareerOverview as CareerOverviewType,
  CareerHowToBecome as CareerHowToBecomeType,
  CareerPersonality as CareerPersonalityType,
  CareerWorkEnvironment as CareerWorkEnvironmentType,
  CareerTechSkills as CareerTechSkillsType,
  CareerNavigationItem
} from '@/types/career';

// Import AppBreadcrumb component
import AppBreadcrumb from "@/components/ui/breadcrumb/AppBreadcrumb.vue";

// Import Lucide icons for dynamic component resolution
import {
  Home as LucideHome,
  Briefcase as LucideBriefcase,
  User as LucideUser,
  GraduationCap as LucideGraduationCap,
  Heart as LucideHeart,
  Building2 as LucideBuilding2,
  Code as LucideCode
} from "lucide-vue-next";

// Define the layout to use
defineOptions({
  layout: MainLayout,
});

// Get the current route
const route = useRoute();

// Get the current theme color
const themeColorName = computed(() => {
  return currentTheme.value.replace('-theme', '') || 'blue';
});

// Loading states
const isLoading = ref(true);
const isLoadingOverview = ref(true);
const isLoadingHowToBecome = ref(true);
const isLoadingPersonality = ref(true);
const isLoadingWorkEnvironment = ref(true);
const isLoadingTechSkills = ref(true);
const isLoadingNavigation = ref(true);

// Career data
const careerOverview = ref<CareerOverviewType | null>(null);
const careerHowToBecome = ref<CareerHowToBecomeType | null>(null);
const careerPersonality = ref<CareerPersonalityType | null>(null);
const careerWorkEnvironment = ref<CareerWorkEnvironmentType | null>(null);
const careerTechSkills = ref<CareerTechSkillsType | null>(null);
const navigationItems = ref<CareerNavigationItem[]>([]);

// Get active section from route
const activeTab = computed(() => {
  return route.meta.section as string || 'overview';
});

// Format salary with commas
const formatSalary = (salary?: number): string => {
  if (!salary) return 'N/A';
  return salary.toLocaleString();
};

// Helper function to get the icon for a tab
const getIconForTab = (tabId: string) => {
  switch (tabId) {
    case 'overview':
      return LucideUser;
    case 'how-to-become':
      return LucideGraduationCap;
    case 'personality':
      return LucideHeart;
    case 'work-environment':
      return LucideBuilding2;
    case 'tech-skills':
      return LucideCode;
    default:
      return LucideUser;
  }
};

// Handle navigation loaded event
const handleNavigationLoaded = (items: CareerNavigationItem[]) => {
  navigationItems.value = items;
  isLoadingNavigation.value = false;
};

// Create breadcrumb items based on route and career data
const breadcrumbItems = computed(() => {
  // Base items that are always present
  const items = [
    {
      name: 'Home',
      path: { name: 'home' },
      icon: LucideHome
    },
    {
      name: 'Careers',
      path: { name: 'careers.index' },
      icon: LucideBriefcase
    }
  ];

  // Add career name if available
  if (careerOverview.value?.name) {
    items.push({
      name: careerOverview.value.name,
      // If we're on the overview tab, this is the current page (no path)
      // Otherwise, it's a link to the overview page
      path: activeTab.value === 'overview' ? undefined : { name: 'career-overview', params: { slug: route.params.slug } },
      icon: LucideUser
    });
  }

  // Add section tab if not on overview
  if (activeTab.value !== 'overview') {
    // Find the current tab in the navigation items
    const currentTab = navigationItems.value.find(item => item.key === activeTab.value);

    if (currentTab) {
      // Add the current section as the last breadcrumb item
      // This is the current page, so no path needed (current page is not clickable)
      items.push({
        name: currentTab.name,
        icon: getIconForTab(currentTab.key)
      });
    }
  }

  return items;
});

// Fetch career data based on active tab
const fetchCareerData = async (slug: string) => {
  isLoading.value = true;

  try {
    // Always fetch overview data for the sidebar
    if (!careerOverview.value) {
      isLoadingOverview.value = true;
      const overviewResponse = await fetchCareerOverview(slug);
      if (overviewResponse.success && overviewResponse.data) {
        careerOverview.value = overviewResponse.data;
      }
      isLoadingOverview.value = false;
    }

    // Fetch section-specific data based on active tab
    const currentSection = activeTab.value;

    if (currentSection === 'overview' && !careerOverview.value) {
      // Overview data already fetched above
    } else if (currentSection === 'how-to-become' && !careerHowToBecome.value) {
      isLoadingHowToBecome.value = true;
      const howToBecomeResponse = await fetchCareerHowToBecome(slug);
      if (howToBecomeResponse.success && howToBecomeResponse.data) {
        careerHowToBecome.value = howToBecomeResponse.data;
      }
      isLoadingHowToBecome.value = false;
    } else if (currentSection === 'personality' && !careerPersonality.value) {
      isLoadingPersonality.value = true;
      const personalityResponse = await fetchCareerPersonality(slug);
      if (personalityResponse.success && personalityResponse.data) {
        careerPersonality.value = personalityResponse.data;
      }
      isLoadingPersonality.value = false;
    } else if (currentSection === 'work-environment' && !careerWorkEnvironment.value) {
      isLoadingWorkEnvironment.value = true;
      const workEnvironmentResponse = await fetchCareerWorkEnvironment(slug);
      if (workEnvironmentResponse.success && workEnvironmentResponse.data) {
        careerWorkEnvironment.value = workEnvironmentResponse.data;
      }
      isLoadingWorkEnvironment.value = false;
    } else if (currentSection === 'tech-skills' && !careerTechSkills.value) {
      isLoadingTechSkills.value = true;
      const techSkillsResponse = await fetchCareerTechSkills(slug);
      if (techSkillsResponse.success && techSkillsResponse.data) {
        careerTechSkills.value = techSkillsResponse.data;
      }
      isLoadingTechSkills.value = false;
    }
  } catch (error) {
    console.error('Error fetching career data:', error);
  } finally {
    isLoading.value = false;
  }
};

// Watch for route changes to fetch data for the new career or section
watch(
  [() => route.params.slug, () => route.meta.section],
  ([newSlug, newSection]) => {
    if (newSlug) {
      // Reset data when slug changes (new career)
      if (route.params.slug !== newSlug) {
        careerOverview.value = null;
        careerHowToBecome.value = null;
        careerPersonality.value = null;
        careerWorkEnvironment.value = null;
        careerTechSkills.value = null;
        navigationItems.value = [];
        isLoadingNavigation.value = true;
      }
      fetchCareerData(newSlug as string);
    }
  },
  { immediate: true }
);
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

h2, h3 {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Smooth transitions for tab content */
div[id^="what-"], div[id^="workplace"], div[id^="personality"], div[id^="how-to-become"] {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Card animations */
.sticky {
  animation: slideInRight 0.6s ease-out forwards;
}

/* Bottom navigation animations */
.grid > div {
  animation: scaleIn 0.5s ease-out forwards;
}

.grid > div:nth-child(1) {
  animation-delay: 0.1s;
}

.grid > div:nth-child(2) {
  animation-delay: 0.2s;
}

.grid > div:nth-child(3) {
  animation-delay: 0.3s;
}

/* Hover effects */
.hover\:shadow-md:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease-out;
}
</style>
