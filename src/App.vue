<script setup lang="ts">
import { useThemeStore } from './stores/theme'
import { useUserStore } from './stores/user'
import MainLayout from "@/layout/Main-layout.vue";
import HomeMainLayout from "@/layout/Home-main-layout.vue";
import { RouterView, useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { applyTheme, currentTheme } from './lib/theme-utils'

// Initialize stores
const themeStore = useThemeStore()
const userStore = useUserStore()
const route = useRoute()

// Initialize theme
onMounted(() => {
  // Apply the current theme
  applyTheme(currentTheme.value)
})

// Check if user is logged in
const isLoggedIn = computed(() => userStore.isLoggedIn)

// Determine which layout to use based on the current route and auth status
const isHomePage = computed(() => route.name === 'home')
const isFilmDirectorPage = computed(() => route.name === 'film-director-career')
const isCareerDetailPage = computed(() => {
  return route.name === 'career-detail'
})
const isGuestOnlyPage = computed(() => {
  return route.matched.some(record => record.meta.guest)
})

// Determine if we should use the main layout
// Only use MainLayout for authenticated users and non-guest pages
// Also include our new career detail pages
const useMainLayout = computed(() => {
  return (!isHomePage.value && !isFilmDirectorPage.value && isLoggedIn.value && !isGuestOnlyPage.value) ||
         isCareerDetailPage.value
})

// Determine if we should use the home layout for special pages like film-director-career
const useHomeLayout = computed(() => {
  return isHomePage.value || isFilmDirectorPage.value
})
</script>

<template>
  <!-- Use HomeMainLayout for home page and film director page, MainLayout for authenticated non-guest pages, and no layout for guest pages -->
  <HomeMainLayout v-if="useHomeLayout" title="GenZ App">
    <RouterView />
  </HomeMainLayout>
  <MainLayout v-else-if="useMainLayout" title="GenZ App">
    <RouterView />
  </MainLayout>
  <RouterView v-else />
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f8f8;
  border-bottom: 1px solid #eaeaea;
}

.dark-mode .app-header {
  background-color: #222;
  border-bottom-color: #444;
  color: white;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 2.5em;
  padding: 0.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 1em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 1em #42b883aa);
}

.main-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s;
}

.dark-mode .nav-link {
  color: #eee;
}

.nav-link:hover {
  background-color: #eee;
}

.dark-mode .nav-link:hover {
  background-color: #444;
}

.nav-link.router-link-active {
  font-weight: bold;
  color: #3498db;
}

.dark-mode .nav-link.router-link-active {
  color: #5dade2;
}

.theme-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
}

.color-select {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ddd;
}

.dark-mode .color-select {
  background-color: #333;
  color: white;
  border-color: #555;
}

.app-content {
  flex: 1;
  padding: 2rem;
}

.app-footer {
  padding: 1.5rem;
  text-align: center;
  background-color: #f8f8f8;
  border-top: 1px solid #eaeaea;
  font-size: 0.875rem;
  color: #666;
}

.dark-mode .app-footer {
  background-color: #222;
  border-top-color: #444;
  color: #aaa;
}
</style>
