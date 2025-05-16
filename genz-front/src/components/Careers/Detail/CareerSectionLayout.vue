<template>
  <div class="container mx-auto py-8 px-4 max-w-7xl">
    <!-- Loading state -->
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center py-12"
    >
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-t-2"
        :class="`border-${themeColorName}-500`"
      ></div>
      <p class="mt-4 text-gray-500 dark:text-gray-400">
        Loading career details...
      </p>
    </div>

    <template v-else>
      <!-- Breadcrumb navigation -->
      <slot name="breadcrumb"></slot>

      <!-- Career title and header section -->
      <slot name="header"></slot>

      <!-- Main grid layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left sidebar -->
        <div class="lg:col-span-1">
          <CareerSectionSidebar
            :careerOverview="careerOverview"
            :careerHowToBecome="careerHowToBecome"
            :careerPersonality="careerPersonality"
            :careerWorkEnvironment="careerWorkEnvironment"
            :activeTab="activeTab"
            :isLoading="isLoadingSidebar"
            :navigationItems="navigationItems"
          />
        </div>

        <!-- Main content area -->
        <div class="lg:col-span-2">
          <!-- Section navigation -->
          <CareerSectionNavigation
            :slug="slug"
            :activeTab="activeTab"
            :isLoading="isLoadingNavigation"
            :navigationItems="navigationItems"
            @tab-changed="handleTabChange"
          />

          <!-- Content area -->
          <div
            class="prose prose-sm md:prose max-w-none dark:prose-invert mt-6"
          >
            <slot name="content"></slot>
          </div>

          <!-- Back to top button at the end of content -->
          <div
            class="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end"
          >
            <button
              @click="scrollToTop"
              class="inline-flex items-center gap-2 text-sm font-medium rounded-md px-4 py-2 transition-colors"
              :class="`text-${themeColorName}-600 hover:bg-${themeColorName}-50 dark:text-${themeColorName}-400 dark:hover:bg-${themeColorName}-900/20`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
              Back to top
            </button>
          </div>
        </div>
      </div>

      <!-- Related content section -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <slot name="related-content"></slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { currentTheme } from "@/lib/theme-utils";
import CareerSectionSidebar from "./CareerSectionSidebar.vue";
import CareerSectionNavigation from "./CareerSectionNavigation.vue";
import type {
  CareerOverview,
  CareerHowToBecome,
  CareerPersonality,
  CareerWorkEnvironment,
  CareerNavigationItem,
} from "@/types/career";

// Define component props
const props = defineProps<{
  slug: string;
  activeTab: string;
  careerOverview: CareerOverview | null;
  careerHowToBecome: CareerHowToBecome | null;
  careerPersonality: CareerPersonality | null;
  careerWorkEnvironment: CareerWorkEnvironment | null;
  navigationItems: CareerNavigationItem[];
  isLoading: boolean;
  isLoadingSidebar: boolean;
  isLoadingNavigation: boolean;
}>();

// Define emits
const emit = defineEmits<{
  (e: "tab-changed", tabKey: string): void;
}>();

// Get the current theme color
const themeColorName = computed(() => {
  return currentTheme.value.replace("-theme", "") || "blue";
});

// Handle tab change
const handleTabChange = (tabKey: string) => {
  emit("tab-changed", tabKey);
};

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped>
/* Optional: Add fade-in animation for content */
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

.prose {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
