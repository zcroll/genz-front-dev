<template>
  <div :class="[
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

      <!-- Home Navbar -->
      <HomeNavbar />

      <!-- Main Content -->
      <div class="flex flex-col h-[calc(100%-theme(spacing.16))] overflow-y-auto custom-scrollbar">
        <slot />
      </div>

      <!-- Theme Switch Button -->
      <button @click="themeStore.toggleDarkMode" 
        class="fixed bottom-6 right-6 p-3 rounded-full transition-colors shadow-lg"
        :class="[
          themeStore.isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500',
          `hover:bg-${themeStore.color}/10`
        ]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            :d="themeStore.isDarkMode ? 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' : 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HomeNavbar from '@/components/HomeNavbar.vue'
import { useThemeStore } from '@/stores/theme.js'

const themeStore = useThemeStore()
const isLayoutInitialized = ref(false)

onMounted(() => {
  // Mark layout as initialized
  isLayoutInitialized.value = true
  console.log('HomeLayout initialized')
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