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

      <!-- Show different navigation options based on authentication status -->
      <div class="flex items-center gap-3">
        <template v-if="isLoggedIn">
          <RouterLink to="/dashboard" class="nav-button dashboard-button px-4 py-2 rounded-lg" :class="`bg-${themeStore.color}-500 text-white hover:bg-${themeStore.color}-600`">
            Dashboard
          </RouterLink>
          <button @click="handleLogout" class="nav-button logout-button px-4 py-2 rounded-lg border" :class="`border-${themeStore.color}-500 text-${themeStore.color}-500 hover:bg-${themeStore.color}-50`">
            Logout
          </button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="nav-button login-button px-4 py-2 rounded-lg border" :class="`border-${themeStore.color}-500 text-${themeStore.color}-500 hover:bg-${themeStore.color}-50`">
            Login
          </RouterLink>
          <RouterLink to="/test" class="nav-button test-button px-4 py-2 rounded-lg" :class="`bg-${themeStore.color}-500 text-white hover:bg-${themeStore.color}-600`">
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
import { computed } from 'vue';

const themeStore = useThemeStore();
const userStore = useUserStore();
const router = useRouter();

// Check if user is logged in
const isLoggedIn = computed(() => userStore.isLoggedIn);

// Handle logout
const handleLogout = async () => {
  await userStore.logout();
  router.push('/login');
};
</script>

<style scoped>
/* No additional styles needed as we're using Tailwind classes */

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

.login-button {
  background-color: transparent;
  border: 1px solid v-bind('`var(--color-${themeStore.color}-500)`');
  color: v-bind('`var(--color-${themeStore.color}-500)`');
}

.login-button:hover {
  background-color: v-bind('`var(--color-${themeStore.color}-50)`');
}

.test-button {
  background-color: v-bind('`var(--color-${themeStore.color}-500)`');
  color: white;
}

.test-button:hover {
  background-color: v-bind('`var(--color-${themeStore.color}-600)`');
}
</style>