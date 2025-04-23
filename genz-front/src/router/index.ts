import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Define routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: '/jobs',
    name: 'jobs.index',
    component: () => import('../views/Jobs.vue'),
    meta: {
      title: 'Jobs'
    }
  },
  {
    path: '/degrees',
    name: 'degrees.index',
    component: () => import('../views/Degrees.vue'),
    meta: {
      title: 'Degrees'
    }
  },
  {
    path: '/formations',
    name: 'formations.index',
    component: () => import('../views/Formations.vue'),
    meta: {
      title: 'Formations'
    }
  },
  {
    path: '/results',
    name: 'results',
    component: () => import('../views/Results.vue'),
    meta: {
      title: 'Results'
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

// Global navigation guard for page titles
router.beforeEach((to, from, next) => {
  // Set page title based on route meta
  document.title = `GenZ - ${to.meta.title || 'App'}`
  next()
})

export default router
