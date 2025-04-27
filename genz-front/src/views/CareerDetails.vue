<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-16">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-t-2" :class="`border-${themeStore.color}-500`"></div>
      <p class="ml-4 text-lg text-gray-600 dark:text-gray-300">Loading career details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16">
      <h2 class="text-2xl font-bold mb-4 text-red-500">Error Loading Career</h2>
      <p class="text-gray-600 dark:text-gray-300 mb-6">{{ error }}</p>
      <router-link 
        to="/careers" 
        class="px-4 py-2 rounded-lg text-white transition-colors"
        :class="`bg-${themeStore.color}-500 hover:bg-${themeStore.color}-600`"
      >
        Back to Careers
      </router-link>
    </div>

    <!-- Career Details -->
    <div v-else-if="career" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Image and Basic Info -->
      <div class="lg:col-span-1">
        <div :class="[
          'rounded-xl overflow-hidden border mb-6',
          themeStore.isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]">
          <!-- Career Image -->
          <div class="h-64 overflow-hidden">
            <img
              v-if="career.image"
              :src="career.image"
              :alt="career.name"
              class="h-full w-full object-cover"
            />
            <div
              v-else
              :class="[
                'h-full w-full flex items-center justify-center',
                themeStore.isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              ]"
            >
              <BriefcaseIcon class="h-24 w-24 text-gray-400" />
            </div>
          </div>

          <!-- Basic Info -->
          <div class="p-6 space-y-4">
            <h1 :class="[
              'text-2xl font-bold',
              themeStore.isDarkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ career.name }}
            </h1>

            <!-- Career Stats -->
            <div class="space-y-3">
              <!-- Salary -->
              <div v-if="career.salary" class="flex items-center">
                <CurrencyDollarIcon class="h-5 w-5 mr-3 text-green-500" />
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Average Salary</p>
                  <p :class="[
                    'font-medium',
                    themeStore.isDarkMode ? 'text-white' : 'text-gray-900'
                  ]">
                    {{ formatSalary(career.salary) }}
                  </p>
                </div>
              </div>

              <!-- Satisfaction -->
              <div v-if="career.satisfaction" class="flex items-center">
                <StarIcon class="h-5 w-5 mr-3 text-yellow-500" />
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Job Satisfaction</p>
                  <p :class="[
                    'font-medium',
                    themeStore.isDarkMode ? 'text-white' : 'text-gray-900'
                  ]">
                    {{ career.satisfaction }}
                  </p>
                </div>
              </div>

              <!-- Employment Type -->
              <div v-if="career.employment_type" class="flex items-center">
                <ClockIcon class="h-5 w-5 mr-3 text-purple-500" />
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Employment Type</p>
                  <p :class="[
                    'font-medium',
                    themeStore.isDarkMode ? 'text-white' : 'text-gray-900'
                  ]">
                    {{ career.employment_type }}
                  </p>
                </div>
              </div>

              <!-- Ease of Employment -->
              <div v-if="career.ease_of_employment" class="flex items-center">
                <UserPlusIcon class="h-5 w-5 mr-3 text-blue-500" />
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Ease of Employment</p>
                  <p :class="[
                    'font-medium',
                    themeStore.isDarkMode ? 'text-white' : 'text-gray-900'
                  ]">
                    {{ career.ease_of_employment }}
                  </p>
                </div>
              </div>

              <!-- Self Employment -->
              <div v-if="career.self_employment" class="flex items-center">
                <UserIcon class="h-5 w-5 mr-3 text-indigo-500" />
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Self Employment</p>
                  <p :class="[
                    'font-medium',
                    themeStore.isDarkMode ? 'text-white' : 'text-gray-900'
                  ]">
                    {{ career.self_employment }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Back Button -->
        <router-link 
          to="/careers" 
          class="inline-flex items-center px-4 py-2 rounded-lg text-white transition-colors mb-6"
          :class="`bg-${themeStore.color}-500 hover:bg-${themeStore.color}-600`"
        >
          <ArrowLeftIcon class="h-4 w-4 mr-2" />
          Back to Careers
        </router-link>
      </div>

      <!-- Right Column: Details -->
      <div class="lg:col-span-2">
        <!-- Industries -->
        <div v-if="career.industries && career.industries.length > 0" :class="[
          'rounded-xl p-6 mb-6',
          themeStore.isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]">
          <h2 :class="[
            'text-xl font-semibold mb-4 flex items-center',
            themeStore.isDarkMode ? 'text-white' : 'text-gray-900'
          ]">
            <BuildingOfficeIcon class="h-5 w-5 mr-2 text-blue-500" />
            Industries
          </h2>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="industry in career.industries" 
              :key="industry"
              :class="[
                'px-3 py-1 rounded-full text-sm',
                themeStore.isDarkMode 
                  ? 'bg-gray-700 text-gray-200' 
                  : 'bg-gray-100 text-gray-800'
              ]"
            >
              {{ industry }}
            </span>
          </div>
        </div>

        <!-- Related Degrees -->
        <div v-if="career.degrees && career.degrees.length > 0" :class="[
          'rounded-xl p-6 mb-6',
          themeStore.isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]">
          <h2 :class="[
            'text-xl font-semibold mb-4 flex items-center',
            themeStore.isDarkMode ? 'text-white' : 'text-gray-900'
          ]">
            <AcademicCapIcon class="h-5 w-5 mr-2 text-amber-500" />
            Related Degrees
          </h2>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="degree in career.degrees" 
              :key="degree"
              :class="[
                'px-3 py-1 rounded-full text-sm',
                themeStore.isDarkMode 
                  ? 'bg-gray-700 text-gray-200' 
                  : 'bg-gray-100 text-gray-800'
              ]"
            >
              {{ degree }}
            </span>
          </div>
        </div>

        <!-- Description Placeholder -->
        <div :class="[
          'rounded-xl p-6',
          themeStore.isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        ]">
          <h2 :class="[
            'text-xl font-semibold mb-4',
            themeStore.isDarkMode ? 'text-white' : 'text-gray-900'
          ]">
            About this Career
          </h2>
          <p :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-700'">
            This is a placeholder description for {{ career.name }}. In a real application, this would contain detailed information about the career path, required skills, day-to-day responsibilities, and growth opportunities.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useThemeStore } from '@/stores/theme';
import { fetchCareerBySlug } from '@/services/careerService';
import type { Career } from '@/types/career';
import { 
  BriefcaseIcon, 
  CurrencyDollarIcon, 
  StarIcon, 
  BuildingOfficeIcon,
  ClockIcon,
  UserPlusIcon,
  UserIcon,
  AcademicCapIcon,
  ArrowLeftIcon
} from '@heroicons/vue/24/outline';
import MainLayout from "@/layout/Main-layout.vue";

defineOptions({
  layout: MainLayout,
});

const route = useRoute();
const themeStore = useThemeStore();

const career = ref<Career | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Format salary with commas and dollar sign
const formatSalary = (salary: number): string => {
  return `$${salary.toLocaleString()}`;
};

// Fetch career details
const fetchCareerDetails = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    
    const slug = route.params.slug as string;
    const data = await fetchCareerBySlug(slug);
    
    if (data) {
      career.value = data;
    } else {
      error.value = 'Career not found';
    }
  } catch (err) {
    console.error('Error fetching career details:', err);
    error.value = 'Failed to load career details. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchCareerDetails();
});
</script>
