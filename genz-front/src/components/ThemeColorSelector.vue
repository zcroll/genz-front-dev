<script setup lang="ts">
import { currentThemeColor, getAvailableColors } from '@/lib/theme-utils'

const colors = getAvailableColors()
</script>

<template>
  <div class="theme-selector">
    <label for="theme-color" class="block text-sm font-medium mb-2">Theme Color</label>
    <select 
      id="theme-color" 
      v-model="currentThemeColor"
      class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
    >
      <option v-for="color in colors" :key="color" :value="color">
        {{ color.charAt(0).toUpperCase() + color.slice(1) }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.theme-selector {
  margin: 1rem 0;
}
</style>
