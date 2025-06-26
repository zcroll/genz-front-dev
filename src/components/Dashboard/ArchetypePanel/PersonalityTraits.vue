<template>
  <div :class="[
    getBorderClass(),
    'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl transition-all duration-300 hover:shadow-2xl',
  ]">
    <h3 :class="[
      'text-base md:text-lg font-semibold mb-4',
      `text-${theme.primary}-700 dark:text-${theme.primary}-300`
    ]">
      Personality Traits
    </h3>

    <div class="space-y-4">
      <div v-for="(trait, index) in personalityTraits"
           :key="index"
           class="trait-scale">
        <div class="flex justify-between text-xs md:text-sm mb-1.5">
          <span :class="`text-${theme.primary}-600/70 dark:text-${theme.primary}-400/70`">
            {{ trait.left }}
          </span>
          <span class="font-medium" :class="trait.color">
            {{ trait.value }}% {{ trait.dominant }}
          </span>
          <span :class="`text-${theme.primary}-600/70 dark:text-${theme.primary}-400/70`">
            {{ trait.right }}
          </span>
        </div>
        <div class="h-2 rounded-full" :class="trait.bgClass">
          <div class="h-full rounded-full transition-all duration-500"
               :class="trait.barClass"
               :style="{ width: `${trait.value}%` }">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme/themeStore.js'

const themeStore = useThemeStore()

const props = defineProps({
  theme: {
    type: Object,
    required: true
  }
})

// Helper function to get border class
const getBorderClass = () => {
  const themeColor = props.theme.primary || 'blue'
  return `border border-${themeColor}-200 dark:border-${themeColor}-800`
}

// Theme colors for each trait
const traitColors = {
  mind: {
    color: 'blue',
    darkClass: 'bg-blue-400',
    lightClass: 'bg-blue-500',
    bgDark: 'bg-blue-900/30',
    bgLight: 'bg-blue-100/50'
  },
  energy: {
    color: 'amber',
    darkClass: 'bg-amber-400',
    lightClass: 'bg-amber-500',
    bgDark: 'bg-amber-900/30',
    bgLight: 'bg-amber-100/50'
  },
  nature: {
    color: 'emerald',
    darkClass: 'bg-emerald-400',
    lightClass: 'bg-emerald-500',
    bgDark: 'bg-emerald-900/30',
    bgLight: 'bg-emerald-100/50'
  },
  tactics: {
    color: 'violet',
    darkClass: 'bg-violet-400',
    lightClass: 'bg-violet-500',
    bgDark: 'bg-violet-900/30',
    bgLight: 'bg-violet-100/50'
  },
  identity: {
    color: 'rose',
    darkClass: 'bg-rose-400',
    lightClass: 'bg-rose-500',
    bgDark: 'bg-rose-900/30',
    bgLight: 'bg-rose-100/50'
  }
}

const personalityTraits = computed(() => [
  {
    left: 'Extraverted',
    right: 'Introverted',
    value: 53,
    dominant: 'Introverted',
    color: `text-${traitColors.mind.color}-600 dark:text-${traitColors.mind.color}-400`,
    bgClass: `bg-${traitColors.mind.color}-100/50 dark:bg-${traitColors.mind.color}-900/30`,
    barClass: `bg-${traitColors.mind.color}-500 dark:bg-${traitColors.mind.color}-400`
  },
  {
    left: 'Intuitive',
    right: 'Observant',
    value: 53,
    dominant: 'Intuitive',
    color: `text-${traitColors.energy.color}-600 dark:text-${traitColors.energy.color}-400`,
    bgClass: `bg-${traitColors.energy.color}-100/50 dark:bg-${traitColors.energy.color}-900/30`,
    barClass: `bg-${traitColors.energy.color}-500 dark:bg-${traitColors.energy.color}-400`
  },
  {
    left: 'Thinking',
    right: 'Feeling',
    value: 54,
    dominant: 'Feeling',
    color: `text-${traitColors.nature.color}-600 dark:text-${traitColors.nature.color}-400`,
    bgClass: `bg-${traitColors.nature.color}-100/50 dark:bg-${traitColors.nature.color}-900/30`,
    barClass: `bg-${traitColors.nature.color}-500 dark:bg-${traitColors.nature.color}-400`
  },
  {
    left: 'Judging',
    right: 'Prospecting',
    value: 58,
    dominant: 'Prospecting',
    color: `text-${traitColors.tactics.color}-600 dark:text-${traitColors.tactics.color}-400`,
    bgClass: `bg-${traitColors.tactics.color}-100/50 dark:bg-${traitColors.tactics.color}-900/30`,
    barClass: `bg-${traitColors.tactics.color}-500 dark:bg-${traitColors.tactics.color}-400`
  },
  {
    left: 'Assertive',
    right: 'Turbulent',
    value: 54,
    dominant: 'Assertive',
    color: `text-${traitColors.identity.color}-600 dark:text-${traitColors.identity.color}-400`,
    bgClass: `bg-${traitColors.identity.color}-100/50 dark:bg-${traitColors.identity.color}-900/30`,
    barClass: `bg-${traitColors.identity.color}-500 dark:bg-${traitColors.identity.color}-400`
  }
])
</script>

<style scoped>
.trait-scale {
  opacity: 0;
  transform: translateX(-20px);
  animation: slideIn 0.5s ease forwards;
  position: relative;
  overflow: hidden;
}

.trait-scale:nth-child(1) { animation-delay: 100ms; }
.trait-scale:nth-child(2) { animation-delay: 200ms; }
.trait-scale:nth-child(3) { animation-delay: 300ms; }
.trait-scale:nth-child(4) { animation-delay: 400ms; }
.trait-scale:nth-child(5) { animation-delay: 500ms; }

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>