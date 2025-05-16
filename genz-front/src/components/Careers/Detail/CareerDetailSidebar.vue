<template>
  <div
    class="sticky top-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md"
  >
    <!-- Skeleton loader for loading state -->
    <div v-if="isLoading" class="animate-pulse">
      <!-- Card header skeleton -->
      <div
        class="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80"
      >
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          <div class="flex-1">
            <div
              class="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"
            ></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
          </div>
        </div>
      </div>

      <!-- Card content skeleton -->
      <div class="p-6">
        <div class="space-y-4">
          <!-- CTA skeleton -->
          <div
            class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700"
          >
            <div
              class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full mb-3"
            ></div>
            <div class="flex flex-col sm:flex-row gap-3">
              <div
                class="h-10 bg-gray-200 dark:bg-gray-600 rounded w-full sm:w-1/2"
              ></div>
              <div
                class="h-10 bg-gray-200 dark:bg-gray-600 rounded w-full sm:w-1/2"
              ></div>
            </div>
          </div>

          <!-- Stats skeleton -->
          <div class="space-y-3">
            <div class="flex justify-between items-center p-2">
              <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
              <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
            </div>
            <div class="flex justify-between items-center p-2">
              <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
              <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
            </div>
            <div class="h-px bg-gray-200 dark:bg-gray-700"></div>
            <div class="flex justify-between items-center p-2">
              <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
              <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
            </div>
            <div class="flex justify-between items-center p-2">
              <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
              <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actual content when loaded -->
    <template v-else>
      <!-- Card header with career image and title -->
      <div
        class="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80"
      >
        <div class="flex items-center space-x-4">
          <img
            v-if="careerOverview?.image"
            :src="careerOverview.image"
            :alt="careerOverview?.name || 'Career'"
            class="w-16 h-16 rounded-lg object-cover shadow-sm border border-gray-100 dark:border-gray-700"
          />
          <div
            v-else
            class="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ careerOverview?.name }}
            </h2>
            <div class="mt-1">
              <span
                :class="[
                  'px-2 py-1 text-xs font-medium rounded-full text-white shadow-sm',
                  `bg-${themeColorName}-500`,
                ]"
              >
                {{ careerOverview?.satisfaction }} Satisfaction
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Card content -->
      <div class="p-6">
        <div class="space-y-4">
          <!-- Career test CTA -->
          <div
            class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm"
          >
            <p class="text-sm mb-3 text-gray-700 dark:text-gray-300">
              <strong
                >Would you make a good
                {{
                  careerOverview?.name?.toLowerCase() || "professional"
                }}?</strong
              >
              Take our career test to find your match with over 800 careers.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <button
                :class="[
                  'px-4 py-2 rounded-md text-white font-medium transition-colors shadow-sm',
                  `bg-${themeColorName}-500 hover:bg-${themeColorName}-600`,
                ]"
              >
                Take the free test now
              </button>
              <button
                class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm"
              >
                Learn more
              </button>
            </div>
          </div>

          <!-- Career stats -->
          <div class="space-y-3">
            <!-- Available section info -->
            <div
              v-if="careerOverview"
              class="mb-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase"
            >
              Available Sections:
            </div>

            <!-- Divider -->
            <div class="h-px bg-gray-200 dark:bg-gray-700 my-3"></div>

            <!-- Salary stat -->
            <div
              class="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div class="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Avg Salary</span
                >
              </div>
              <span class="text-gray-900 dark:text-white font-medium"
                >${{ formatSalary(careerOverview?.salary) }}</span
              >
            </div>

            <!-- Satisfaction stat -->
            <div
              class="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div class="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  ></path>
                </svg>
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Satisfaction</span
                >
              </div>
              <span class="text-gray-900 dark:text-white font-medium">{{
                careerOverview?.satisfaction || "N/A"
              }}</span>
            </div>

            <div
              v-if="careerWorkEnvironment?.employment"
              class="h-px bg-gray-200 dark:bg-gray-700"
            ></div>

            <!-- Employment ease stat -->
            <div
              v-if="
                careerWorkEnvironment?.employment?.ease_of_employment &&
                isSectionAvailable('work-environment')
              "
              class="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div class="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Employment</span
                >
              </div>
              <span class="text-gray-900 dark:text-white font-medium">{{
                careerWorkEnvironment?.employment?.ease_of_employment
              }}</span>
            </div>

            <!-- Employment type stat -->
            <div
              v-if="
                careerWorkEnvironment?.employment?.employment_type &&
                isSectionAvailable('work-environment')
              "
              class="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div class="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-purple-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Schedule</span
                >
              </div>
              <span class="text-gray-900 dark:text-white font-medium">{{
                careerWorkEnvironment?.employment?.employment_type
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { currentTheme } from "@/lib/theme-utils";
import type {
  CareerOverview,
  CareerWorkEnvironment,
  CareerNavigationItem,
} from "@/types/career";

const props = defineProps<{
  careerOverview: CareerOverview | null;
  careerWorkEnvironment: CareerWorkEnvironment | null;
  isLoading: boolean;
  navigationItems?: CareerNavigationItem[];
}>();

// Get the current theme color
const themeColorName = computed(() => {
  return currentTheme.value.replace("-theme", "") || "blue";
});

// Check if a navigation section is available
const isSectionAvailable = (key: string): boolean => {
  if (!props.navigationItems) return true;
  const item = props.navigationItems.find((item) => item.key === key);
  return item ? item.available : false;
};

// Format salary with commas
const formatSalary = (salary?: number): string => {
  if (!salary && salary !== 0) return "N/A";
  return salary.toLocaleString();
};
</script>
