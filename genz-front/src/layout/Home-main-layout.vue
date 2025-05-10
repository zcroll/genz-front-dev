<template>
  <div :class="[
    // Use the theme system with 16personalities-inspired themes
    'h-screen p-4 overflow-hidden transition-colors duration-300 bg-pattern',
    themeStore.isDarkMode ? 'dark' : '',
    `theme-${currentThemeColor}` // Apply theme class based on current theme
  ]" :style="{
    backgroundColor: 'var(--page-background)'
  }">
    <!-- Background pattern overlay -->
    <div class="fixed inset-0 bg-pattern-overlay opacity-5 dark:opacity-10 pointer-events-none"></div>
    <!-- Theme-colored gradient background -->
    <div class="fixed inset-0 theme-gradient opacity-20 dark:opacity-15 pointer-events-none"></div>
    <div
        class="w-full h-full max-w-[120rem] relative overflow-hidden glass-container"
        :class="[
        'md:p-12 p-4 md:rounded-[32px] rounded-none md:border'
      ]" :style="{
        backgroundColor: 'var(--content-surface-frosted)',
        backdropFilter: `blur(var(--content-surface-frosted-blur))`,
        borderColor: `var(--border-subtle)`,
        boxShadow: `var(--shadow-default), 0 0 20px -5px var(--${currentThemeColor}-glow-${themeStore.isDarkMode ? 'dark' : 'light'})`
      }">
      <!-- Refined decorative elements using 16personalities-inspired theme colors -->
      <!-- Main background gradient -->
      <div class="absolute inset-0 bg-gradient -z-10 transition-opacity duration-500"></div>

      <!-- Top right accent blob -->
      <div :class="[
        !themeStore.isDarkMode && `bg-${currentThemeColor}-200/30`,
        'absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl -z-5 transition-colors duration-300 animate-float'
      ]" :style="{
        backgroundColor: themeStore.isDarkMode ? 'rgba(40, 40, 40, 0.15)' : undefined
      }" />

      <!-- Bottom left accent blob -->
      <div :class="[
        !themeStore.isDarkMode && `bg-${currentThemeColor}-100/25`,
        'absolute -bottom-32 -left-32 w-[30rem] h-[30rem] rounded-full blur-3xl -z-5 transition-colors duration-300 animate-float-delay'
      ]" :style="{
        backgroundColor: themeStore.isDarkMode ? 'rgba(30, 30, 30, 0.1)' : undefined
      }" />

      <!-- Subtle accent elements -->
      <div class="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30 dark:opacity-20"></div>
      <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-transparent to-accent opacity-30 dark:opacity-20"></div>

      <!-- Header with HomeNavbar -->
      <HomeNavbar />

      <!-- Main Content -->
      <div class="flex gap-8 h-[calc(100%-theme(spacing.8))] justify-center relative">
        <div class="flex-1 relative flex flex-col justify-between overflow-y-auto custom-scrollbar pb-20 md:pb-0">
          <slot />
        </div>
      </div>
    </div>
  </div>

  <!-- Theme Debug Panel with global theme support -->
  <div class="fixed bottom-4 right-4 rounded-lg p-3 shadow-lg z-50 text-sm transition-colors duration-300" :style="{
    backgroundColor: themeStore.isDarkMode
      ? `rgba(var(--matte-black-light-rgb), 0.9)`
      : `rgba(var(--${currentThemeColor}-50-rgb), 0.8)`,
    color: 'var(--text-primary)'
  }">
    <div class="font-medium">Theme Debug:</div>
    <div :style="{ color: 'var(--text-secondary)' }">
      Theme: {{ currentThemeObject?.name || currentThemeColor }}
    </div>
    <div :style="{ color: 'var(--text-secondary)' }">
      Category: {{ currentThemeObject?.category || 'Default' }}
    </div>
    <div :style="{ color: 'var(--text-secondary)' }">
      Dark Mode: {{ themeStore.isDarkMode ? 'On' : 'Off' }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import HomeNavbar from '@/components/HomeNavbar.vue'
import { useThemeStore } from '@/stores/theme/themeStore'

const themeStore = useThemeStore()
const isLayoutInitialized = ref(false)

// Get the current theme color (blue, green, purple, amber)
const currentThemeColor = computed(() => {
  // Get theme from theme store
  const themeId = themeStore.currentThemeId
  // Remove '-theme' suffix if present
  return themeId.replace('-theme', '')
})

// Get the current theme object with name and category
const currentThemeObject = computed(() => {
  // Get the theme object directly from the theme store
  return themeStore.currentThemeObject
})

onMounted(() => {
  // Mark layout as initialized
  isLayoutInitialized.value = true
  console.log('HomeMainLayout initialized')
})

defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style>
/* Custom Scrollbar Styles */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-color) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-color);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: var(--scrollbar-hover-color);
}

/* Glass container styles */
.glass-container {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
}

/* Animation classes */
.animate-float {
  animation: float 15s ease-in-out infinite;
}

.animate-float-delay {
  animation: float-delay 18s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-8px) translateX(4px); }
  100% { transform: translateY(0) translateX(0); }
}

@keyframes float-delay {
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-10px) translateX(-5px); }
  100% { transform: translateY(0) translateX(0); }
}
</style>
