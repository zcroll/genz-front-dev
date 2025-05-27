<template>
  <div class="mb-8 space-y-4" v-bind="$attrs">
    <!-- Navigation header with section description -->
    <div
      v-if="!isLoading && activeTab && !hideHeader"
      class="bg-gray-50 dark:bg-gray-800/30 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-700"
    >
      <div class="flex items-start gap-3">
        <div class="mt-0.5 text-gray-400">
          <component :is="getCurrentSectionIcon()" class="h-5 w-5" />
        </div>
        <div>
          <h2 class="text-base font-medium text-gray-900 dark:text-white">
            {{ getCurrentSectionName() }}
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            {{ getCurrentSectionDescription() }}
          </p>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex flex-col">
      <div class="flex items-center justify-center py-2">
        <div
          class="animate-spin rounded-full h-5 w-5 border-2"
          :class="`border-${themeColorName}-500 border-r-transparent`"
        ></div>
        <span class="ml-2 text-sm text-gray-500 dark:text-gray-400"
          >Loading sections...</span
        >
      </div>

      <!-- Skeleton tabs -->
      <div
        class="flex flex-wrap border-b border-gray-200 dark:border-gray-700 mt-2"
      >
        <div
          class="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-t-md mr-1 animate-pulse"
        ></div>
        <div
          class="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded-t-md mr-1 animate-pulse"
        ></div>
        <div
          class="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-t-md mr-1 animate-pulse"
        ></div>
      </div>
    </div>

    <!-- Navigation tabs -->
    <div v-else class="relative">
      <!-- Tabs for larger screens -->
      <div class="border-b border-gray-200 dark:border-gray-700">
        <nav
          class="-mb-px flex gap-2 overflow-x-auto hide-scrollbar pb-px"
          aria-label="Career sections"
        >
          <router-link
            v-for="item in availableNavItems"
            :key="item.key"
            :to="getRouteFromUri(item.uri)"
            :class="[
              'inline-flex items-center py-3 px-4 text-sm font-medium transition-colors rounded-t-lg whitespace-nowrap',
              activeTab === item.key
                ? `border-b-2 border-${themeColorName}-500 text-${themeColorName}-600 dark:text-${themeColorName}-400`
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50',
            ]"
            @click="handleTabClick(item.key)"
          >
            <component
              :is="getIconForItem(item.key)"
              class="mr-2 h-4 w-4"
              :class="
                activeTab === item.key
                  ? `text-${themeColorName}-500`
                  : 'text-gray-400'
              "
            />
            {{ item.name }}
          </router-link>
        </nav>
      </div>

      <!-- Mobile dropdown selector -->
      <div class="sm:hidden mt-3 mb-1" :class="{ hidden: hideMobileNav }">
        <select
          :value="activeTab"
          @change="handleMobileSelect"
          :class="[
            'block w-full rounded-md text-base font-medium',
            `bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-${themeColorName}-500 focus:border-${themeColorName}-500`,
          ]"
        >
          <option
            v-for="item in availableNavItems"
            :key="item.key"
            :value="item.key"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router"; // useRoute removed as it's unused
import { currentTheme } from "@/lib/theme-utils";
import { fetchCareerNavigation } from "@/services/careerService";
import type { CareerNavigationItem } from "@/types/career";

// Import Lucide icons
import {
  BookOpen as LucideBookOpen,
  Briefcase as LucideBriefcase,
  User as LucideUser,
  GraduationCap as LucideGraduationCap,
  // Heart as LucideHeart, // Removed unused import
  Building2 as LucideBuilding2,
  Code as LucideCode,
  // ChevronDown as LucideChevronDown, // Removed unused import
} from "lucide-vue-next";

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  navigationItems: {
    type: Array as () => CareerNavigationItem[],
    default: () => [],
  },
  hideHeader: {
    type: Boolean,
    default: false,
  },
  hideMobileNav: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["tab-changed"]);

// Get the current router
// const route = useRoute(); // Removed unused variable
const router = useRouter();

// Get the current theme color
const themeColorName = computed(() => {
  return currentTheme.value.replace("-theme", "") || "blue";
});

// Component state
const internalNavigationItems = ref<CareerNavigationItem[]>([]);

// Computed property to filter only available navigation items
const availableNavItems = computed(() => {
  // Use prop navigationItems if provided, otherwise use internal state
  const items =
    props.navigationItems.length > 0
      ? props.navigationItems
      : internalNavigationItems.value;

  return items.filter((item) => item.available);
});

// Function to convert API URI to router path
const getRouteFromUri = (
  uri: string,
): { name: string; params: { slug: string } } => {
  // Extract the section key from the URI
  // Example URI: /careers/multimedia-animator/detail/overview
  const parts = uri.split("/");
  const sectionKey = parts[parts.length - 1];

  // Map section key to route name
  const routeMap: Record<string, string> = {
    overview: "career-overview",
    "how-to-become": "career-how-to-become",
    personality: "career-personality",
    "work-environment": "career-work-environment",
    "tech-skills": "career-tech-skills"
  };

  return {
    name: routeMap[sectionKey] || "career-overview",
    params: { slug: props.slug },
  };
};

// Handler for mobile navigation select change
const handleMobileSelect = (event: Event) => {
  const select = event.target as HTMLSelectElement;
  emit("tab-changed", select.value);

  // Find the navigation item
  const navItem = availableNavItems.value.find(
    (item) => item.key === select.value,
  );
  if (navItem) {
    router.push(getRouteFromUri(navItem.uri));
  }
};

// Handler for tab click
const handleTabClick = (tabKey: string) => {
  emit("tab-changed", tabKey);
};

// Fetch navigation data if not provided via props
const fetchNavigationData = async () => {
  // Skip fetch if navigation items are provided via props
  if (props.navigationItems.length > 0) {
    checkSectionAvailability();
    return;
  }

  try {
    const response = await fetchCareerNavigation(props.slug);
    if (response.success && response.data) {
      internalNavigationItems.value = response.data.navigation;
      checkSectionAvailability();
    }
  } catch (error) {
    console.error("Error fetching navigation data:", error);
  }
};

// Check if current section is available and redirect if needed
const checkSectionAvailability = () => {
  const items =
    props.navigationItems.length > 0
      ? props.navigationItems
      : internalNavigationItems.value;

  // If current section is not available, redirect to the first available section
  const currentSectionAvailable = items.some(
    (item) => item.key === props.activeTab && item.available,
  );

  if (!currentSectionAvailable && availableNavItems.value.length > 0) {
    const firstAvailableItem = availableNavItems.value[0];
    emit("tab-changed", firstAvailableItem.key);
    router.replace(getRouteFromUri(firstAvailableItem.uri));
  }
};

// Get the appropriate icon for each section
const getIconForItem = (tabId: string) => {
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
      return LucideCode; // Use LucideCode for tech-skills
    default:
      return LucideBookOpen;
  }
};

// Get current section name
const getCurrentSectionName = (): string => {
  if (!props.activeTab) return "";

  const currentSection = [
    ...props.navigationItems,
    ...internalNavigationItems.value,
  ].find((item) => item.key === props.activeTab);

  return currentSection?.name || "";
};

// Get current section icon
const getCurrentSectionIcon = () => {
  return getIconForItem(props.activeTab);
};

// Get description based on current section
const getCurrentSectionDescription = (): string => {
  switch (props.activeTab) {
    case "overview":
      return "Overview of what this professional does, including key responsibilities and duties.";
    case "how-to-become":
      return "Education, training, and steps required to enter this profession.";
    case "personality":
      return "Personality traits and characteristics that make someone successful in this role.";
    case "work-environment":
      return "Typical workplace settings, conditions, and employment arrangements.";
    case "tech-skills":
      return "no skils or teck"; // Updated description for tech-skills
    default:
      return "Information about this career section.";
  }
};

// Watch for slug changes to fetch new navigation data
watch(
  () => props.slug,
  (newSlug) => {
    if (newSlug && props.navigationItems.length === 0) {
      fetchNavigationData();
    } else if (props.navigationItems.length > 0) {
      checkSectionAvailability();
    }
  },
);

// Initial fetch on component mount
onMounted(() => {
  if (props.slug && props.navigationItems.length === 0) {
    fetchNavigationData();
  } else if (props.navigationItems.length > 0) {
    checkSectionAvailability();
  }
});
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
