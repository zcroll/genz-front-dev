import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAvailableColors } from '../lib/color-utils'

// Define types for the theme
export interface ThemeState {
  color: string
  darkMode: boolean
}

// Define the theme store
export const useThemeStore = defineStore('theme', () => {
  // Get available colors from the utility
  const availableColors = getAvailableColors()
  const defaultColor = 'gray' // Set default color to gray

  // State
  const color = ref<string>(localStorage.getItem('theme-color') || defaultColor)
  const darkMode = ref<boolean>(localStorage.getItem('dark-mode') === 'true')

  // Getters
  const currentColor = computed(() => color.value)
  const isDarkMode = computed(() => darkMode.value)
  const availableThemeColors = computed(() => availableColors)

  // Actions
  function setColor(newColor: string) {
    if (availableColors.includes(newColor)) {
      color.value = newColor
      localStorage.setItem('theme-color', newColor)
    } else {
      console.warn(`Color "${newColor}" is not available. Using default.`)
      color.value = defaultColor
      localStorage.setItem('theme-color', defaultColor)
    }
  }

  function toggleDarkMode() {
    darkMode.value = !darkMode.value
    localStorage.setItem('dark-mode', darkMode.value.toString())

    // Apply dark mode to document
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function setDarkMode(value: boolean) {
    darkMode.value = value
    localStorage.setItem('dark-mode', value.toString())

    // Apply dark mode to document
    if (value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Initialize dark mode on store creation
  if (darkMode.value) {
    document.documentElement.classList.add('dark')
  }

  return {
    // State
    color,
    darkMode,

    // Getters
    currentColor,
    isDarkMode,
    availableThemeColors,

    // Actions
    setColor,
    toggleDarkMode,
    setDarkMode
  }
})