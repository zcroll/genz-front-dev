<template>
  <div class="p-6 rounded-lg shadow-md" :class="themeClasses">
    <h2 class="text-2xl font-bold mb-4">JSON Theme Test</h2>
    
    <div class="mb-4">
      <p class="mb-2"><strong>Current Theme:</strong> {{ currentThemeId }}</p>
      <p class="mb-2"><strong>Dark Mode:</strong> {{ isDarkMode ? 'Enabled' : 'Disabled' }}</p>
    </div>
    
    <div class="flex space-x-4 mb-6">
      <button 
        @click="themeStore.toggleDarkMode()" 
        class="px-4 py-2 rounded-md transition-colors"
        :class="buttonClasses"
      >
        Toggle Dark Mode
      </button>
      
      <button 
        v-for="theme in themeStore.availableThemes" 
        :key="theme.id"
        @click="themeStore.switchTheme(theme.id)"
        class="px-4 py-2 rounded-md transition-colors"
        :class="[
          buttonClasses,
          theme.id === themeStore.currentThemeId ? 'ring-2 ring-offset-2' : ''
        ]"
      >
        {{ theme.name }}
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="(section, index) in themeSections" 
        :key="index"
        class="p-4 rounded-md"
        :class="section.bgClass"
      >
        <h3 class="font-semibold mb-2">{{ section.title }}</h3>
        <div class="space-y-2">
          <p v-for="(value, key) in section.values" :key="key">
            <span class="font-medium">{{ formatKey(key) }}:</span> {{ value }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme/themeStore'

const themeStore = useThemeStore()

// Computed properties for reactive styling
const isDarkMode = computed(() => themeStore.isDarkMode)
const currentThemeId = computed(() => themeStore.currentThemeId)
const currentTheme = computed(() => themeStore.currentTheme)

// Classes for the container
const themeClasses = computed(() => {
  return [
    isDarkMode.value ? 'bg-gray-800 text-white' : 'bg-white text-gray-800',
    `border-${currentThemeId.value.replace('-theme', '')}-500`
  ]
})

// Classes for buttons
const buttonClasses = computed(() => {
  const themeColor = currentThemeId.value.replace('-theme', '')
  return isDarkMode.value
    ? `bg-${themeColor}-700 hover:bg-${themeColor}-600 text-white`
    : `bg-${themeColor}-100 hover:bg-${themeColor}-200 text-${themeColor}-800`
})

// Format the key for display
const formatKey = (key: string) => {
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
}

// Theme sections to display
const themeSections = computed(() => {
  if (!currentTheme.value || Object.keys(currentTheme.value).length === 0) {
    return []
  }
  
  const theme = currentTheme.value
  const themeColor = currentThemeId.value.replace('-theme', '')
  
  return [
    {
      title: 'Theme Colors',
      bgClass: isDarkMode.value ? `bg-${themeColor}-900/30` : `bg-${themeColor}-50`,
      values: {
        primary_color: theme.primary,
        accent_color: theme.accent
      }
    },
    {
      title: 'Base Gradient',
      bgClass: isDarkMode.value ? `bg-${themeColor}-900/30` : `bg-${themeColor}-50`,
      values: theme.base
    },
    {
      title: 'UI Elements',
      bgClass: isDarkMode.value ? `bg-${themeColor}-900/30` : `bg-${themeColor}-50`,
      values: {
        button: theme.button,
        hover: theme.hover,
        border: theme.border,
        ring: theme.ring
      }
    },
    {
      title: 'Background Variants',
      bgClass: isDarkMode.value ? `bg-${themeColor}-900/30` : `bg-${themeColor}-50`,
      values: theme.background
    }
  ]
})
</script>
