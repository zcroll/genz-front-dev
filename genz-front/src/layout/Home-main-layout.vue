<template>
  <div :class="[
    // Use the simpler theme store properties
    'h-screen p-4 overflow-hidden transition-colors duration-300',
    themeStore.isDarkMode ? 'dark bg-gray-900' : 'bg-white'
  ]">
    <div
        class="w-full h-full max-w-[120rem] rounded-[48px] p-12 md:shadow-2xl relative overflow-hidden backdrop-blur-lg"
        :class="[
        themeStore.isDarkMode ? 'bg-gray-800/40' : 'bg-white/40',
        'md:p-12 p-4 md:rounded-[48px] rounded-none'
      ]" :style="{
        backgroundPosition: '80% center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backdropFilter: 'blur(20px)',
      }">
      <!-- Decorative circles using theme colors with dark mode variants -->
      <div :class="[
        themeStore.isDarkMode
          ? `bg-${themeStore.color}-900/30`
          : `bg-${themeStore.color}-100`,
        'absolute top-0 right-0 w-1/2 h-1/2 rounded-full blur-3xl -z-10 opacity-60 transition-colors duration-300'
      ]" />
      <div :class="[
        themeStore.isDarkMode
          ? `bg-${themeStore.color}-800/20`
          : `bg-${themeStore.color}-50`,
        'absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full blur-3xl -z-10 opacity-60 transition-colors duration-300'
      ]" />

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

  <!-- Theme Debug Panel with dark mode support -->
  <div :class="[
    'fixed bottom-4 right-4 rounded-lg p-3 shadow-lg z-50 text-sm transition-colors duration-300',
    themeStore.isDarkMode
      ? 'bg-gray-800/80 text-white'
      : 'bg-white/80 text-gray-900'
  ]">
    <div class="font-medium">Theme Debug:</div>
    <div :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'">
      Color: {{ themeStore.color }}
    </div>
    <div :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'">
      Dark Mode: {{ themeStore.isDarkMode ? 'On' : 'Off' }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HomeNavbar from '@/components/HomeNavbar.vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isLayoutInitialized = ref(false)

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
</style>
