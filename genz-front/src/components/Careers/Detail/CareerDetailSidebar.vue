<template>
  <div
    class="sticky top-8 rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
    :style="cardStyle"
  >
    <!-- Skeleton loader for loading state -->
    <div v-if="isLoading" class="animate-pulse">
      <!-- Card header skeleton -->
      <div
        class="p-6 border-b border-border bg-muted/50"
      >
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 rounded-lg bg-muted"></div>
          <div class="flex-1">
            <div
              class="h-6 bg-muted rounded w-3/4 mb-2"
            ></div>
            <div class="h-4 bg-muted rounded w-24"></div>
          </div>
        </div>
      </div>

      <!-- Card content skeleton -->
      <div class="p-6">
        <div class="space-y-4">
          <!-- CTA skeleton -->
          <div
            class="bg-muted/30 p-4 rounded-lg border border-border"
          >
            <div
              class="h-4 bg-muted rounded w-full mb-3"
            ></div>
            <div class="flex flex-col sm:flex-row gap-3">
              <div
                class="h-10 bg-muted rounded w-full sm:w-1/2"
              ></div>
              <div
                class="h-10 bg-muted rounded w-full sm:w-1/2"
              ></div>
            </div>
          </div>

          <!-- Stats skeleton -->
          <div class="space-y-3">
            <div class="flex justify-between items-center p-2">
              <div class="h-5 bg-muted rounded w-32"></div>
              <div class="h-5 bg-muted rounded w-24"></div>
            </div>
            <div class="flex justify-between items-center p-2">
              <div class="h-5 bg-muted rounded w-32"></div>
              <div class="h-5 bg-muted rounded w-24"></div>
            </div>
            <div class="h-px bg-border"></div>
            <div class="flex justify-between items-center p-2">
              <div class="h-5 bg-muted rounded w-32"></div>
              <div class="h-5 bg-muted rounded w-24"></div>
            </div>
            <div class="flex justify-between items-center p-2">
              <div class="h-5 bg-muted rounded w-32"></div>
              <div class="h-5 bg-muted rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actual content when loaded -->
    <template v-else>
      <!-- Card header with career image and title -->
      <div
        class="p-6 border-b border-border bg-muted/50"
      >
        <div class="flex items-center space-x-4">
          <img
            v-if="careerOverview?.image"
            :src="careerOverview.image"
            :alt="careerOverview?.name || 'Career'"
            class="w-16 h-16 rounded-lg object-cover shadow-sm border border-border"
          />
          <div
            v-else
            class="w-16 h-16 rounded-lg bg-muted flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-muted-foreground"
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
            <h2 class="text-xl font-bold text-foreground">
              {{ careerOverview?.name }}
            </h2>
            <div class="mt-1">
              <span
                :class="[
                  'px-2 py-1 text-xs font-medium rounded-full text-primary-foreground shadow-sm',
                  `bg-primary`,
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
            class="bg-muted/30 p-4 rounded-lg border border-border shadow-sm"
          >
            <p class="text-sm mb-3 text-muted-foreground">
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
                class="px-4 py-2 rounded-md text-primary-foreground font-medium transition-colors shadow-sm bg-primary hover:bg-primary/90"
              >
                Take the free test now
              </button>
              <button
                class="px-4 py-2 rounded-md border border-border bg-background text-foreground font-medium transition-colors hover:bg-accent shadow-sm"
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
              class="mb-3 text-xs font-medium text-muted-foreground uppercase"
            >
              Available Sections:
            </div>

            <!-- Divider -->
            <div class="h-px bg-border my-3"></div>

            <!-- Salary stat -->
            <div
              class="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div class="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-primary"
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
                <span class="font-medium text-muted-foreground"
                  >Avg Salary</span
                >
              </div>
              <span class="text-foreground font-medium"
                >${{ formatSalary(careerOverview?.salary) }}</span
              >
            </div>

            <!-- Satisfaction stat -->
            <div
              class="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div class="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-destructive"
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
                <span class="font-medium text-muted-foreground"
                  >Satisfaction</span
                >
              </div>
              <span class="text-foreground font-medium">{{
                careerOverview?.satisfaction || "N/A"
              }}</span>
            </div>

            <div
              v-if="careerWorkEnvironment?.employment"
              class="h-px bg-border"
            ></div>

            <!-- Employment ease stat -->
            <div
              v-if="
                careerWorkEnvironment?.employment?.ease_of_employment &&
                isSectionAvailable('work-environment')
              "
              class="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div class="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-accent-foreground"
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
                <span class="font-medium text-muted-foreground"
                  >Employment</span
                >
              </div>
              <span class="text-foreground font-medium">{{
                careerWorkEnvironment?.employment?.ease_of_employment
              }}</span>
            </div>

            <!-- Employment type stat -->
            <div
              v-if="
                careerWorkEnvironment?.employment?.employment_type &&
                isSectionAvailable('work-environment')
              "
              class="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div class="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-secondary"
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
                <span class="font-medium text-muted-foreground"
                  >Schedule</span
                >
              </div>
              <span class="text-foreground font-medium">{{
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
import { useThemeStore } from "@/stores/theme/themeStore";
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

const themeStore = useThemeStore();

// Get the current theme color
const themeColorName = computed(() => {
  return currentTheme.value.replace("-theme", "") || "blue";
});

// Determine card style based on theme
const cardStyle = computed(() => {
  if (themeStore.isDarkMode) {
    // Matte black in dark mode
    return {}; // Using the default theme variables for dark mode
  } else {
    // Frosted glass effect in light mode
    return {
      backgroundColor: 'var(--content-surface-frosted)',
      backdropFilter: 'blur(var(--content-surface-frosted-blur))',
    };
  }
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
