<template>
  <div class="mb-8 border-b dark:border-gray-700">
    <div v-if="isLoading" class="flex justify-center py-4">
      <div
        class="animate-spin rounded-full h-6 w-6 border-b-2"
        :class="`border-${themeColorName}-500`"
      ></div>
    </div>
    <div v-else class="flex flex-wrap -mb-px">
      <router-link
        v-for="item in availableNavItems"
        :key="item.key"
        :to="getRouteFromUri(item.uri)"
        :class="[
          'inline-block py-4 px-4 text-sm font-medium transition-colors duration-200',
          activeTab === item.key
            ? `border-b-2 border-${themeColorName}-500 text-${themeColorName}-500 hover:text-${themeColorName}-600`
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
        ]"
        @click="$emit('tab-changed', item.key)"
      >
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { currentTheme } from "@/lib/theme-utils";
import { fetchCareerNavigation } from "@/services/careerService";
import type { CareerNavigationItem } from "@/types/career";

const props = defineProps<{
  slug: string;
  activeTab: string;
  isLoading?: boolean;
  navigationItems?: CareerNavigationItem[];
}>();

const emit = defineEmits(["tab-changed"]);

// Get the current route and router
const route = useRoute();
const router = useRouter();

// Get the current theme color
const themeColorName = computed(() => {
  return currentTheme.value.replace("-theme", "") || "blue";
});

// Component state
const isLoading = ref(props.isLoading !== undefined ? props.isLoading : true);
const internalNavigationItems = ref<CareerNavigationItem[]>([]);

// Computed property to filter only available navigation items
const availableNavItems = computed(() => {
  // Use prop navigationItems if provided, otherwise use internal state
  const items = props.navigationItems || internalNavigationItems.value;
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
    "tech-skills": "career-tech-skills",
    technologies: "career-tech-skills",
    skills: "career-tech-skills",
  };

  return {
    name: routeMap[sectionKey] || "career-overview",
    params: { slug: props.slug },
  };
};

// Fetch navigation data if not provided via props
const fetchNavigationData = async () => {
  // Skip fetch if navigation items are provided via props
  if (props.navigationItems) {
    isLoading.value = false;
    checkSectionAvailability();
    return;
  }

  isLoading.value = true;
  try {
    const response = await fetchCareerNavigation(props.slug);
    if (response.success && response.data) {
      internalNavigationItems.value = response.data.navigation;
      checkSectionAvailability();
    }
  } catch (error) {
    console.error('Error fetching navigation data:', error);
  } finally {
    isLoading.value = false;
  }
};

// Check if current section is available and redirect if needed
const checkSectionAvailability = () => {
  const items = props.navigationItems || internalNavigationItems.value;
  
  // If current section is not available, redirect to the first available section
  const currentSectionAvailable = items.some(
    item => item.key === props.activeTab && item.available
  );
  
  if (!currentSectionAvailable && availableNavItems.value.length > 0) {
    const firstAvailableItem = availableNavItems.value[0];
    emit('tab-changed', firstAvailableItem.key);
    router.replace(getRouteFromUri(firstAvailableItem.uri));
  }
};

// Watch for slug changes to fetch new navigation data
watch(
  () => props.slug,
  (newSlug) => {
    if (newSlug) {
      fetchNavigationData();
    }
  },
);

// Initial fetch on component mount
onMounted(() => {
  if (props.slug) {
    fetchNavigationData();
  }
});
</script>
