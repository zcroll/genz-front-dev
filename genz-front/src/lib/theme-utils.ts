import { ref, watch } from 'vue'

// Define available themes based on 16personalities.com categories
export const availableThemes = [
  {
    id: 'blue',
    name: 'Blue',
    description: 'Sentinel theme - Practical and grounded',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    category: 'sentinel'
  },
  {
    id: 'green',
    name: 'Green',
    description: 'Diplomat theme - Empathetic and cooperative',
    icon: 'M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495',
    category: 'diplomat'
  },
  {
    id: 'purple',
    name: 'Purple',
    description: 'Analyst theme - Strategic and logical',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    category: 'analyst'
  },
  {
    id: 'amber',
    name: 'Amber',
    description: 'Explorer theme - Versatile and practical',
    icon: 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z',
    category: 'explorer'
  }
]

// For backward compatibility
export const availableColors = availableThemes.map(theme => theme.id)

// Create a reactive reference to store the current theme
export const currentTheme = ref(localStorage.getItem('theme') || 'stone')
export const currentThemeColor = ref(localStorage.getItem('theme-color') || currentTheme.value)

// Watch for changes to the theme and update localStorage
watch(currentTheme, (newTheme) => {
  localStorage.setItem('theme', newTheme)
  applyTheme(newTheme)
})

// For backward compatibility
watch(currentThemeColor, (newColor) => {
  localStorage.setItem('theme-color', newColor)
  currentTheme.value = newColor
})

// Function to apply the theme to the document
export function applyTheme(themeId: string) {
  if (!availableThemes.some(theme => theme.id === themeId)) {
    console.warn(`Theme "${themeId}" is not supported. Using default "stone" instead.`)
    themeId = 'stone'
  }

  // Remove any existing theme classes
  document.documentElement.classList.remove(...availableThemes.map(t => `theme-${t.id}`))

  // Add the new theme class
  document.documentElement.classList.add(`theme-${themeId}`)

  // Load the theme CSS
  loadThemeCSS(themeId)
}

// For backward compatibility
export function applyThemeColor(color: string) {
  applyTheme(color)
}

// Function to load theme CSS
function loadThemeCSS(themeId: string) {
  // Remove any existing theme style elements
  const existingThemeStyles = document.querySelectorAll('style[data-theme]')
  existingThemeStyles.forEach(element => element.remove())

  // Create a new style element for the theme
  const themeStyle = document.createElement('style')
  themeStyle.setAttribute('data-theme', themeId)

  // Append the style element to the head
  document.head.appendChild(themeStyle)

  // Import the theme CSS
  import(`../themes/${themeId}.css`).catch(error => {
    console.error(`Failed to load theme "${themeId}":`, error)
  })
}

// Function to get all available themes
export function getAvailableThemes() {
  return availableThemes
}

// For backward compatibility
export function getAvailableColors() {
  return availableColors
}

// Initialize theme on import
applyTheme(currentTheme.value)
