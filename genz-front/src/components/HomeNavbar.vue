<template>
  <!-- Header with dark mode styles -->
  <header class="flex items-center justify-between mb-8">
    <h1 :class="[
      'text-3xl font-bold tracking-wide transition-colors duration-300',
      themeStore.isDarkMode ? 'text-white' : 'text-gray-900'
    ]">
      GenZ
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

      <!-- Show different navigation options based on authentication status -->
      <div class="flex items-center gap-3">
        <template v-if="isLoggedIn">
          <RouterLink to="/dashboard" class="nav-button dashboard-button px-4 py-2 rounded-lg relative"
                    :class="[
                      `bg-${currentThemeColor}-500 text-white hover:bg-${currentThemeColor}-600`,
                      { 'nav-active': $route.path.startsWith('/dashboard') }
                    ]">
            Dashboard
          </RouterLink>
          <button @click="handleLogout" class="nav-button logout-button px-4 py-2 rounded-lg border" :class="`border-${currentThemeColor}-500 text-${currentThemeColor}-500 hover:bg-${currentThemeColor}-50`">
            Logout
          </button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="nav-button login-button px-4 py-2 rounded-lg border relative"
                    :class="[
                      `border-${currentThemeColor}-500 text-${currentThemeColor}-500 hover:bg-${currentThemeColor}-50`,
                      { 'nav-active': $route.path.startsWith('/login') }
                    ]">
            Login
          </RouterLink>
          <RouterLink to="/test" class="nav-button test-button px-4 py-2 rounded-lg relative"
                    :class="[
                      `bg-${currentThemeColor}-500 text-white hover:bg-${currentThemeColor}-600`,
                      { 'nav-active': $route.path.startsWith('/test') }
                    ]">
            Take a Test
          </RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useThemeStore } from '@/stores/theme';
import { useUserStore } from '@/stores/user';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { computed } from 'vue';
import { currentTheme, availableThemes } from '@/lib/theme-utils';

const themeStore = useThemeStore();
const userStore = useUserStore();
const router = useRouter();

// Get the current theme color (blue, green, purple, amber)
const currentThemeColor = computed(() => {
  // Get theme from theme store or from theme-utils
  const themeId = themeStore.currentThemeId || currentTheme.value;
  // Remove '-theme' suffix if present
  return themeId.replace('-theme', '');
});

// Get the current theme object with name and category
const currentThemeObject = computed(() => {
  const themeId = currentThemeColor.value;
  // Find the theme object in availableThemes
  return availableThemes.find(theme => theme.id === themeId) ||
         themeStore.availableThemes.find(theme => theme.id === `${themeId}-theme`);
});

// Check if user is logged in
const isLoggedIn = computed(() => userStore.isLoggedIn);

// Handle logout
const handleLogout = async () => {
  await userStore.logout();
  router.push('/login');
};
</script>

<style scoped>
/* Active state styling */
.nav-active {
  position: relative;
}

.nav-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 3px;
  border-radius: 2px;
  background-color: var(--active-indicator);
  box-shadow: 0 0 8px var(--active-glow);
}

.nav-actions {
  display: flex;
  gap: 1rem;
}

.nav-button {
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

/* Theme-specific button styles */
.theme-blue .login-button {
  border-color: var(--blue-500);
  color: var(--blue-500);
}

.theme-blue .login-button:hover {
  background-color: var(--blue-50);
}

.theme-blue .test-button {
  background-color: var(--blue-500);
  color: white;
}

.theme-blue .test-button:hover {
  background-color: var(--blue-600);
}

.theme-blue .nav-active::after {
  --active-indicator: var(--blue-400);
  --active-glow: rgba(37, 99, 235, 0.5);
}

.theme-green .login-button {
  border-color: var(--green-500);
  color: var(--green-500);
}

.theme-green .login-button:hover {
  background-color: var(--green-50);
}

.theme-green .test-button {
  background-color: var(--green-500);
  color: white;
}

.theme-green .test-button:hover {
  background-color: var(--green-600);
}

.theme-green .nav-active::after {
  --active-indicator: var(--green-400);
  --active-glow: rgba(22, 163, 74, 0.5);
}

.theme-purple .login-button {
  border-color: var(--purple-500);
  color: var(--purple-500);
}

.theme-purple .login-button:hover {
  background-color: var(--purple-50);
}

.theme-purple .test-button {
  background-color: var(--purple-500);
  color: white;
}

.theme-purple .test-button:hover {
  background-color: var(--purple-600);
}

.theme-purple .nav-active::after {
  --active-indicator: var(--purple-400);
  --active-glow: rgba(126, 34, 206, 0.5);
}

.theme-amber .login-button {
  border-color: var(--amber-500);
  color: var(--amber-500);
}

.theme-amber .login-button:hover {
  background-color: var(--amber-50);
}

.theme-amber .test-button {
  background-color: var(--amber-500);
  color: white;
}

.theme-amber .test-button:hover {
  background-color: var(--amber-600);
}

.theme-amber .nav-active::after {
  --active-indicator: var(--amber-400);
  --active-glow: rgba(217, 119, 6, 0.5);
}
</style>