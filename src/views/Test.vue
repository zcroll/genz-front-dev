<template>
  <div class="test-container">
    <h1 class="text-3xl font-bold mb-6">Take a Test</h1>
    
    <div class="test-content">
      <p class="mb-4">This is the test page where users can take assessments.</p>
      
      <div class="test-card">
        <h2 class="text-xl font-semibold mb-3">Career Assessment</h2>
        <p class="mb-4">Discover your ideal career path based on your skills, interests, and personality.</p>
        <button class="start-button" :class="`bg-${themeStore.color}-500 hover:bg-${themeStore.color}-600`">
          Start Assessment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
</script>

<style scoped>
.test-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.test-content {
  margin-top: 2rem;
}

.test-card {
  padding: 2rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  margin-bottom: 2rem;
}

.dark .test-card {
  background-color: rgba(31, 41, 55, 0.8);
}

.start-button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
}
</style>