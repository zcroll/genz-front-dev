import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { themeService } from '@/services/themeService'
import { ThemeJsonConfig, LegacyThemeConfig, ThemeObject } from '@/stores/theme/jsonTypes'

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDarkMode = ref(false)
  const currentArchetype = ref(null)
  const currentThemeId = ref('blue-theme')

  // Store for loaded JSON data
  const loadedThemeData = ref<ThemeJsonConfig | null>(null)

  // Watch for system dark mode changes
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  // Theme configurations with reactive dark mode
  const themeConfig = computed<Record<string, LegacyThemeConfig>>(() => {
    if (!loadedThemeData.value) {
      // Return default empty config if JSON not loaded
      return {}
    }

    const config = {}
    for (const themeKey in loadedThemeData.value.theme_configurations) {
      const themeDef = loadedThemeData.value.theme_configurations[themeKey]
      const modeConfig = isDarkMode.value ? themeDef.dark_mode : themeDef.light_mode

      config[themeKey] = {
        primary: themeDef.primary_color_name,
        accent: themeDef.accent_color_name,
        base: {
          from: modeConfig.base_gradient_from,
          via: modeConfig.base_gradient_via,
          to: modeConfig.base_gradient_to
        },
        button: modeConfig.button_bg.replace('bg-', ''),
        hover: modeConfig.button_hover_bg.replace(isDarkMode.value ? 'dark:hover:bg-' : 'hover:bg-', ''),
        border: modeConfig.border_color.replace(isDarkMode.value ? 'dark:border-' : 'border-', ''),
        ring: modeConfig.ring_color.replace(isDarkMode.value ? 'dark:ring-' : 'ring-', ''),
        background: {
          light: modeConfig.background_light,
          medium: modeConfig.background_medium,
          dark: modeConfig.background_dark
        }
      }
    }
    return config
  })

  // Archetype to theme mapping from JSON
  const archetypeThemeMap = computed(() => {
    return loadedThemeData.value?.archetype_to_theme_map || {}
  })

  // Available themes from JSON
  const availableThemes = computed<ThemeObject[]>(() => {
    return loadedThemeData.value?.available_accent_themes || []
  })

  // Getters
  const currentTheme = computed<LegacyThemeConfig>(() => {
    if (!Object.keys(themeConfig.value).length) {
      // Return empty object if theme config is not loaded
      return {}
    }

    // Get theme based on current archetype, fallback to currentThemeId
    if (!currentArchetype.value) {
      return themeConfig.value[currentThemeId.value] || themeConfig.value['blue-theme'] || {}
    }

    // Map the archetype to one of our four themes
    const themeId = archetypeThemeMap.value[currentArchetype.value] || 'blue'

    // Convert the theme ID to the theme key format used in themeConfig
    const themeKey = `${themeId}-theme`

    // If the theme doesn't exist in themeConfig, fall back to blue-theme
    return themeConfig.value[themeKey] || themeConfig.value['blue-theme'] || {}
  })

  // Current theme object from available themes
  const currentThemeObject = computed<ThemeObject | undefined>(() => {
    return availableThemes.value.find(theme => theme.id === currentThemeId.value)
  })

  // Theme utility functions
  function getThemeClasses(element: string): string {
    const theme = currentTheme.value

    if (!theme || Object.keys(theme).length === 0) {
      return '' // Guard clause if theme is not loaded
    }

    switch (element) {
      case 'base':
        return `${theme.base.from} ${theme.base.via} ${theme.base.to}`
      case 'button':
        return `bg-${theme.button}`
      case 'background':
        return theme.background
      case 'hover':
        return `hover:bg-${theme.hover}`
      case 'border':
        return `border-${theme.border}`
      case 'ring':
        return `ring-${theme.ring}`
      case 'background_light':
        return theme.background.light
      case 'background_medium':
        return theme.background.medium
      case 'background_dark':
        return theme.background.dark
      default:
        return ''
    }
  }

  // Add function to switch themes
  function switchTheme(themeId: string): void {
    // Make sure the theme ID includes '-theme' suffix
    const fullThemeId = themeId.endsWith('-theme') ? themeId : `${themeId}-theme`

    // Check if the theme exists in our available themes
    const themeExists = availableThemes.value.some(theme => theme.id === fullThemeId)

    if (themeExists) {
      currentThemeId.value = fullThemeId
      localStorage.setItem('theme', fullThemeId)

      // Also update the color for backward compatibility
      const baseColor = fullThemeId.replace('-theme', '')
      localStorage.setItem('theme-color', baseColor)
    } else {
      console.warn(`Theme "${themeId}" not found, using blue-theme instead`)
      currentThemeId.value = 'blue-theme'
      localStorage.setItem('theme', 'blue-theme')
      localStorage.setItem('theme-color', 'blue')
    }
  }

  // Actions
  async function initializeTheme() {
    try {
      // Load theme data from JSON
      const themeData = await themeService.loadThemeConfig()
      if (themeData && themeData.theme_configurations) {
        loadedThemeData.value = themeData
      } else {
        console.error("Failed to load or parse theme JSON data.")
        return
      }

      // Get archetype from Inertia shared data if available
      let userArchetype = null
      try {
        const page = usePage()
        userArchetype = page.props.auth?.user?.archetype
        console.log('User archetype from Inertia:', userArchetype)
      } catch (error) {
        console.log('Inertia not available, skipping archetype lookup')
      }

      // Set current archetype from user data
      currentArchetype.value = userArchetype || null

      // Get theme from localStorage or determine from archetype
      const savedTheme = localStorage.getItem('theme')

      let themeId
      if (savedTheme && availableThemes.value.some(theme => theme.id === savedTheme)) {
        // Use saved theme if available and valid
        themeId = savedTheme
      } else if (userArchetype && archetypeThemeMap.value[userArchetype]) {
        // Map archetype to theme
        const baseTheme = archetypeThemeMap.value[userArchetype]
        themeId = `${baseTheme}-theme`
      } else {
        // Default to blue theme
        themeId = 'blue-theme'
      }

      console.log('Selected theme:', {
        archetype: currentArchetype.value,
        themeId: themeId,
        fromArchetype: userArchetype ? archetypeThemeMap.value[userArchetype] : null
      })

      // Set the current theme ID
      currentThemeId.value = themeId

      // Initialize dark mode
      const savedDarkMode = localStorage.getItem('darkMode')
      isDarkMode.value = savedDarkMode !== null
        ? savedDarkMode === 'true'
        : darkModeMediaQuery.matches

      updateDarkMode()

      // Listen for system dark mode changes
      darkModeMediaQuery.addEventListener('change', (e) => {
        if (localStorage.getItem('darkMode') === null) {
          isDarkMode.value = e.matches
          updateDarkMode()
        }
      })

      console.log('Initialized theme:', {
        archetype: currentArchetype.value,
        themeId: currentThemeId.value,
        isDarkMode: isDarkMode.value
      })
    } catch (error) {
      console.error('Error initializing theme:', error)
      // Fall back to blue theme
      currentThemeId.value = 'blue-theme'
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      updateDarkMode()
    }
  }

  function toggleDarkMode(): void {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('darkMode', isDarkMode.value)
    updateDarkMode()
  }

  function updateDarkMode(): void {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function setArchetype(archetype: string | null): void {
    currentArchetype.value = archetype
  }

  // Add a function to get the theme for a specific archetype
  function getThemeForArchetype(archetypeSlug: string): string | null {
    if (!archetypeSlug || !loadedThemeData.value) return null

    // Convert to lowercase and remove any special characters
    const normalizedSlug = archetypeSlug.toLowerCase().replace(/[^a-z0-9]/g, '')

    // Get the theme from the archetype mapping
    return archetypeThemeMap.value[normalizedSlug] || null
  }

  // Initialize theme data when the store is created
  onMounted(() => {
    initializeTheme()
  })

  return {
    // State
    isDarkMode,
    currentArchetype,
    currentThemeId,
    // Getters
    currentTheme,
    // Actions
    initializeTheme,
    toggleDarkMode,
    setArchetype,
    // Utilities
    getThemeClasses,
    availableThemes,
    currentThemeObject,
    switchTheme,
    getThemeForArchetype
  }
})
