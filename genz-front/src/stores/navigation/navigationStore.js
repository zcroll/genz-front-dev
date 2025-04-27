import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const useNavigationStore = defineStore('navigation', () => {
  const route = useRoute()

  // Get current path from Vue Router
  const currentPath = computed(() => route.path)
  const currentName = computed(() => route.name)

  // Navigation items with their paths and components
  const navigationMappings = {
    'home': {
      path: '/',
      component: 'Home'
    },
    'login': {
      path: '/login',
      component: 'Login'
    },
    'register': {
      path: '/register',
      component: 'Register'
    },
    'dashboard': {
      path: '/dashboard',
      component: 'Dashboard'
    },
    'jobs.index': {
      path: '/jobs',
      component: 'Jobs'
    },
    'degrees.index': {
      path: '/degrees',
      component: 'Degrees'
    },
    'formations.index': {
      path: '/formations',
      component: 'Formations'
    },
    'results': {
      path: '/results',
      component: 'Results'
    }
  }

  // Check if route is active using Vue Router
  function isRouteActive(routeName) {
    if (!routeName || !navigationMappings[routeName]) return false

    const mapping = navigationMappings[routeName]
    const path = mapping.path

    // Check if current path starts with the route path
    return currentPath.value.startsWith(path)
  }

  return {
    currentPath,
    currentName,
    navigationMappings,
    isRouteActive
  }
}) 
