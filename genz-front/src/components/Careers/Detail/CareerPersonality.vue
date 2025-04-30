<template>
  <div class="space-y-8">
    <!-- Personality section -->
    <div id="personality" class="mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{{ personality?.name }} Personality</h2>
      
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Personality Overview</h3>
        <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            {{ personality?.personality_overview?.holland_summary }}
          </p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <p class="text-gray-700 dark:text-gray-300">
            {{ personality?.personality_overview?.big_five_summary }}
          </p>
        </div>
      </div>
      
      <!-- Holland Codes -->
      <div v-if="personality?.holland_codes && personality.holland_codes.length > 0" class="mb-8">
        <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Holland Codes</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          Holland Codes represent different personality types and work environments. Here are the Holland Codes most associated with {{ personality?.name }}s:
        </p>
        
        <div class="space-y-6">
          <div v-for="code in sortedHollandCodes" :key="code.code" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200">{{ code.code }}</h4>
                <span class="text-sm font-medium px-2 py-1 rounded-full" :class="getHollandCodeColor(code.code)">
                  {{ code.value }}%
                </span>
              </div>
            </div>
            <div class="p-4">
              <p class="text-gray-700 dark:text-gray-300">{{ code.description }}</p>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 h-2">
              <div class="h-full" :style="`width: ${code.value}%`" :class="getHollandCodeBarColor(code.code)"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Big Five Traits -->
      <div v-if="personality?.big_five_traits && personality.big_five_traits.length > 0">
        <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Big Five Personality Traits</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          The Big Five personality traits are the most widely accepted model for describing personality. Here's how {{ personality?.name }}s typically score:
        </p>
        
        <div class="space-y-6">
          <div v-for="trait in sortedBigFiveTraits" :key="trait.trait" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200">{{ trait.trait }}</h4>
                <span class="text-sm font-medium px-2 py-1 rounded-full" :class="getBigFiveColor(trait.trait)">
                  {{ trait.value }}%
                </span>
              </div>
            </div>
            <div class="p-4">
              <p class="text-gray-700 dark:text-gray-300">{{ trait.description }}</p>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 h-2">
              <div class="h-full" :style="`width: ${trait.value}%`" :class="getBigFiveBarColor(trait.trait)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { CareerPersonality as CareerPersonalityType } from '@/types/career';

const props = defineProps<{
  personality?: CareerPersonalityType;
  isLoading: boolean;
}>();

// Sort Holland codes by order
const sortedHollandCodes = computed(() => {
  if (!props.personality?.holland_codes) return [];
  return [...props.personality.holland_codes].sort((a, b) => a.order - b.order);
});

// Sort Big Five traits by order
const sortedBigFiveTraits = computed(() => {
  if (!props.personality?.big_five_traits) return [];
  return [...props.personality.big_five_traits].sort((a, b) => a.order - b.order);
});

// Get color class for Holland code
const getHollandCodeColor = (code: string) => {
  const colors = {
    'Realistic': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Investigative': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Artistic': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    'Social': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Enterprising': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'Conventional': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  };
  
  return colors[code] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
};

// Get bar color for Holland code
const getHollandCodeBarColor = (code: string) => {
  const colors = {
    'Realistic': 'bg-blue-500',
    'Investigative': 'bg-purple-500',
    'Artistic': 'bg-pink-500',
    'Social': 'bg-green-500',
    'Enterprising': 'bg-orange-500',
    'Conventional': 'bg-gray-500'
  };
  
  return colors[code] || 'bg-gray-500';
};

// Get color class for Big Five trait
const getBigFiveColor = (trait: string) => {
  const colors = {
    'Openness': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    'Conscientiousness': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Extraversion': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Agreeableness': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Neuroticism': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };
  
  return colors[trait] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
};

// Get bar color for Big Five trait
const getBigFiveBarColor = (trait: string) => {
  const colors = {
    'Openness': 'bg-indigo-500',
    'Conscientiousness': 'bg-blue-500',
    'Extraversion': 'bg-yellow-500',
    'Agreeableness': 'bg-green-500',
    'Neuroticism': 'bg-red-500'
  };
  
  return colors[trait] || 'bg-gray-500';
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

h2, h3 {
  animation: fadeIn 0.5s ease-out forwards;
}

div[id^="personality"] {
  animation: fadeIn 0.5s ease-out forwards;
}
</style>
