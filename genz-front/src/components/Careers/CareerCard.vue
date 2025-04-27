<template>
  <div :class="[
    'group relative overflow-hidden rounded-xl border transition-all duration-200 hover:shadow-md',
    themeStore.isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
  ]">
    <!-- Career Image -->
    <div class="relative h-40 overflow-hidden">
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
          themeStore.isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        ]"
      >
        <BriefcaseIcon class="h-16 w-16 text-gray-400" />
      </div>
    </div>

    <!-- Career Content -->
    <div class="p-4">
      <h3 :class="[
        'text-lg font-semibold mb-2 line-clamp-2',
        themeStore.isDarkMode ? 'text-white' : 'text-gray-900'
      ]">
        {{ career.name }}
      </h3>

      <!-- Career Details -->
      <div class="space-y-2 mb-3">
        <!-- Salary -->
        <div v-if="career.salary" class="flex items-center text-sm">
          <CurrencyDollarIcon class="h-4 w-4 mr-2 text-green-500" />
          <span :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">
            {{ formatSalary(career.salary) }}
          </span>
        </div>

        <!-- Satisfaction -->
        <div v-if="career.satisfaction" class="flex items-center text-sm">
          <StarIcon class="h-4 w-4 mr-2 text-yellow-500" />
          <span :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">
            {{ career.satisfaction }} Satisfaction
          </span>
        </div>

        <!-- Industries -->
        <div v-if="career.industries && career.industries.length > 0" class="flex items-start text-sm">
          <BuildingOfficeIcon class="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
          <span :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">
            {{ career.industries.join(', ') }}
          </span>
        </div>

        <!-- Employment Type -->
        <div v-if="career.employment_type" class="flex items-center text-sm">
          <ClockIcon class="h-4 w-4 mr-2 text-purple-500" />
          <span :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">
            {{ career.employment_type }}
          </span>
        </div>
      </div>

      <!-- View Details Button -->
      <router-link
        :to="{ name: 'career-details', params: { slug: career.slug } }"
        :class="[
          'inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors',
          `bg-${themeStore.color}-500 hover:bg-${themeStore.color}-600 text-white`
        ]"
      >
        View Details
        <ArrowRightIcon class="ml-2 h-4 w-4" />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useThemeStore } from '@/stores/theme';
import { 
  BriefcaseIcon, 
  CurrencyDollarIcon, 
  StarIcon, 
  BuildingOfficeIcon,
  ClockIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline';
import type { Career } from '@/types/career';

const props = defineProps<{
  career: Career;
}>();

const themeStore = useThemeStore();

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
