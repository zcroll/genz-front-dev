import { ref, watch } from 'vue'

// Define available color options from components.json
const availableColors = ["neutral", "slate", "zinc", "stone", "gray", "blue", "green", "red", "purple", "orange"]

// Create a reactive reference to store the current theme color
export const currentThemeColor = ref(localStorage.getItem('theme-color') || 'gray')

// Watch for changes to the theme color and update localStorage
watch(currentThemeColor, (newColor) => {
  localStorage.setItem('theme-color', newColor)
  applyThemeColor(newColor)
})

// Function to apply the theme color to the document
export function applyThemeColor(color: string) {
  if (!availableColors.includes(color)) {
    console.warn(`Color "${color}" is not supported. Using default "gray" instead.`)
    color = 'gray'
  }

  // Remove any existing color classes
  document.documentElement.classList.remove(...availableColors.map(c => `theme-${c}`))

  // Add the new color class
  document.documentElement.classList.add(`theme-${color}`)
}

// Function to get all available colors
export function getAvailableColors() {
  return availableColors
}

// Initialize theme color on import
applyThemeColor(currentThemeColor.value)
