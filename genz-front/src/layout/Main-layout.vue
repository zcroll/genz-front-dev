<template>
  <div :class="[
    // Use the theme system with 16personalities-inspired themes
    'h-screen p-4 overflow-hidden transition-colors duration-300 bg-pattern',
    themeStore.isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50',
    `theme-${currentThemeColor}` // Apply theme class based on current theme
  ]">
    <!-- Background pattern overlay -->
    <div class="fixed inset-0 bg-pattern-overlay opacity-5 dark:opacity-10 pointer-events-none"></div>
    <!-- Theme-colored gradient background -->
    <div class="fixed inset-0 theme-gradient opacity-20 dark:opacity-15 pointer-events-none"></div>
    <div
        class="w-full h-full max-w-[120rem] relative overflow-hidden glass-container"
        :class="[
        themeStore.isDarkMode
          ? `bg-gray-800/60 md:border-${currentThemeColor}-800/30`
          : `bg-white/80 md:border-${currentThemeColor}-200/40`,
        'md:p-12 p-4 md:rounded-[32px] rounded-none md:border'
      ]" :style="{
        backdropFilter: 'blur(16px)',
        boxShadow: themeStore.isDarkMode
          ? `0 20px 40px -12px rgba(0, 0, 0, 0.6), 0 0 20px -5px var(--${currentThemeColor}-glow-dark)`
          : `0 20px 40px -12px rgba(0, 0, 0, 0.1), 0 0 20px -5px var(--${currentThemeColor}-glow-light)`
      }">
      <!-- Refined decorative elements using 16personalities-inspired theme colors -->
      <!-- Main background gradient -->
      <div class="absolute inset-0 bg-gradient -z-10 transition-opacity duration-500"></div>

      <!-- Top right accent blob -->
      <div :class="[
        themeStore.isDarkMode
          ? `bg-${currentThemeColor}-800/15`
          : `bg-${currentThemeColor}-200/30`,
        'absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl -z-5 transition-colors duration-300 animate-float'
      ]" />

      <!-- Bottom left accent blob -->
      <div :class="[
        themeStore.isDarkMode
          ? `bg-${currentThemeColor}-900/10`
          : `bg-${currentThemeColor}-100/25`,
        'absolute -bottom-32 -left-32 w-[30rem] h-[30rem] rounded-full blur-3xl -z-5 transition-colors duration-300 animate-float-delay'
      ]" />

      <!-- Subtle accent elements -->
      <div class="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30 dark:opacity-20"></div>
      <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-transparent to-accent opacity-30 dark:opacity-20"></div>

      <!-- Small accent details -->
      <div :class="[
        'absolute top-10 left-[10%] w-3 h-3 rounded-full transition-colors duration-300',
        `bg-${currentThemeColor}-500/40 dark:bg-${currentThemeColor}-400/30`
      ]" />
      <div :class="[
        'absolute bottom-16 right-[15%] w-2 h-2 rounded-full transition-colors duration-300',
        `bg-${currentThemeColor}-500/40 dark:bg-${currentThemeColor}-400/30`
      ]" />
      <div :class="[
        'absolute top-[40%] right-12 w-4 h-4 rounded-full transition-colors duration-300',
        `bg-${currentThemeColor}-500/40 dark:bg-${currentThemeColor}-400/30`
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

          <!-- Theme Switcher -->
          <div class="flex items-center gap-2">
            <ThemeSwitcher />

            <!-- Dark Mode Toggle -->
            <button @click="themeStore.toggleDarkMode" :class="[
              'p-2.5 rounded-full transition-colors bg-background hover:bg-muted'
            ]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      :d="themeStore.isDarkMode ? 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' : 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'" />
              </svg>
            </button>
          </div>

          <NotificationDropdown />

          <div class="flex items-center gap-3">
            <span class="text-base text-gray-700">Hi, {{ user.name }}</span>

            <router-link to="/profile" class="relative group cursor-pointer">
              <div :class="[
              `bg-${currentThemeColor}-400/20`,
              'absolute inset-0 rounded-full blur-md transition-opacity opacity-0 group-hover:opacity-100'
            ]"></div>
              <img :src="user.profile_photo_url" :alt="user.name" :class="[
              `border-${currentThemeColor}-300`,
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
            ? `bg-${currentThemeColor}-900/40`
            : `bg-${currentThemeColor}-50/40`,
          'shadow-[0_-8px_30px_rgba(0,0,0,0.12)]'
        ]">
          <Navbar :is-mobile="true" />
        </div>
      </div>
    </div>
  </div>

  <!-- Theme Debug Panel with 16personalities-inspired theme support -->
  <div :class="[
    'fixed bottom-4 right-4 rounded-lg p-3 shadow-lg z-50 text-sm transition-colors duration-300',
    themeStore.isDarkMode
      ? `bg-${currentThemeColor}-900/80 text-white`
      : `bg-${currentThemeColor}-50/80 text-gray-900`
  ]">
    <div class="font-medium">Theme Debug:</div>
    <div :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'">
      Theme: {{ currentThemeObject?.name || currentThemeColor }}
    </div>
    <div :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'">
      Category: {{ currentThemeObject?.category || 'Default' }}
    </div>
    <div :class="themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'">
      Dark Mode: {{ themeStore.isDarkMode ? 'On' : 'Off' }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, provide, computed } from 'vue'
import { Search, Bell } from 'lucide-vue-next'
import { UserIcon } from '@heroicons/vue/24/outline'
import Navbar from '@/components/Navbar.vue'
import { useThemeStore } from '@/stores/theme'
import { useNavigationStore } from '@/stores/navigation/navigationStore'
import { useUserStore } from '@/stores/user'
import NotificationDropdown from '@/components/ui/notification/NotificationDropdown.vue'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { useRouter } from 'vue-router'
import { currentTheme, availableThemes } from '@/lib/theme-utils'

const router = useRouter()
const themeStore = useThemeStore()
const navigationStore = useNavigationStore()
const userStore = useUserStore()
const isLayoutInitialized = ref(false)

// Get the current theme color (blue, green, purple, amber)
const currentThemeColor = computed(() => {
  // Get theme from theme store or from theme-utils
  const themeId = themeStore.currentThemeId || currentTheme.value
  // Remove '-theme' suffix if present
  return themeId.replace('-theme', '')
})

// Get the current theme object with name and category
const currentThemeObject = computed(() => {
  const themeId = currentThemeColor.value
  // Find the theme object in availableThemes
  return availableThemes.find(theme => theme.id === themeId) ||
         themeStore.availableThemes.find(theme => theme.id === `${themeId}-theme`)
})

// Check if user is logged in
const isLoggedIn = computed(() => userStore.isLoggedIn)

// Get user data from user store
const user = computed(() => {
  if (isLoggedIn.value) {
    return {
      name: userStore.userName || 'User',
      profile_photo_url: userStore.user?.profile_photo_url || 'https://ui-avatars.com/api/?name=User&color=7F9CF5&background=EBF4FF'
    }
  }
  return {
    name: 'User',
    profile_photo_url: 'https://ui-avatars.com/api/?name=User&color=7F9CF5&background=EBF4FF'
  }
})

// Provide layout initialization state to child components
provide('isLayoutInitialized', isLayoutInitialized)
// Provide user data to child components
provide('user', user)

onMounted(() => {
  // Redirect to login if not authenticated
  if (!isLoggedIn.value) {
    router.push('/login')
    return
  }

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

const logout = async () => {
  await userStore.logout()
  router.push('/login')
};
</script>

<style>
/* Theme-based scrollbar variables */
:root {
  --scrollbar-color: rgba(156, 163, 175, 0.5);
  --scrollbar-hover-color: rgba(156, 163, 175, 0.7);
}

:root.dark {
  --scrollbar-color: rgba(75, 85, 99, 0.5);
  --scrollbar-hover-color: rgba(75, 85, 99, 0.7);
}

/* Theme-specific variables and patterns */
.theme-blue {
  --scrollbar-color: rgba(37, 99, 235, 0.3);
  --scrollbar-hover-color: rgba(37, 99, 235, 0.5);
  --blue-glow-light: rgba(59, 130, 246, 0.25);
  --blue-glow-dark: rgba(37, 99, 235, 0.15);
  --accent: rgba(37, 99, 235, 0.7);
  background-image: radial-gradient(rgba(37, 99, 235, 0.02) 1.5px, transparent 1.5px);
  background-size: 20px 20px;
}

.theme-blue .bg-gradient {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(37, 99, 235, 0.01) 100%);
}

.theme-blue .theme-gradient {
  background: radial-gradient(circle at top right, rgba(37, 99, 235, 0.1), transparent 70%),
              radial-gradient(circle at bottom left, rgba(37, 99, 235, 0.05), transparent 70%);
}

.theme-green {
  --scrollbar-color: rgba(22, 163, 74, 0.3);
  --scrollbar-hover-color: rgba(22, 163, 74, 0.5);
  --green-glow-light: rgba(34, 197, 94, 0.25);
  --green-glow-dark: rgba(22, 163, 74, 0.15);
  --accent: rgba(22, 163, 74, 0.7);
  background-image: radial-gradient(rgba(22, 163, 74, 0.02) 1.5px, transparent 1.5px);
  background-size: 20px 20px;
}

.theme-green .bg-gradient {
  background: linear-gradient(135deg, rgba(22, 163, 74, 0.03) 0%, rgba(22, 163, 74, 0.01) 100%);
}

.theme-green .theme-gradient {
  background: radial-gradient(circle at top right, rgba(22, 163, 74, 0.1), transparent 70%),
              radial-gradient(circle at bottom left, rgba(22, 163, 74, 0.05), transparent 70%);
}

.theme-purple {
  --scrollbar-color: rgba(126, 34, 206, 0.3);
  --scrollbar-hover-color: rgba(126, 34, 206, 0.5);
  --purple-glow-light: rgba(147, 51, 234, 0.25);
  --purple-glow-dark: rgba(126, 34, 206, 0.15);
  --accent: rgba(126, 34, 206, 0.7);
  background-image: radial-gradient(rgba(126, 34, 206, 0.02) 1.5px, transparent 1.5px);
  background-size: 20px 20px;
}

.theme-purple .bg-gradient {
  background: linear-gradient(135deg, rgba(126, 34, 206, 0.03) 0%, rgba(126, 34, 206, 0.01) 100%);
}

.theme-purple .theme-gradient {
  background: radial-gradient(circle at top right, rgba(126, 34, 206, 0.1), transparent 70%),
              radial-gradient(circle at bottom left, rgba(126, 34, 206, 0.05), transparent 70%);
}

.theme-amber {
  --scrollbar-color: rgba(217, 119, 6, 0.3);
  --scrollbar-hover-color: rgba(217, 119, 6, 0.5);
  --amber-glow-light: rgba(245, 158, 11, 0.25);
  --amber-glow-dark: rgba(217, 119, 6, 0.15);
  --accent: rgba(217, 119, 6, 0.7);
  background-image: radial-gradient(rgba(217, 119, 6, 0.02) 1.5px, transparent 1.5px);
  background-size: 20px 20px;
}

.theme-amber .bg-gradient {
  background: linear-gradient(135deg, rgba(217, 119, 6, 0.03) 0%, rgba(217, 119, 6, 0.01) 100%);
}

.theme-amber .theme-gradient {
  background: radial-gradient(circle at top right, rgba(217, 119, 6, 0.1), transparent 70%),
              radial-gradient(circle at bottom left, rgba(217, 119, 6, 0.05), transparent 70%);
}

/* Dark mode theme adjustments */
.dark.theme-blue {
  --scrollbar-color: rgba(59, 130, 246, 0.3);
  --scrollbar-hover-color: rgba(59, 130, 246, 0.5);
  background-image: radial-gradient(rgba(59, 130, 246, 0.03) 1.5px, transparent 1.5px);
  background-size: 20px 20px;
}

.dark.theme-green {
  --scrollbar-color: rgba(34, 197, 94, 0.3);
  --scrollbar-hover-color: rgba(34, 197, 94, 0.5);
  background-image: radial-gradient(rgba(34, 197, 94, 0.03) 1.5px, transparent 1.5px);
  background-size: 20px 20px;
}

.dark.theme-purple {
  --scrollbar-color: rgba(147, 51, 234, 0.3);
  --scrollbar-hover-color: rgba(147, 51, 234, 0.5);
  background-image: radial-gradient(rgba(147, 51, 234, 0.03) 1.5px, transparent 1.5px);
  background-size: 20px 20px;
}

.dark.theme-amber {
  --scrollbar-color: rgba(245, 158, 11, 0.3);
  --scrollbar-hover-color: rgba(245, 158, 11, 0.5);
  background-image: radial-gradient(rgba(245, 158, 11, 0.03) 1.5px, transparent 1.5px);
  background-size: 20px 20px;
}

/* Background pattern styles */
.bg-pattern {
  background-size: 20px 20px;
}

.bg-pattern-overlay {
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M20 18v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zm-10 8v-2h-2v2H6v2h2v2h2v-2h2v-2h-2zM30 6V4h-2v2h-2v2h2v2h2V8h2V6h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Glass container styles */
.glass-container {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
}

/* Animation keyframes - more subtle and professional */
@keyframes float {
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-8px) translateX(4px); }
  100% { transform: translateY(0) translateX(0); }
}

@keyframes float-reverse {
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(8px) translateX(-4px); }
  100% { transform: translateY(0) translateX(0); }
}

@keyframes float-delay {
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-10px) translateX(-5px); }
  100% { transform: translateY(0) translateX(0); }
}

@keyframes float-delay-reverse {
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(10px) translateX(5px); }
  100% { transform: translateY(0) translateX(0); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.4; }
}

/* Animation classes - smoother and more subtle */
.animate-float {
  animation: float 15s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float-reverse 12s ease-in-out infinite;
}

.animate-float-delay {
  animation: float-delay 18s ease-in-out infinite;
}

.animate-float-delay-reverse {
  animation: float-delay-reverse 14s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Font styles */
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
