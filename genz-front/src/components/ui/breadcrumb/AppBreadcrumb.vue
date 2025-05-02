<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LucideHome } from "lucide-vue-next";
import { useThemeStore } from '@/stores/theme';
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

// Props for the component
const props = defineProps<{
  items: Array<{
    name: string;
    path?: string | Record<string, any>;
    icon?: any;
  }>;
}>();

// Get the current route
const route = useRoute();

// Initialize theme store
const themeStore = useThemeStore();

// Get current theme color
const themeColor = computed(() => {
  return themeStore.currentColor || 'blue';
});

// Get theme-based styles
const themeStyles = computed(() => {
  // Safely access isDarkMode with fallback
  const isDark = themeStore.isDarkMode;
  const color = themeColor.value;

  return {
    activeColor: isDark ? `text-${color}-400` : `text-${color}-600`,
    hoverColor: isDark ? `hover:text-${color}-300` : `hover:text-${color}-500`,
  };
});
</script>

<template>
  <Breadcrumb class="mb-6">
    <BreadcrumbList>
      <!-- Dynamic breadcrumb items -->
      <template v-for="(item, index) in props.items" :key="index">
        <BreadcrumbItem>
          <!-- If it's the last item, show as current page -->
          <BreadcrumbPage v-if="index === props.items.length - 1"
            :class="themeStyles.activeColor">
            <span class="inline-flex items-center gap-1.5">
              <component v-if="item.icon" :is="item.icon" class="size-4" aria-hidden="true" />
              {{ item.name }}
            </span>
          </BreadcrumbPage>

          <!-- If it has a path, show as a link -->
          <template v-else-if="item.path">
            <!-- Use RouterLink for object paths -->
            <RouterLink v-if="typeof item.path === 'object'"
              :to="item.path"
              class="inline-flex items-center gap-1.5 transition-colors duration-200"
              :class="[
                'text-gray-600 dark:text-gray-400',
                themeStyles.hoverColor
              ]">
              <component v-if="item.icon" :is="item.icon" class="size-4" aria-hidden="true" />
              {{ item.name }}
            </RouterLink>

            <!-- Use BreadcrumbLink for string paths -->
            <BreadcrumbLink v-else
              :to="item.path"
              class="inline-flex items-center gap-1.5 transition-colors duration-200"
              :class="[
                route.path === item.path ? themeStyles.activeColor : 'text-gray-600 dark:text-gray-400',
                themeStyles.hoverColor
              ]">
              <component v-if="item.icon" :is="item.icon" class="size-4" aria-hidden="true" />
              {{ item.name }}
            </BreadcrumbLink>
          </template>

          <!-- If no path, show as text -->
          <span v-else class="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <component v-if="item.icon" :is="item.icon" class="size-4" aria-hidden="true" />
            {{ item.name }}
          </span>
        </BreadcrumbItem>

        <!-- Add separator if not the last item -->
        <BreadcrumbSeparator v-if="index < props.items.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<style scoped>
.size-4 {
  width: 1rem;
  height: 1rem;
}
</style>
