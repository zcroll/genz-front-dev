<template>
  <div class="space-y-8">
    <!-- Personality section -->
    <div id="personality" class="mb-8 bg-white dark:bg-gray-800/30 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{{ personality?.name }} Personality</h2>

      <!-- Introduction section -->
      <div class="mb-8">
        <div class="prose max-w-none text-gray-700 dark:text-gray-300">
          <p class="text-lg leading-relaxed">
            {{ personality?.name }}s have distinct personality traits that influence their career success and satisfaction.
          </p>
        </div>
      </div>

      <!-- Holland Codes -->
      <div v-if="personality?.holland_codes && personality.holland_codes.length > 0" class="mb-12">
        <h3 class="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <span class="inline-block p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </span>
          Holland Code Profile
        </h3>

        <div class="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg mb-6">
          <div class="flex items-center justify-between cursor-pointer" @click="toggleHollandInfo">
            <p class="text-gray-700 dark:text-gray-300 font-medium">
              What are Holland Codes?
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 transition-transform duration-200" :class="{ 'rotate-180': showHollandInfo }" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>

          <div v-if="showHollandInfo" class="mt-3 transition-all duration-300 ease-in-out">
            <p class="text-gray-700 dark:text-gray-300 mb-3">
              Holland Codes represent different personality types and work environments. The Holland Code assessment identifies six personality types:
            </p>
            <ul class="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1 mb-3">
              <li><strong>Realistic:</strong> Practical, physical, hands-on, tool-oriented</li>
              <li><strong>Investigative:</strong> Analytical, intellectual, scientific, explorative</li>
              <li><strong>Artistic:</strong> Creative, original, independent, chaotic</li>
              <li><strong>Social:</strong> Cooperative, supporting, helping, healing/nurturing</li>
              <li><strong>Enterprising:</strong> Competitive environments, leadership, persuading</li>
              <li><strong>Conventional:</strong> Detail-oriented, organizing, clerical</li>
            </ul>
          </div>

          <div class="mt-3">
            <p class="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Holland Code Summary:</strong> {{ personality?.personality_overview?.holland_summary }}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Here's how {{ personality?.name }}s typically score on the Holland Code assessment:
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" style="grid-auto-flow: dense;">
          <div v-for="code in sortedHollandCodes" :key="code.code"
               :class="[
                 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300',
                 expandedHollandCodes.includes(code.code) ? 'md:col-span-2' : ''
               ]">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700" :class="getHollandCodeHeaderBg(code.code)">
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                  <span class="inline-block w-3 h-3 rounded-full mr-2" :class="getHollandCodeDot(code.code)"></span>
                  {{ code.code }}
                </h4>
                <span class="text-sm font-bold px-3 py-1 rounded-full" :class="getHollandCodeColor(code.code)">
                  {{ formatPercentage(code.value) }}%
                </span>
              </div>
            </div>
            <div class="p-4">
              <div class="mb-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div class="h-full rounded-full" :style="`width: ${calculatePercentage(code.value)}%`" :class="getHollandCodeBarColor(code.code)"></div>
              </div>

              <!-- Collapsible definition section -->
              <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div class="flex items-center justify-between cursor-pointer text-sm" @click="toggleHollandCodeInfo(code.code)">
                  <p class="text-gray-600 dark:text-gray-400 font-medium">Learn more about {{ code.code }} types</p>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 transition-transform duration-200" :class="{ 'rotate-180': expandedHollandCodes.includes(code.code) }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>

                <div v-if="expandedHollandCodes.includes(code.code)" class="mt-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/30 p-4 rounded-md transition-all duration-300 ease-in-out">
                  <h5 class="font-medium text-gray-800 dark:text-gray-200 mb-2">About {{ code.code }} Types</h5>
                  <p class="leading-relaxed">
                    {{ code.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Big Five Traits -->
      <div v-if="personality?.big_five_traits && personality.big_five_traits.length > 0" class="mt-10">
        <h3 class="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <span class="inline-block p-2 rounded-full bg-purple-50 dark:bg-purple-900/20 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </span>
          Big Five Personality Traits
        </h3>

        <div class="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg mb-6">
          <div class="flex items-center justify-between cursor-pointer" @click="toggleBigFiveInfo">
            <p class="text-gray-700 dark:text-gray-300 font-medium">
              What are the Big Five personality traits?
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 transition-transform duration-200" :class="{ 'rotate-180': showBigFiveInfo }" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>

          <div v-if="showBigFiveInfo" class="mt-3 transition-all duration-300 ease-in-out">
            <p class="text-gray-700 dark:text-gray-300 mb-3">
              The Big Five personality traits represent the most widely accepted model for describing personality:
            </p>
            <ul class="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1 mb-3">
              <li><strong>Openness:</strong> Appreciation for art, emotion, adventure, unusual ideas, imagination, curiosity, and variety of experience.</li>
              <li><strong>Conscientiousness:</strong> Tendency to be organized and dependable, show self-discipline, act dutifully, aim for achievement, and prefer planned rather than spontaneous behavior.</li>
              <li><strong>Extraversion:</strong> Energy, positive emotions, assertiveness, sociability and the tendency to seek stimulation in the company of others, and talkativeness.</li>
              <li><strong>Agreeableness:</strong> Tendency to be compassionate and cooperative rather than suspicious and antagonistic towards others.</li>
              <li><strong>Neuroticism:</strong> Tendency to experience unpleasant emotions easily, such as anger, anxiety, depression, and vulnerability.</li>
            </ul>
          </div>

          <div class="mt-3">
            <p class="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Big Five Summary:</strong> {{ personality?.personality_overview?.big_five_summary }}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Here's how {{ personality?.name }}s typically score on each dimension:
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" style="grid-auto-flow: dense;">
          <div v-for="(trait, index) in sortedBigFiveTraits" :key="trait.trait"
               :class="[
                 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300',
                 expandedBigFiveTraits.includes(trait.trait) ? 'md:col-span-2' : '',
                 !expandedBigFiveTraits.includes(trait.trait) && index === 4 && sortedBigFiveTraits.length === 5 ? 'md:col-span-2' : ''
               ]">
            <div class="p-5 border-b border-gray-200 dark:border-gray-700" :class="getBigFiveHeaderBg(trait.trait)">
              <div class="flex justify-between items-center">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                  <span class="inline-block w-3 h-3 rounded-full mr-2" :class="getBigFiveDot(trait.trait)"></span>
                  {{ trait.trait }}
                </h4>
                <span class="text-sm font-bold px-3 py-1 rounded-full" :class="getBigFiveColor(trait.trait)">
                  {{ formatPercentage(trait.value) }}%
                </span>
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center mb-4">
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div class="h-full rounded-full" :style="`width: ${calculatePercentage(trait.value)}%`" :class="getBigFiveBarColor(trait.trait)"></div>
                </div>
              </div>
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                <span>Low</span>
                <span>High</span>
              </div>

              <!-- Collapsible definition section -->
              <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div class="flex items-center justify-between cursor-pointer text-sm" @click="toggleBigFiveTraitInfo(trait.trait)">
                  <p class="text-gray-600 dark:text-gray-400 font-medium">Learn more about {{ trait.trait }}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 transition-transform duration-200" :class="{ 'rotate-180': expandedBigFiveTraits.includes(trait.trait) }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>

                <div v-if="expandedBigFiveTraits.includes(trait.trait)" class="mt-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/30 p-4 rounded-md transition-all duration-300 ease-in-out">
                  <h5 class="font-medium text-gray-800 dark:text-gray-200 mb-2">Understanding {{ trait.trait }}</h5>
                  <p class="leading-relaxed">
                    {{ trait.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Take the test CTA -->
      <div class="mt-10 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Discover Your Personality Type</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          Take our free career test to find out if {{ personality?.name.toLowerCase() }} matches your personality type and discover careers you might love.
        </p>
        <button :class="[
          'px-4 py-2 rounded-md text-white font-medium transition-colors shadow-sm w-full sm:w-auto',
          `bg-${themeColorName}-500 hover:bg-${themeColorName}-600`
        ]">
          Take the free career test
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { currentTheme } from '@/lib/theme-utils';
import type { CareerPersonality as CareerPersonalityType } from '@/types/career';

const props = defineProps<{
  personality?: CareerPersonalityType | null;
  isLoading: boolean;
}>();

// Get the current theme color
const themeColorName = computed(() => {
  return currentTheme.value.replace('-theme', '') || 'blue';
});

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
  const colors: Record<string, string> = {
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
  const colors: Record<string, string> = {
    'Realistic': 'bg-blue-500',
    'Investigative': 'bg-purple-500',
    'Artistic': 'bg-pink-500',
    'Social': 'bg-green-500',
    'Enterprising': 'bg-orange-500',
    'Conventional': 'bg-gray-500'
  };

  return colors[code] || 'bg-gray-500';
};

// Get header background color for Holland code
const getHollandCodeHeaderBg = (code: string) => {
  const colors: Record<string, string> = {
    'Realistic': 'bg-blue-50 dark:bg-blue-900/10',
    'Investigative': 'bg-purple-50 dark:bg-purple-900/10',
    'Artistic': 'bg-pink-50 dark:bg-pink-900/10',
    'Social': 'bg-green-50 dark:bg-green-900/10',
    'Enterprising': 'bg-orange-50 dark:bg-orange-900/10',
    'Conventional': 'bg-gray-50 dark:bg-gray-900/10'
  };

  return colors[code] || 'bg-gray-50 dark:bg-gray-900/10';
};

// Get dot color for Holland code
const getHollandCodeDot = (code: string) => {
  const colors: Record<string, string> = {
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
  const colors: Record<string, string> = {
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
  const colors: Record<string, string> = {
    'Openness': 'bg-indigo-500',
    'Conscientiousness': 'bg-blue-500',
    'Extraversion': 'bg-yellow-500',
    'Agreeableness': 'bg-green-500',
    'Neuroticism': 'bg-red-500'
  };

  return colors[trait] || 'bg-gray-500';
};

// Get header background color for Big Five trait
const getBigFiveHeaderBg = (trait: string) => {
  const colors: Record<string, string> = {
    'Openness': 'bg-indigo-50 dark:bg-indigo-900/10',
    'Conscientiousness': 'bg-blue-50 dark:bg-blue-900/10',
    'Extraversion': 'bg-yellow-50 dark:bg-yellow-900/10',
    'Agreeableness': 'bg-green-50 dark:bg-green-900/10',
    'Neuroticism': 'bg-red-50 dark:bg-red-900/10'
  };

  return colors[trait] || 'bg-gray-50 dark:bg-gray-900/10';
};

// Get dot color for Big Five trait
const getBigFiveDot = (trait: string) => {
  const colors: Record<string, string> = {
    'Openness': 'bg-indigo-500',
    'Conscientiousness': 'bg-blue-500',
    'Extraversion': 'bg-yellow-500',
    'Agreeableness': 'bg-green-500',
    'Neuroticism': 'bg-red-500'
  };

  return colors[trait] || 'bg-gray-500';
};

// Calculate percentage for progress bars - handles both 0-1 and 0-100 scales
const calculatePercentage = (value: number): number => {
  // If value is between 0 and 1, convert to percentage
  if (value >= 0 && value <= 1) {
    return Math.round(value * 100);
  }
  // If value is already a percentage (0-100), return as is
  return Math.round(value);
};

// Format percentage for display - handles both 0-1 and 0-100 scales
const formatPercentage = (value: number): number => {
  // If value is between 0 and 1, convert to percentage
  if (value >= 0 && value <= 1) {
    return Math.round(value * 100);
  }
  // If value is already a percentage (0-100), return as is
  return Math.round(value);
};

// Toggle states for collapsible sections
const showHollandInfo = ref(false);
const showBigFiveInfo = ref(false);
const expandedHollandCodes = ref<string[]>([]);
const expandedBigFiveTraits = ref<string[]>([]);

// Toggle functions
const toggleHollandInfo = () => {
  showHollandInfo.value = !showHollandInfo.value;
};

const toggleBigFiveInfo = () => {
  showBigFiveInfo.value = !showBigFiveInfo.value;
};

// Toggle individual Holland code information
const toggleHollandCodeInfo = (code: string) => {
  if (expandedHollandCodes.value.includes(code)) {
    // Close the current card
    expandedHollandCodes.value = [];
  } else {
    // Close any open card and open the new one
    expandedHollandCodes.value = [code];
  }
};

// Toggle individual Big Five trait information
const toggleBigFiveTraitInfo = (trait: string) => {
  if (expandedBigFiveTraits.value.includes(trait)) {
    // Close the current card
    expandedBigFiveTraits.value = [];
  } else {
    // Close any open card and open the new one
    expandedBigFiveTraits.value = [trait];
  }
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
