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

      <!-- Header with dark mode styles -->
      <header class="flex items-center justify-between mb-8">
        <h1 :class="[
          'text-3xl font-japanese tracking-wide transition-colors duration-300',
          themeStore.isDarkMode ? 'text-white' : 'text-gray-900'
        ]">
          アニマンガヘブン
        </h1>

        <!-- Rest of the header content with dark mode classes -->
        <div class="flex items-center gap-6">

          <!-- Theme Switch Button -->
          <button @click="themeStore.toggleDarkMode" :class="[
            `hover:bg-${themeStore.color}/10`,
            'p-2.5 rounded-full transition-colors'
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" :class="[
              'h-5 w-5',
              themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'
            ]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    :d="themeStore.isDarkMode ? 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' : 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'" />
            </svg>
          </button>

          <NotificationDropdown />

          <div class="flex items-center gap-3">
            <span class="text-base text-gray-700">Hi, {{ user.name }}</span>

            <router-link to="/profile" class="relative group cursor-pointer">
              <div :class="[
              `bg-${themeStore.color}-400/20`,
              'absolute inset-0 rounded-full blur-md transition-opacity opacity-0 group-hover:opacity-100'
            ]"></div>
              <img :src="user.profile_photo_url" :alt="user.name" :class="[
              `border-${themeStore.color}-300`,
              'w-10 h-10 rounded-full border-2 transition-all duration-300 group-hover:scale-105 relative z-10'
            ]" />
            </router-link>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <div class="flex gap-8 h-[calc(100%-theme(spacing.8))] justify-center relative">
        <!-- Desktop Navbar -->
        <div class="shrink-0 hidden md:block">
          <Navbar :is-mobile="false" />
        </div>
        <div class="flex-1 relative flex flex-col justify-between overflow-y-auto custom-scrollbar pb-20 md:pb-0">
          <slot />
        </div>

        <!-- Mobile Bottom Navbar -->
        <div class="fixed bottom-0 left-0 right-0 md:hidden backdrop-blur-2xl z-50 px-2 py-1" :class="[
          themeStore.isDarkMode
            ? 'bg-gray-900/40'
            : 'bg-white/40',
          'shadow-[0_-8px_30px_rgba(0,0,0,0.12)]'
        ]">
          <Navbar :is-mobile="true" />
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
import { ref, onMounted, provide } from 'vue'
import { Search, Bell } from 'lucide-vue-next'
import { UserIcon } from '@heroicons/vue/24/outline'
import Navbar from '@/components/Navbar.vue'
import { useThemeStore } from '@/stores/theme'
import { useNavigationStore } from '@/stores/navigation/navigationStore'
import NotificationDropdown from '@/components/ui/notification/NotificationDropdown.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const themeStore = useThemeStore()
const navigationStore = useNavigationStore()
const isLayoutInitialized = ref(false)

// Mock user data (replace with actual auth logic later)
const user = {
  name: 'User',
  profile_photo_url: 'https://ui-avatars.com/api/?name=User&color=7F9CF5&background=EBF4FF'
}

// Provide layout initialization state to child components
provide('isLayoutInitialized', isLayoutInitialized)
// Provide user data to child components
provide('user', user)

onMounted(() => {
  // Mark layout as initialized
  isLayoutInitialized.value = true

  console.log('MainLayout initialized')
})

defineProps({
  title: {
    type: String,
    required: true
  }
})

const logout = () => {
  // Replace with actual logout logic
  console.log('Logout clicked')
  // router.push('/login')
};
</script>

<style>
/* Add dark mode variables */
:root {
  --scrollbar-color: rgba(156, 163, 175, 0.5);
  --scrollbar-hover-color: rgba(156, 163, 175, 0.7);
}

:root.dark {
  --scrollbar-color: rgba(75, 85, 99, 0.5);
  --scrollbar-hover-color: rgba(75, 85, 99, 0.7);
}

/* Rest of your styles */
.font-japanese {
  font-family: "Noto Sans JP", sans-serif;
}

.font-display {
  font-family: "Montserrat", sans-serif;
}

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
