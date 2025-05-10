<template>
  <Card variant="frosted" class="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
          <h3 class="text-base font-bold truncate" :style="{ color: 'var(--text-primary)' }">
            {{ degree.name }}
          </h3>
          <p :class="['text-sm truncate', themeClasses.accent]">{{ degreeLevelName }}</p>
        </div>
      </div>

      <!-- Description or Areas -->
      <p class="text-sm line-clamp-2 mb-3 h-10" :style="{ color: 'var(--text-secondary)' }">
        {{ degree.description || (degree.areas && degree.areas.length > 0 ? degree.areas.join(', ') : 'No description available') }}
      </p>

      <!-- Key Details -->
      <div class="grid grid-cols-2 gap-2 mb-3">
        <div class="flex items-center gap-1.5">
          <DollarSign class="w-4 h-4" :style="{ color: 'var(--text-tertiary)' }" />
          <span class="text-sm" :style="{ color: 'var(--text-secondary)' }">{{ formatSalary }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <ThumbsUp class="w-4 h-4" :style="{ color: 'var(--text-tertiary)' }" />
          <span class="text-sm" :style="{ color: 'var(--text-secondary)' }">{{ degree.satisfaction || 'N/A' }}</span>
        </div>
      </div>

      <!-- Action Button -->
      <RouterLink :to="`/degree/${degree.slug}`" class="block w-full">
        <Button class="w-full justify-between" :class="`hover:bg-${themeStore.color}-600 focus:ring-2 focus:ring-${themeStore.color}-500 focus:ring-offset-2 focus:outline-none`">
          Learn More
          <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Button>
      </RouterLink>
    </CardContent>
  </Card>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, DollarSign, ThumbsUp } from 'lucide-vue-next';
import { AcademicCapIcon } from '@heroicons/vue/24/outline';
import { useThemeStore } from '@/stores/theme';
 import { Button } from "@/components/ui/button";

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
