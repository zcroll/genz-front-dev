<template>
  <Card
    variant="frosted"
    class="group relative overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col"
    :style="{ borderRadius: 'var(--card-corner-radius-default, 20px)' }"
  >
    <!-- Career Image -->
    <div class="relative h-40 overflow-hidden">
      <img
        v-if="career.image"
        :src="career.image"
        :alt="career.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        v-else
        :class="[
          'h-full w-full flex items-center justify-center',
          themeStore.isDarkMode ? 'bg-gray-800/70' : 'bg-gray-100/70'
        ]"
      >
        <BriefcaseIcon class="h-20 w-20 opacity-70" :style="{ color: 'var(--text-secondary)' }" />
      </div>

      <!-- Career Badge (if applicable) -->
      <div
        v-if="career.employment_type"
        class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
        :class="getEmploymentTypeClass(career.employment_type)"
      >
        {{ career.employment_type }}
      </div>
    </div>

    <!-- Career Content -->
    <CardContent class="flex-1 flex flex-col p-4">
      <CardTitle
        variant="frosted"
        class="mb-2 text-lg font-bold"
        :style="{ color: 'var(--text-primary)' }"
      >
        {{ career.name }}
      </CardTitle>

      <!-- Career Details -->
      <div class="space-y-2 mb-4 flex-1">
        <!-- Salary -->
        <div v-if="career.salary" class="flex items-center text-sm">
          <div class="flex-shrink-0 w-6 flex justify-center">
            <CurrencyDollarIcon class="h-4 w-4 text-green-500" />
          </div>
          <span :style="{ color: 'var(--text-secondary)' }" class="font-medium">
            {{ formatSalary(career.salary) }}
          </span>
        </div>

        <!-- Satisfaction -->
        <div v-if="career.satisfaction" class="flex items-center text-sm">
          <div class="flex-shrink-0 w-6 flex justify-center">
            <StarIcon class="h-4 w-4 text-yellow-500" />
          </div>
          <span :style="{ color: 'var(--text-secondary)' }" class="font-medium">
            {{ career.satisfaction }} Satisfaction
          </span>
        </div>

        <!-- Industries -->
        <div v-if="career.industries && career.industries.length > 0" class="flex items-start text-sm">
          <div class="flex-shrink-0 w-6 flex justify-center mt-0.5">
            <BuildingOfficeIcon class="h-4 w-4 text-blue-500" />
          </div>
          <span :style="{ color: 'var(--text-secondary)' }" class="font-medium">
            {{ formatIndustries(career.industries) }}
          </span>
        </div>
      </div>

      <!-- View Details Button -->
      <router-link
        :to="{ name: 'career-details', params: { slug: career.slug } }"
        class="w-full block mt-auto"
      >
        <Button
          class="w-full transition-all duration-300 transform hover:translate-y-[-2px]"
          :class="`bg-${themeColorName}-500 hover:bg-${themeColorName}-600 focus:ring-2 focus:ring-${themeColorName}-500 focus:ring-offset-2 focus:outline-none text-white`"
        >
          View Details
        </Button>
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

// Format industries to show first 2 and indicate if there are more
const formatIndustries = (industries: string[]): string => {
  if (industries.length <= 2) {
    return industries.join(', ');
  }
  return `${industries.slice(0, 2).join(', ')} +${industries.length - 2} more`;
};

// Get appropriate class for employment type badge
const getEmploymentTypeClass = (type: string): string => {
  const baseClasses = 'backdrop-blur-sm';

  switch (type.toLowerCase()) {
    case 'full-time':
      return `${baseClasses} bg-blue-500/80 text-white`;
    case 'part-time':
      return `${baseClasses} bg-purple-500/80 text-white`;
    case 'mixed':
      return `${baseClasses} bg-amber-500/80 text-white`;
    default:
      return `${baseClasses} bg-${themeColorName.value}-500/80 text-white`;
  }
};
</script>

<style scoped>
/* Add smooth transitions for all interactive elements */
.card-hover-effect {
  transition: all 0.3s ease;
}

/* Ensure the card takes full height in the grid */
:deep(.card) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Ensure content area takes remaining space */
:deep(.card-content) {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
