<template>
  <Card variant="frosted" class="group relative overflow-hidden transition-all duration-200 hover:shadow-lg">
    <!-- Career Image -->
    <div class="relative h-40 overflow-hidden rounded-t-xl">
      <img
        v-if="career.image"
        :src="career.image"
        :alt="career.name"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        v-else
        :class="[
          'h-full w-full flex items-center justify-center',
          themeStore.isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/70'
        ]"
      >
        <BriefcaseIcon class="h-16 w-16" :style="{ color: 'var(--text-secondary)' }" />
      </div>
    </div>

    <!-- Career Content -->
    <CardContent>
      <CardTitle variant="frosted" class="mb-2 line-clamp-2">
        {{ career.name }}
      </CardTitle>

      <!-- Career Details -->
      <div class="space-y-3 mb-4">
        <!-- Salary -->
        <div v-if="career.salary" class="flex items-center text-sm">
          <CurrencyDollarIcon class="h-4 w-4 mr-2 text-green-500" />
          <span :style="{ color: 'var(--text-secondary)' }">
            {{ formatSalary(career.salary) }}
          </span>
        </div>

        <!-- Satisfaction -->
        <div v-if="career.satisfaction" class="flex items-center text-sm">
          <StarIcon class="h-4 w-4 mr-2 text-yellow-500" />
          <span :style="{ color: 'var(--text-secondary)' }">
            {{ career.satisfaction }} Satisfaction
          </span>
        </div>

        <!-- Industries -->
        <div v-if="career.industries && career.industries.length > 0" class="flex items-start text-sm">
          <BuildingOfficeIcon class="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
          <span :style="{ color: 'var(--text-secondary)' }" class="line-clamp-2">
            {{ career.industries.join(', ') }}
          </span>
        </div>

        <!-- Employment Type -->
        <div v-if="career.employment_type" class="flex items-center text-sm">
          <ClockIcon class="h-4 w-4 mr-2 text-purple-500" />
          <span :style="{ color: 'var(--text-secondary)' }">
            {{ career.employment_type }}
          </span>
        </div>
      </div>

      <!-- View Details Button -->
      <router-link
        :to="{ name: 'career-details', params: { slug: career.slug } }"
        class="w-full block"
      >
        <Button class="w-full" :class="`hover:bg-${themeColorName}-600 focus:ring-2 focus:ring-${themeColorName}-500 focus:ring-offset-2 focus:outline-none`">View Details</Button>
      </router-link>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useThemeStore } from '@/stores/theme/themeStore';
import { currentTheme } from '@/lib/theme-utils';
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  StarIcon,
  BuildingOfficeIcon,
  ClockIcon
} from '@heroicons/vue/24/outline';
import type { Career } from '@/types/career';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const props = defineProps<{
  career: Career;
}>();

const themeStore = useThemeStore();

// Get the current theme color (blue, green, purple, amber)
const themeColorName = computed(() => {
  // Get theme from theme-utils
  const themeId = currentTheme.value;
  // Remove '-theme' suffix if present
  return themeId.replace('-theme', '');
});

// Format salary with commas and dollar sign
const formatSalary = (salary: number): string => {
  return `$${salary.toLocaleString()}`;
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
