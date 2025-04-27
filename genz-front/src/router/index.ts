import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Define routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Home',
      allowAll: true // This route is accessible to both authenticated and non-authenticated users
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/Test.vue'),
    meta: {
      title: 'Take a Test'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'Login',
      guest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: 'Register',
      guest: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      title: 'Dashboard',
      requiresAuth: true
    }
  },
  {
    path: '/jobs',
    name: 'jobs.index',
    component: () => import('../views/Jobs.vue'),
    meta: {
      title: 'Jobs',
      requiresAuth: true
    }
  },
  {
    path: '/degrees',
    name: 'degrees.index',
    component: () => import('../views/Degrees.vue'),
    meta: {
      title: 'Degrees',
      requiresAuth: true
    }
  },
  {
    path: '/careers',
    name: 'careers.index',
    component: () => import('../views/Careers.vue'),
    meta: {
      title: 'Careers',
      requiresAuth: true
    }
  },
  {
    path: '/careers/:slug',
    name: 'career-details',
    component: () => import('../views/CareerDetails.vue'),
    meta: {
      title: 'Career Details',
      requiresAuth: true
    }
  },
  {
    path: '/formations',
    name: 'formations.index',
    component: () => import('../views/Formations.vue'),
    meta: {
      title: 'Formations',
      requiresAuth: true
    }
  },
  {
    path: '/results',
    name: 'results',
    component: () => import('../views/Results.vue'),
    meta: {
      title: 'Results',
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // Lazy-loaded route
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About'
    }
  },

  // Catch-all route for 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '404 Not Found'
    }
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Scroll to top on navigation
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Import the user store
import { useUserStore } from '@/stores/user'

// Global navigation guard for authentication and page titles
router.beforeEach(async (to, from, next) => {
  // Set page title based on route meta
  document.title = `GenZ - ${to.meta.title || 'App'}`

  // Check if the route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isGuestOnly = to.matched.some(record => record.meta.guest)
  const allowAll = to.matched.some(record => record.meta.allowAll)

  // Get the user store
  const userStore = useUserStore()

  // Initialize the user store if not already initialized
  if (!userStore.initialized) {
    await userStore.init()
    userStore.initialized = true
  }

  // Check if user is logged in
  const isLoggedIn = userStore.isLoggedIn

  if (requiresAuth && !isLoggedIn) {
    // If route requires auth and user is not logged in, redirect to login
    next({ name: 'login' })
  } else if (isGuestOnly && isLoggedIn) {
    // If route is for guests only and user is logged in, redirect to dashboard
    next({ name: 'dashboard' })
  } else if (to.name === 'home' && isLoggedIn && !allowAll) {
    // If user is logged in and trying to access home, redirect to dashboard
    // unless the route is explicitly marked as allowAll
    next({ name: 'dashboard' })
  } else {
    // Otherwise proceed as normal
    next()
  }
})

export default router
