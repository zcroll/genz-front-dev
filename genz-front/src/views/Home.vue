<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <div class="home-container">
    <div class="hero-section">
      <h1 class="text-4xl font-bold mb-4">Welcome to GenZ</h1>
      <p class="text-xl mb-8">Discover your ideal career path and educational opportunities</p>

      <div class="cta-buttons">
        <RouterLink to="/test" class="cta-button primary-button" :class="`bg-${themeStore.color}-500 hover:bg-${themeStore.color}-600`">
          Take a Test
        </RouterLink>
        <RouterLink to="/login" class="cta-button secondary-button" :class="`border-${themeStore.color}-500 text-${themeStore.color}-500 hover:bg-${themeStore.color}-50`">
          Login
        </RouterLink>
      </div>
    </div>

    <div class="features-section">
      <div class="feature-card">
        <h2 class="text-xl font-semibold mb-2">Career Assessment</h2>
        <p>Discover careers that match your skills and interests</p>
      </div>

      <div class="feature-card">
        <h2 class="text-xl font-semibold mb-2">Education Paths</h2>
        <p>Find the right educational path for your career goals</p>
      </div>

      <div class="feature-card">
        <h2 class="text-xl font-semibold mb-2">Job Opportunities</h2>
        <p>Connect with employers looking for your unique talents</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 4rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.cta-button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.primary-button {
  color: white;
}

.secondary-button {
  background-color: transparent;
  border: 1px solid;
}

.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  padding: 2rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.dark .feature-card {
  background-color: rgba(31, 41, 55, 0.8);
}
</style>
