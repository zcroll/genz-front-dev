<template>
  <div class="space-y-8">
    <!-- Main Tech Skills Section -->
    <div id="tech-skills" class="overflow-hidden transition-all duration-300 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <!-- Header -->
      <div class="border-b border-gray-100 dark:border-gray-800 p-6">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-full" :class="`bg-${themeColorName}-100 dark:bg-${themeColorName}-900/30`">
            <Code :class="`h-6 w-6 text-${themeColorName}-500`" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ techSkills?.name }} Tech Skills</h2>
        </div>
        <p class="mt-2 text-gray-500 dark:text-gray-400">
          Explore the technical skills and technologies used in this career
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-t-2" :class="`border-${themeColorName}-500`"></div>
        <p class="mt-4 text-gray-500 dark:text-gray-400">Loading tech skills...</p>
      </div>

      <div v-else-if="!techSkills" class="py-8 text-center">
        <p class="text-gray-500 dark:text-gray-400">No tech skills information available for this career.</p>
      </div>

      <div v-else class="p-6">
        <!-- Introduction section -->
<!--        <div class="mb-8 bg-gradient-to-r from-transparent via-gray-50/50 dark:via-gray-800/30 to-transparent p-4 rounded-lg border border-gray-100/50 dark:border-gray-800/50 shadow-sm">-->
<!--          <div class="flex items-start gap-3">-->
<!--            <Info class="h-5 w-5 mt-1 flex-shrink-0" :class="`text-${themeColorName}-500`" />-->
<!--            <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">-->
<!--              {{ techSkills.name }}s use a variety of technical skills and technologies in their work. Understanding these can help you prepare for this career.-->
<!--            </p>-->
<!--          </div>-->
<!--        </div>-->

        <!-- Technologies Section -->
        <div v-if="techSkills.technologies && techSkills.technologies.length > 0" class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-1.5 rounded-full" :class="`bg-${themeColorName}-100 dark:bg-${themeColorName}-900/30`">
              <Cpu :class="`h-5 w-5 text-${themeColorName}-500`" />
            </div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Technologies
            </h3>
          </div>

          <p class="text-gray-700 dark:text-gray-300 mb-6 pl-9">
            {{ techSkills.name }}s commonly use the following technologies in their work:
          </p>

          <div class="grid grid-cols-1 gap-6">
            <div class="space-y-6">
              <div v-for="(techCategory, categoryIndex) in techSkills.technologies" :key="categoryIndex">
                <div class="flex items-center gap-2 mb-3">
                  <div class="p-1.5 rounded-full" :class="`bg-${themeColorName}-100 dark:bg-${themeColorName}-900/30`">
                    <Zap :class="`h-4 w-4 text-${themeColorName}-500`" />
                  </div>
                  <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {{ techCategory.category || 'Common Technologies' }}
                  </h4>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    v-for="(tech, techIndex) in techCategory.technologies"
                    :key="techIndex"
                    class="relative p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-200"
                    :class="`hover:border-${themeColorName}-200 dark:hover:border-${themeColorName}-800`"
                    :style="{animationDelay: getAnimationDelay(techIndex + (categoryIndex * 5))}"
                  >
                    <div class="flex flex-col gap-2">
                      <div class="flex flex-wrap items-center gap-2 mb-2">
                        <h5 class="font-medium text-gray-800 dark:text-gray-200 mr-1">
                          {{ tech.name }}
                        </h5>
                        <div class="flex flex-wrap gap-1">
                          <span
                            v-if="tech.is_hot"
                            class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 shadow-sm"
                            title="Hot technology in high demand"
                          >
                            Hot
                          </span>
                          <span
                            v-if="tech.is_in_demand"
                            class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm"
                            title="In demand in the job market"
                          >
                            In Demand
                          </span>
                          <span
                            v-if="techCategory.category"
                            class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                          >
                            {{ techCategory.category }}
                          </span>
                        </div>
                      </div>

                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        {{ tech.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills Section -->
        <div v-if="techSkills.skills && techSkills.skills.length > 0" class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-1.5 rounded-full" :class="`bg-${themeColorName}-100 dark:bg-${themeColorName}-900/30`">
              <Lightbulb :class="`h-5 w-5 text-${themeColorName}-500`" />
            </div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Top Technical Skills
            </h3>
          </div>

          <p class="text-gray-700 dark:text-gray-300 mb-6 pl-9">
            {{ techSkills.name }}s need the following technical skills to be successful:
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div
              v-for="(skill, index) in topSkills"
              :key="index"
              class="relative p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-200"
              :class="`hover:border-${themeColorName}-200 dark:hover:border-${themeColorName}-800`"
              :style="{animationDelay: getAnimationDelay(index)}"
            >
              <div class="flex flex-col gap-2">
                <div class="flex flex-wrap items-center gap-2 mb-2">
                  <h5 class="font-medium text-gray-800 dark:text-gray-200 mr-1">
                    {{ skill.name }}
                  </h5>

                  <!-- Importance Badge -->
                  <span
                    class="text-xs px-2 py-1 rounded-full font-medium shadow-sm"
                    :class="{
                      'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400': skill.data_value >= 4.5,
                      'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400': skill.data_value >= 4 && skill.data_value < 4.5,
                      'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400': skill.data_value >= 3.5 && skill.data_value < 4,
                      'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400': skill.data_value >= 3 && skill.data_value < 3.5,
                      'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400': skill.data_value < 3
                    }"
                  >
                    {{ getImportanceLabel(skill.data_value) }}
                  </span>

                  <!-- Category Badge -->
                  <span class="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">
                    {{ skill.categoryName }}
                  </span>
                </div>

                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {{ skill.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Take the test CTA -->
        <div class="mt-10 p-6 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-300 cta-card">
          <div class="flex flex-col md:flex-row md:items-center gap-6">
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <div class="p-1.5 rounded-full" :class="`bg-${themeColorName}-100 dark:bg-${themeColorName}-900/30`">
                  <Zap :class="`h-5 w-5 text-${themeColorName}-500`" />
                </div>
                Develop Your Technical Skills
              </h3>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                Take our free career test to find out if {{ techSkills?.name.toLowerCase() }} matches your skills and interests, and discover careers you might love.
              </p>
              <button :class="[
                'px-5 py-2.5 rounded-md text-white font-medium transition-colors duration-300 shadow-sm w-full sm:w-auto',
                `bg-${themeColorName}-500 hover:bg-${themeColorName}-600`
              ]">
                Take the free career test
              </button>
            </div>
            <div class="hidden md:block relative w-32 h-32 flex-shrink-0">
              <div class="absolute inset-0 rounded-full" :class="`bg-${themeColorName}-500/10 animate-pulse-slow`"></div>
              <div class="absolute inset-4 rounded-full" :class="`bg-${themeColorName}-500/20 animate-pulse-slow animation-delay-300`"></div>
              <div class="absolute inset-8 rounded-full flex items-center justify-center" :class="`bg-${themeColorName}-500/30`">
                <Code class="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, onMounted } from 'vue';
import { currentTheme } from '@/lib/theme-utils';
import { useThemeStore } from '@/stores/theme/themeStore';
import type { CareerTechSkills as CareerTechSkillsType } from '@/types/career';
import { Code, Cpu, Zap, Lightbulb, ArrowRight, ChevronRight, Info } from 'lucide-vue-next';

const props = defineProps<{
  techSkills?: CareerTechSkillsType;
  isLoading: boolean;
}>();

// Get theme store
const themeStore = useThemeStore();

// Get the current theme color
const themeColorName = computed(() => {
  return currentTheme.value.replace('-theme', '') || 'blue';
});

// Animation delay for staggered animations
const getAnimationDelay = (index: number) => {
  return `${index * 100}ms`;
};

// Determine if we're in dark mode
const isDarkMode = computed(() => {
  return themeStore.isDarkMode;
});

// Get card style based on theme - simplified as we're using Tailwind classes directly

// State for expanded tech descriptions
const expandedTechs = ref<{ categoryIndex: number; techIndex: number }[]>([]);

// Toggle tech description
const toggleTechInfo = (categoryIndex: number, techIndex: number) => {
  const index = expandedTechs.value.findIndex(
    item => item.categoryIndex === categoryIndex && item.techIndex === techIndex
  );

  if (index !== -1) {
    // Close this tech description
    expandedTechs.value.splice(index, 1);
  } else {
    // Find any open tech descriptions in the same category
    const sameCategory = expandedTechs.value.findIndex(item => item.categoryIndex === categoryIndex);

    // If there's an open item in the same category, close it
    if (sameCategory !== -1) {
      expandedTechs.value.splice(sameCategory, 1);
    }

    // Open this one
    expandedTechs.value.push({ categoryIndex, techIndex });
  }
};

// Check if a tech description is expanded
const isTechExpanded = (categoryIndex: number, techIndex: number) => {
  return expandedTechs.value.some(
    item => item.categoryIndex === categoryIndex && item.techIndex === techIndex
  );
};

// State for expanded skill descriptions
const expandedSkills = ref<{ categoryIndex: number; skillIndex: number }[]>([]);

// Toggle skill description
const toggleSkillInfo = (categoryIndex: number, skillIndex: number) => {
  const index = expandedSkills.value.findIndex(
    item => item.categoryIndex === categoryIndex && item.skillIndex === skillIndex
  );

  if (index !== -1) {
    // Close this skill description
    expandedSkills.value.splice(index, 1);
  } else {
    // Find any open skill descriptions in the same category
    const sameCategory = expandedSkills.value.findIndex(item => item.categoryIndex === categoryIndex);

    // If there's an open item in the same category, close it
    if (sameCategory !== -1) {
      expandedSkills.value.splice(sameCategory, 1);
    }

    // Open this one
    expandedSkills.value.push({ categoryIndex, skillIndex });
  }
};

// Check if a skill description is expanded
const isSkillExpanded = (categoryIndex: number, skillIndex: number) => {
  return expandedSkills.value.some(
    item => item.categoryIndex === categoryIndex && item.skillIndex === skillIndex
  );
};

// Get the first 12 skills across all categories
const topSkills = computed(() => {
  if (!props.techSkills?.skills) return [];

  const allSkills = [];

  // Flatten all skills from all categories
  for (const category of props.techSkills.skills) {
    for (const skill of category.skills) {
      allSkills.push({
        ...skill,
        categoryName: category.element_name
      });
    }
  }

  // Sort by data_value (importance) in descending order
  allSkills.sort((a, b) => b.data_value - a.data_value);

  // Return only the first 12 skills
  return allSkills.slice(0, 12);
});

// Function to convert data_value to importance label
const getImportanceLabel = (value: number): string => {
  if (value >= 4.5) return 'Critical';
  if (value >= 4) return 'Very High';
  if (value >= 3.5) return 'High';
  if (value >= 3) return 'Medium';
  return 'Helpful';
};


</script>

<style scoped>
/* Animation for content sections */
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

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes expandIn {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    max-height: 1000px;
    transform: translateY(0);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.4;
  }
}

/* Apply animations */
h2, h3 {
  animation: fadeIn 0.5s ease-out forwards;
}

div[id^="tech-skills"] {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Card animations */
.skill-card {
  animation: scaleIn 0.5s ease-out forwards;
}

.cta-card {
  animation: slideInRight 0.6s ease-out forwards;
  animation-delay: 300ms;
}

/* Animation delays */
.animation-delay-300 {
  animation-delay: 300ms;
}

/* Expanded content animation */
.expanded-content {
  animation: expandIn 0.3s ease-out forwards;
  overflow: hidden;
  transform-origin: top;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dark .expanded-content {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* Ensure animations only play once */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Pulse animation */
.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
