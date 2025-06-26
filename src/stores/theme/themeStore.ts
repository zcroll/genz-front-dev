import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDarkMode = ref(false)
  const currentArchetype = ref(null)

  // Watch for system dark mode changes
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  // Theme configurations with reactive dark mode
  const themeConfig = computed(() => ({
    // Basic theme - Default gray
    'basic-theme': {
      primary: 'gray',
      accent: 'slate',
      base: isDarkMode.value ? {
        from: 'dark:from-gray-900',
        via: 'dark:via-gray-800',
        to: 'dark:to-gray-700'
      } : {
        from: 'from-gray-100',
        via: 'via-white',
        to: 'to-gray-50'
      },
      button: isDarkMode.value ? 'gray-700' : 'gray-500',
      hover: isDarkMode.value ? 'gray-800' : 'gray-600',
      border: isDarkMode.value ? 'gray-900' : 'gray-200',
      ring: isDarkMode.value ? 'gray-800' : 'gray-100',
      background: isDarkMode.value ? {
        light: 'dark:bg-gray-800',
        medium: 'dark:bg-gray-900',
        dark: 'dark:bg-gray-950'
      } : {
        light: 'bg-gray-50',
        medium: 'bg-gray-100',
        dark: 'bg-gray-500'
      }
    },
    'blue-theme': {
      primary: 'blue',
      accent: 'sky',
      base: isDarkMode.value ? {
        from: 'dark:from-blue-900', // Darker navy blue
        via: 'dark:via-blue-800',
        to: 'dark:to-blue-700'
      } : {
        from: 'from-blue-200', // Lighter baby blue
        via: 'via-blue-100',
        to: 'to-blue-50'
      },
      button: isDarkMode.value ? 'blue-800' : 'blue-400', // Adjusted for new colors
      hover: isDarkMode.value ? 'blue-900' : 'blue-500',
      border: isDarkMode.value ? 'blue-950' : 'blue-300',
      ring: isDarkMode.value ? 'blue-900' : 'blue-200',
      background: isDarkMode.value ? {
        light: 'dark:bg-blue-800',
        medium: 'dark:bg-blue-900',
        dark: 'dark:bg-blue-950'
      } : {
        light: 'bg-blue-100',
        medium: 'bg-blue-200',
        dark: 'bg-blue-400'
      }
    },
    // Success theme - Fresh green
    'green-theme': {
      primary: 'emerald',
      accent: 'teal',
      base: isDarkMode.value ? {
        from: 'dark:from-emerald-950',
        via: 'dark:via-gray-900',
        to: 'dark:to-emerald-900'
      } : {
        from: 'from-emerald-50',
        via: 'via-white',
        to: 'to-emerald-100'
      },
      button: isDarkMode.value ? 'emerald-600' : 'emerald-500',
      hover: isDarkMode.value ? 'emerald-700' : 'emerald-600',
      border: isDarkMode.value ? 'emerald-800' : 'emerald-200',
      ring: isDarkMode.value ? 'emerald-900' : 'emerald-100',
      background: isDarkMode.value ? {
        light: 'dark:bg-emerald-900',
        medium: 'dark:bg-emerald-800',
        dark: 'dark:bg-emerald-700'
      } : {
        light: 'bg-emerald-50',
        medium: 'bg-emerald-100',
        dark: 'bg-emerald-600'
      }
    },
    // Creative theme - Rich purple
    'purple-theme': {
      primary: 'violet',
      accent: 'purple',
      base: isDarkMode.value ? {
        from: 'dark:from-violet-950',
        via: 'dark:via-gray-900',
        to: 'dark:to-violet-900'
      } : {
        from: 'from-violet-50',
        via: 'via-white',
        to: 'to-violet-100'
      },
      button: isDarkMode.value ? 'violet-600' : 'violet-500',
      hover: isDarkMode.value ? 'violet-700' : 'violet-600',
      border: isDarkMode.value ? 'violet-800' : 'violet-200',
      ring: isDarkMode.value ? 'violet-900' : 'violet-100',
      background: isDarkMode.value ? {
        light: 'dark:bg-violet-900',
        medium: 'dark:bg-violet-800',
        dark: 'dark:bg-violet-700'
      } : {
        light: 'bg-violet-50',
        medium: 'bg-violet-100',
        dark: 'bg-violet-600'
      }
    },
    // Energy theme - Vibrant amber
    'amber-theme': {
      primary: 'amber',
      accent: 'orange',
      base: isDarkMode.value ? {
        from: 'dark:from-amber-950',
        via: 'dark:via-gray-900',
        to: 'dark:to-amber-900'
      } : {
        from: 'from-amber-50',
        via: 'via-white',
        to: 'to-amber-100'
      },
      button: isDarkMode.value ? 'amber-600' : 'amber-500',
      hover: isDarkMode.value ? 'amber-700' : 'amber-600',
      border: isDarkMode.value ? 'amber-800' : 'amber-200',
      ring: isDarkMode.value ? 'amber-900' : 'amber-100',
      background: isDarkMode.value ? {
        light: 'dark:bg-amber-900',
        medium: 'dark:bg-amber-800',
        dark: 'dark:bg-amber-700'
      } : {
        light: 'bg-amber-50',
        medium: 'bg-amber-100',
        dark: 'bg-amber-600'
      }
    }
  }))

  // Archetype to theme mapping based on 16personalities.com categories
  const archetypeThemeMap = {
    // Blue theme archetypes - Sentinels (Practical and grounded)
    'Caregiver': 'blue',
    'Guardian': 'blue',
    'Protector': 'blue',
    'Producer': 'blue',
    'Designer': 'blue',
    'Mentor': 'blue',
    'Scholar': 'blue',
    'Inventor': 'blue',

    // Green theme archetypes - Diplomats (Empathetic and cooperative)
    'Advocat': 'green',
    'Humanitarian': 'green',
    'Supporter': 'green',
    'Philosopher': 'green',
    'Anchor': 'green',
    'Captain': 'green',
    'Composer': 'green',
    'Kingpin': 'green',

    // Purple theme archetypes - Analysts (Strategic and logical)
    'Architect': 'purple',
    'Strategist': 'purple',
    'Mastermind': 'purple',
    'Researcher': 'purple',
    'Groundbreaker': 'purple',
    'Maverick': 'purple',
    'Visionary': 'purple',

    // Amber theme archetypes - Explorers (Versatile and practical)
    'Explorer': 'amber',
    'Builder': 'amber',
    'Enthusiast': 'amber',
    'Innovator': 'amber',
    'Luminary': 'amber',
    'Technician': 'amber',
    'Creator': 'amber'
  }

  // Getters
  const currentTheme = computed(() => {
    // Get theme based on current archetype, fallback to blue if no archetype
    if (!currentArchetype.value) {
      return themeConfig.value['blue-theme']
    }

    // Map the archetype to one of our four themes
    const themeId = archetypeThemeMap[currentArchetype.value] || 'blue'

    // Convert the theme ID to the theme key format used in themeConfig
    const themeKey = `${themeId}-theme`

    // If the theme doesn't exist in themeConfig, fall back to blue-theme
    return themeConfig.value[themeKey] || themeConfig.value['blue-theme']
  })

  // Theme utility functions
  function getThemeClasses(element) {
    const theme = currentTheme.value

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
      default:
        return ''
    }
  }

  // Add available themes array based on 16personalities.com categories
  const availableThemes = [
    {
      id: 'blue-theme',
      name: 'Blue (Sentinel)',
      category: 'sentinel',
      description: 'Practical and grounded',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    },
    {
      id: 'green-theme',
      name: 'Green (Diplomat)',
      category: 'diplomat',
      description: 'Empathetic and cooperative',
      icon: 'M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495'
    },
    {
      id: 'purple-theme',
      name: 'Purple (Analyst)',
      category: 'analyst',
      description: 'Strategic and logical',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
    },
    {
      id: 'amber-theme',
      name: 'Amber (Explorer)',
      category: 'explorer',
      description: 'Versatile and practical',
      icon: 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
    }
  ]

  // Add current theme ID ref
  const currentThemeId = ref('blue-theme')

  // Add computed for current theme object
  const currentThemeObject = computed(() => {
    return availableThemes.find(theme => theme.id === currentThemeId.value)
  })

  // Add function to switch themes
  function switchTheme(themeId) {
    // Make sure the theme ID includes '-theme' suffix
    const fullThemeId = themeId.endsWith('-theme') ? themeId : `${themeId}-theme`

    // Check if the theme exists in our available themes
    const themeExists = availableThemes.some(theme => theme.id === fullThemeId)

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
  function initializeTheme() {
    try {
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
      if (savedTheme) {
        // Use saved theme if available
        themeId = savedTheme
      } else if (userArchetype && archetypeThemeMap[userArchetype]) {
        // Map archetype to theme
        const baseTheme = archetypeThemeMap[userArchetype]
        themeId = `${baseTheme}-theme`
      } else {
        // Default to blue theme
        themeId = 'blue-theme'
      }

      console.log('Selected theme:', {
        archetype: currentArchetype.value,
        themeId: themeId,
        fromArchetype: userArchetype ? archetypeThemeMap[userArchetype] : null
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

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('darkMode', isDarkMode.value)
    updateDarkMode()
  }

  function updateDarkMode() {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function setArchetype(archetype) {
    currentArchetype.value = archetype
  }

  // Add a function to get the theme for a specific archetype
  function getThemeForArchetype(archetypeSlug) {
    if (!archetypeSlug) return null

    // Convert to lowercase and remove any special characters
    const normalizedSlug = archetypeSlug.toLowerCase().replace(/[^a-z0-9]/g, '')

    // Get the theme from the archetype mapping
    return archetypeThemeMap[normalizedSlug] || null
  }

  return {
    // State
    isDarkMode,
    currentArchetype,
    // Getters
    currentTheme,
    // Actions
    initializeTheme,
    toggleDarkMode,
    setArchetype,
    // Utilities
    getThemeClasses,
    availableThemes,
    currentThemeId,
    currentThemeObject,
    switchTheme,
    getThemeForArchetype
  }
})
