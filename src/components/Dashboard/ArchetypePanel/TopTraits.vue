<template>
  <div :class="[
    getBorderClass(),
    'backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl transition-colors duration-300',
    theme.isDarkMode ? 'bg-gray-800/60' : 'bg-white/60'
  ]">
    <h3 :class="[
      'text-base md:text-lg font-semibold mb-3 md:mb-4',
      `text-${theme.primary}-700 dark:text-${theme.primary}-300`
    ]">
      Top Traits
    </h3>
    <div class="space-y-3 md:space-y-4">
      <div v-for="(value, trait, index) in traits"
           :key="trait"
           class="trait-item"
           :style="{
             '--delay': `${index * 200}ms`,
             '--progress': value
           }">
        <div class="flex justify-between text-xs md:text-sm mb-1.5 md:mb-2">
          <span class="font-medium" :class="[
            `text-${theme.primary}-600 dark:text-${theme.primary}-400`
          ]">
            {{ trait }}
          </span>
          <span :class="[
            `text-${theme.primary}-500 dark:text-${theme.primary}-300`
          ]">
            {{ Math.round(value * 100) }}%
          </span>
        </div>
        <div class="h-2 md:h-2.5 rounded-full overflow-hidden transition-colors duration-300"
             :class="[
               `bg-${theme.primary}-100/50 dark:bg-${theme.primary}-900/50`
             ]">
          <div class="progress-bar h-full rounded-full transition-all duration-500"
               :class="[
                 `bg-${theme.primary}-500 dark:bg-${theme.primary}-400`
               ]">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  traits: {
    type: Object,
    required: true
  },
  theme: {
    type: Object,
    required: true
  }
})

// Helper function to get border class based on theme
const getBorderClass = () => {
  const themeColor = props.theme.primary || 'blue'
  return `border border-${themeColor}-200 dark:border-${themeColor}-800`
}
</script>

<style scoped>
.trait-item {
  opacity: 0;
  transform: translateX(-20px);
  animation: slideIn 0.5s ease forwards;
  animation-delay: var(--delay);
}

.progress-bar {
  width: calc(var(--progress) * 100%);
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>