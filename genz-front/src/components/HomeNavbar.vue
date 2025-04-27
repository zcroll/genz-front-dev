<template>
  <nav class="home-navbar">
    <div class="logo">
      <h1 class="text-xl font-bold">GenZ</h1>
    </div>
    <div class="nav-actions">
      <RouterLink to="/login" class="nav-button login-button">
        Login
      </RouterLink>
      <RouterLink to="/test" class="nav-button test-button">
        Take a Test
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
</script>

<style scoped>
.home-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  margin-bottom: 2rem;
}

.dark .home-navbar {
  background-color: rgba(31, 41, 55, 0.8);
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