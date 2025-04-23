<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
import ColorButton from '../components/ColorButton.vue'
import { getAvailableColors } from '../lib/color-utils'

const colors = getAvailableColors()
</script>

<template>
  <div class="home-container">
    <h1>Home Page</h1>
    
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    
    <HelloWorld msg="Vite + Vue" />

    <div class="color-buttons">
      <h2>Color Button Examples</h2>
      <div class="button-row">
        <ColorButton v-for="color in colors" :key="color" :color="color">
          {{ color }} Button
        </ColorButton>
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

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.color-buttons {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 0.5rem;
}

.button-row {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
</style>