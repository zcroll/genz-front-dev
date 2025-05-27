<template>
  <CareerSectionLayout
    :slug="route.params.slug as string"
    :activeTab="activeTab"
    :careerOverview="careerOverview"
    :careerHowToBecome="careerHowToBecome"
    :careerPersonality="careerPersonality"
    :careerWorkEnvironment="careerWorkEnvironment"
    :navigationItems="navigationItems"
    :isLoading="isLoading"
    :isLoadingSidebar="isLoadingOverview"
    :isLoadingNavigation="isLoadingNavigation"
    @tab-changed="handleTabChanged"
  >
    <!-- Breadcrumb slot -->
    <template #breadcrumb>
      <AppBreadcrumb :items="breadcrumbItems" />
    </template>

    <!-- Header slot -->
    <template #header>
      <CareerDetailHeader
        :careerOverview="careerOverview"
        :isLoading="isLoadingOverview"
      />
    </template>

    <!-- Content slot -->
    <template #content>
      <!-- Overview tab -->
      <CareerOverview
        v-if="activeTab === 'overview'"
        :overview="careerOverview"
        :isLoading="isLoadingOverview"
      />

      <!-- How to Become tab -->
      <CareerHowToBecome
        v-if="activeTab === 'how-to-become'"
        :howToBecome="careerHowToBecome"
        :isLoading="isLoadingHowToBecome"
      />

      <!-- Personality tab -->
      <CareerPersonality
        v-if="activeTab === 'personality'"
        :personality="careerPersonality"
        :isLoading="isLoadingPersonality"
      />

      <!-- Work Environment tab -->
      <CareerWorkEnvironment
        v-if="activeTab === 'work-environment'"
        :workEnvironment="careerWorkEnvironment"
        :isLoading="isLoadingWorkEnvironment"
      />

      <!-- Tech Skills tab -->
      <CareerTechSkills
        v-if="
          activeTab === 'tech-skills' ||
          activeTab === 'technologies' ||
          activeTab === 'skills'
        "
        :techSkills="careerTechSkills"
        :isLoading="isLoadingTechSkills"
      />
    </template>

    <!-- Related content slot -->
    <template #related-content>
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Related Content
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        Explore related careers, degrees, and resources.
      </p>
    </template>
  </CareerSectionLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import MainLayout from "@/layout/Main-layout.vue";
import { useCareerCacheStore } from "@/stores/careerCacheStore";
import {
  fetchCareerOverview,
  fetchCareerHowToBecome,
  fetchCareerPersonality,
  fetchCareerWorkEnvironment,
  fetchCareerTechSkills,
  fetchCareerNavigation,
} from "@/services/careerService";
import type {
  CareerOverview as CareerOverviewType,
  CareerHowToBecome as CareerHowToBecomeType,
  CareerPersonality as CareerPersonalityType,
  CareerWorkEnvironment as CareerWorkEnvironmentType,
  CareerTechSkills as CareerTechSkillsType,
  CareerNavigationItem,
} from "@/types/career";

// Import AppBreadcrumb component
import AppBreadcrumb from "@/components/ui/breadcrumb/AppBreadcrumb.vue";

// Import our new section layout components
import CareerSectionLayout from "@/components/Careers/Detail/CareerSectionLayout.vue";
import CareerDetailHeader from "@/components/Careers/Detail/CareerDetailHeader.vue";
import CareerOverview from "@/components/Careers/Detail/CareerOverview.vue";
import CareerHowToBecome from "@/components/Careers/Detail/CareerHowToBecome.vue";
import CareerPersonality from "@/components/Careers/Detail/CareerPersonality.vue";
import CareerWorkEnvironment from "@/components/Careers/Detail/CareerWorkEnvironment.vue";
import CareerTechSkills from "@/components/Careers/Detail/CareerTechSkills.vue";

// Import Lucide icons for dynamic component resolution
import {
  Home as LucideHome,
  Briefcase as LucideBriefcase,
  User as LucideUser,
  GraduationCap as LucideGraduationCap,
  Building2 as LucideBuilding2,
} from "lucide-vue-next";

// Define the layout to use
defineOptions({
  layout: MainLayout,
});

// Get the current route and router
const route = useRoute();
const router = useRouter();

// Initialize the cache store
const cacheStore = useCareerCacheStore();

// Function to reset career data when switching between careers
const resetCareerData = () => {
  careerOverview.value = null;
  careerHowToBecome.value = null;
  careerPersonality.value = null;
  careerWorkEnvironment.value = null;
  careerTechSkills.value = null;
  navigationItems.value = [];

  // Reset all loading states
  isLoading.value = true;
  isLoadingNavigation.value = true;
  isLoadingOverview.value = true;
  isLoadingHowToBecome.value = true;
  isLoadingPersonality.value = true;
  isLoadingWorkEnvironment.value = true;
  isLoadingTechSkills.value = true;
};

// Loading states
const isLoading = ref(true);
const isLoadingNavigation = ref(true);
const isLoadingOverview = ref(true);
const isLoadingHowToBecome = ref(true);
const isLoadingPersonality = ref(true);
const isLoadingWorkEnvironment = ref(true);
const isLoadingTechSkills = ref(true);

// Career data
const careerOverview = ref<CareerOverviewType | null>(null);
const careerHowToBecome = ref<CareerHowToBecomeType | null>(null);
const careerPersonality = ref<CareerPersonalityType | null>(null);
const careerWorkEnvironment = ref<CareerWorkEnvironmentType | null>(null);
const careerTechSkills = ref<CareerTechSkillsType | null>(null);
const navigationItems = ref<CareerNavigationItem[]>([]);

// Get active section from route
const activeTab = computed(() => {
  return (route.meta.section as string) || "overview";
});

// Navigation data is loaded in the fetchCareerData function and passed to components

// Handle tab change event
const handleTabChanged = (tabKey: string) => {
  // Navigate to the correct route based on tab key
  const routeMap: Record<string, string> = {
    overview: "career-overview",
    "how-to-become": "career-how-to-become",
    personality: "career-personality",
    "work-environment": "career-work-environment",
    "tech-skills": "career-tech-skills",
  };

  const routeName = routeMap[tabKey] || "career-overview";

  // Preload section data if not already loaded to avoid flash of loading state
  const preloadSectionData = async () => {
    const slug = route.params.slug as string;

    switch(tabKey) {
      case 'how-to-become':
        if (!careerHowToBecome.value && !isLoadingHowToBecome.value) {
          fetchCareerData(slug);
        }
        break;
      case 'personality':
        if (!careerPersonality.value && !isLoadingPersonality.value) {
          fetchCareerData(slug);
        }
        break;
      case 'work-environment':
        if (!careerWorkEnvironment.value && !isLoadingWorkEnvironment.value) {
          fetchCareerData(slug);
        }
        break;
      case 'tech-skills':
        break;
    }
  };

  // Preload data then navigate
  preloadSectionData();

  router.push({
    name: routeName,
    params: { slug: route.params.slug as string },
  });
};

// Breadcrumb items construction
const breadcrumbItems = computed(() => {
  // Base items that are always present
  const items = [
    {
      name: "Home",
      path: { name: "home" },
      icon: LucideHome,
    },
    {
      name: "Careers",
      path: { name: "careers.index" },
      icon: LucideBriefcase,
    },
  ];

  // Add career name if available
  if (careerOverview.value) {
    items.push({
      name: careerOverview.value.name,
      path: activeTab.value === "overview"
          ? undefined
          : { name: "career-overview", params: { slug: route.params.slug as string } },
      icon: LucideUser,
    });
  }

  // Add section tab if not on overview
  if (activeTab.value !== "overview") {
    items.push({
      name: getNavLabel(activeTab.value),
      icon: getIconForTab(activeTab.value),
      path: undefined, // Current page, so path is undefined
    });
  }

  return items;
});

// Fetch career data based on active tab
// Function to fetch career data with cache support
const fetchCareerData = async (slug: string) => {
  // Reset loading states
  isLoading.value = true;
  isLoadingNavigation.value = true;
  isLoadingOverview.value = !careerOverview.value;
  isLoadingHowToBecome.value = !careerHowToBecome.value;
  isLoadingPersonality.value = !careerPersonality.value;
  isLoadingWorkEnvironment.value = !careerWorkEnvironment.value;
  isLoadingTechSkills.value = !careerTechSkills.value;

  try {
      // Check if we already have the data in memory first
      if (navigationItems.value.length > 0) {
        isLoadingNavigation.value = false;
      } else {
        // Fetch navigation data from cache or API (15 minute expiry)
        isLoadingNavigation.value = true;
        const navigationResponse = await cacheStore.getOrFetchData(
          "careerNavigation",
          slug,
          async () => await fetchCareerNavigation(slug),
          15 * 60 * 1000 // 15 minutes expiry
        );

        if (navigationResponse.success && navigationResponse.data) {
          navigationItems.value = navigationResponse.data.navigation;
          // Check if current section is available
          const currentSectionAvailable = navigationItems.value.some(
            (item) => item.key === activeTab.value && item.available,
          );

          // If current section is not available, redirect to the first available section
          if (
            !currentSectionAvailable &&
            navigationItems.value.filter((item) => item.available).length > 0
          ) {
            const firstAvailableItem = navigationItems.value.find(
              (item) => item.available,
            );
            if (firstAvailableItem) {
              handleTabChanged(firstAvailableItem.key);
            }
          }
        }
        isLoadingNavigation.value = false;
      }

    // Fetch overview data for the sidebar - with caching and memory check
    if (!careerOverview.value) {
      isLoadingOverview.value = true;
      const overviewResponse = await cacheStore.getOrFetchData(
        "careerOverview",
        slug,
        async () => await fetchCareerOverview(slug),
        30 * 60 * 1000 // 30 minutes expiry
      );

      if (overviewResponse.success && overviewResponse.data) {
        careerOverview.value = overviewResponse.data;
      }
      isLoadingOverview.value = false;
    } else {
      // If we already have the overview data, make sure loading state is false
      isLoadingOverview.value = false;
    }

    // Fetch section-specific data based on active tab
    const currentSection = activeTab.value;

    if (currentSection === "overview") {
      // Overview data already fetched above
      isLoadingOverview.value = false;
    } else if (currentSection === "how-to-become") {
      if (careerHowToBecome.value) {
        isLoadingHowToBecome.value = false;
      } else {
        isLoadingHowToBecome.value = true;
        const howToBecomeResponse = await cacheStore.getOrFetchData(
          "careerHowToBecome",
          slug,
          async () => await fetchCareerHowToBecome(slug),
          20 * 60 * 1000 // 20 minutes expiry
        );

        if (howToBecomeResponse.success && howToBecomeResponse.data) {
          careerHowToBecome.value = howToBecomeResponse.data;
        }
        isLoadingHowToBecome.value = false;
      }
    } else if (currentSection === "personality") {
      if (careerPersonality.value) {
        isLoadingPersonality.value = false;
      } else {
        isLoadingPersonality.value = true;
        const personalityResponse = await cacheStore.getOrFetchData(
          "careerPersonality",
          slug,
          async () => await fetchCareerPersonality(slug),
          20 * 60 * 1000 // 20 minutes expiry
        );

        if (personalityResponse.success && personalityResponse.data) {
          careerPersonality.value = personalityResponse.data;
        }
        isLoadingPersonality.value = false;
      }
    } else if (currentSection === "work-environment") {
      if (careerWorkEnvironment.value) {
        isLoadingWorkEnvironment.value = false;
      } else {
        isLoadingWorkEnvironment.value = true;
        const workEnvironmentResponse = await cacheStore.getOrFetchData(
          'careerWorkEnvironment',
          slug,
          async () => await fetchCareerWorkEnvironment(slug),
          20 * 60 * 1000 // 20 minutes expiry
        );

        if (workEnvironmentResponse.success && workEnvironmentResponse.data) {
          careerWorkEnvironment.value = workEnvironmentResponse.data;
        }
        isLoadingWorkEnvironment.value = false;
      }
    } else if (
      currentSection === "tech-skills" ||
      currentSection === "technologies" ||
      currentSection === "skills"
    ) {
      if (careerTechSkills.value) {
        isLoadingTechSkills.value = false;
      } else {
        isLoadingTechSkills.value = true;
        const techSkillsResponse = await cacheStore.getOrFetchData(
          'careerTechSkills',
          slug,
          async () => await fetchCareerTechSkills(slug),
          20 * 60 * 1000 // 20 minutes expiry
        );

        if (techSkillsResponse.success && techSkillsResponse.data) {
          careerTechSkills.value = techSkillsResponse.data;
        }
        isLoadingTechSkills.value = false;
      }
    }
  } catch (error) {
    console.error("Error fetching career data:", error);
  } finally {
    isLoading.value = false;
  }
};

// Watch for route changes to fetch data for the new career or section
watch(
  [() => route.params.slug, () => route.meta.section],
  ([newSlug, newSection], oldValues) => {
    if (newSlug) {
      const oldSlug = oldValues?.[0];

      // Reset data and clear cache when slug changes (new career)
      if (oldSlug && newSlug !== oldSlug) {
        // Clear cache for the previous career
        cacheStore.clearEndpointCache('careerOverview');
        cacheStore.clearEndpointCache('careerHowToBecome');
        cacheStore.clearEndpointCache('careerPersonality');
        cacheStore.clearEndpointCache('careerWorkEnvironment');
        cacheStore.clearEndpointCache('careerTechSkills');

        // Reset component state
        resetCareerData();
      } else if (newSection !== oldValues?.[1]) {
        // Just navigating between sections - use cached data
        console.log(`Navigating to section: ${newSection}`);
      }

      // Fetch data for the current career/section
      fetchCareerData(newSlug as string);
    }
  },
  { immediate: true },
);

// Helper function to get the icon for a tab
const getIconForTab = (tabId: string) => {
  switch (tabId) {
    case "overview":
      return LucideBriefcase;
    case "how-to-become":
      return LucideGraduationCap;
    case "personality":
      return LucideUser;
    case "work-environment":
      return LucideBuilding2;
    case "tech-skills":
    case "technologies":
    default:
      return LucideBriefcase;
  }
};

// Helper function to get label for navigation key
const getNavLabel = (key: string): string => {
  if (!navigationItems.value || navigationItems.value.length === 0) {
    // Default labels if navigation items are not loaded
    const defaultLabels: Record<string, string> = {
      overview: "Career Overview",
      "how-to-become": "How to Become",
      personality: "Personality",
      "work-environment": "Work Environment",
      "tech-skills": "Tech Skills",
      technologies: "Technologies",
    };
    return defaultLabels[key] || key;
  }

  // Find the label from navigation items
  const navItem = navigationItems.value.find((item) => item.key === key);
  return navItem ? navItem.name : key;
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

h2,
h3 {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Smooth transitions for tab content */
div[id^="what-"],
div[id^="workplace"],
div[id^="personality"],
div[id^="how-to-become"] {
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
