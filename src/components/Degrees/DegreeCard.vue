<template>
  <Card class="group relative backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1" :class="[
      themeStore.isDarkMode ? 'dark:bg-gray-800/40 border-gray-700' : 'bg-white/40 border-gray-200'
    ]">
    <CardContent class="p-4">
      <!-- Header with Image and Title -->
      <div class="flex items-start gap-3 mb-3">
        <div class="w-16 h-16 flex items-center justify-center rounded-full overflow-hidden" :class="`bg-${themeStore.color}-100 dark:bg-${themeStore.color}-900/30`">
          <img
            v-if="degree.image_url || degree.image"
            :src="degree.image_url || degree.image"
            :alt="`image for ${degree.name}`"
            class="w-full h-full object-contain filter contrast-125 transition-transform duration-300 group-hover:scale-110"
          />
          <AcademicCapIcon v-else class="w-8 h-8" :class="`text-${themeStore.color}-500 dark:text-${themeStore.color}-400`" />
        </div>
        <div class="min-w-0">
          <h3 :class="[
            'text-base font-bold truncate',
            themeStore.isDarkMode ? 'text-white' : 'text-gray-900'
          ]">
            {{ degree.name }}
          </h3>
          <p :class="['text-sm truncate', themeClasses.accent]">{{ degreeLevelName }}</p>
        </div>
      </div>

      <!-- Description or Areas -->
      <p :class="['text-sm line-clamp-2 mb-3 h-10', themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600']">
        {{ degree.description || (degree.areas && degree.areas.length > 0 ? degree.areas.join(', ') : 'No description available') }}
      </p>

      <!-- Key Details -->
      <div class="grid grid-cols-2 gap-2 mb-3">
        <div class="flex items-center gap-1.5">
          <DollarSign :class="['w-4 h-4', themeStore.isDarkMode ? 'text-gray-500' : 'text-gray-400']" />
          <span :class="['text-sm', themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600']">{{ formatSalary }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <ThumbsUp :class="['w-4 h-4', themeStore.isDarkMode ? 'text-gray-500' : 'text-gray-400']" />
          <span :class="['text-sm', themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600']">{{ degree.satisfaction || 'N/A' }}</span>
        </div>
      </div>

      <!-- Action Button -->
      <RouterLink :to="`/degree/${degree.slug}`"
        class="inline-flex items-center justify-between w-full px-4 py-2 font-medium rounded-full transition-all duration-300 text-sm backdrop-blur-sm border"
       >
      <Button>Learn More</Button>
      <ArrowRight :class="['w-4 h-4 transform group-hover:translate-x-1 transition-transform',
        themeStore.isDarkMode ? `text-${themeStore.color}-400` : `text-${themeStore.color}-500`]" />
      </RouterLink>
    </CardContent>
  </Card>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Card, CardContent } from "@/components/ui/card/index.js";
import { ArrowRight, DollarSign, ThumbsUp } from 'lucide-vue-next';
import { AcademicCapIcon } from '@heroicons/vue/24/outline';
import { useThemeStore } from '@/stores/theme.js';
 import { Button } from "@/components/ui/button/index.js";

const props = defineProps({
  degree: {
    type: Object,
    required: true
  }
});

const themeStore = useThemeStore();

const themeClasses = computed(() => ({
  text: themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600',
  accent: `text-${themeStore.color}-${themeStore.isDarkMode ? '400' : '500'}`
}));

// Map degree level to name
const degreeLevelName = computed(() => {
  const levelMap = {
    1: 'Certificate',
    2: 'Associate',
    3: 'Bachelor',
    4: 'Master',
    5: 'Doctorate'
  };
  return levelMap[props.degree.degree_level] || props.degree.level || 'Unknown';
});

// Format salary with currency
const formatSalary = computed(() => {
  if (!props.degree.salary) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(props.degree.salary);
});
</script>

<style scoped>
.grid>div {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
