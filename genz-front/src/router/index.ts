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
    component: () => import('../views/CareerDetails.vue'),
    meta: {
      title: 'Take a Test'
    }
  },
  {
    path: '/test-view',
    name: 'test-view',
    component: () => import('../views/TestView.vue'),
    meta: {
      title: 'Test View',
      allowAll: true // Make this accessible to all users
    }
  },
  {
    path: '/global-theme',
    name: 'global-theme',
    component: () => import('../views/GlobalThemeExampleView.vue'),
    meta: {
      title: 'Global Theme Examples',
      allowAll: true // Make this accessible to all users
    }
  },
  {
    path: '/simple-test',
    name: 'simple-test',
    component: () => import('../views/SimpleTest.vue'),
    meta: {
      title: 'Simple Test',
      guest: true // Use guest mode to bypass layouts
    }
  },
  {
    path: '/standalone-film-director',
    name: 'standalone-film-director',
    component: () => import('../views/StandaloneFilmDirector.vue'),
    meta: {
      title: 'Film Director Career (Standalone)',
      guest: true // Use guest mode to bypass layouts
    }
  },
  {
    path: '/career-detail',
    name: 'career-detail',
    component: () => import('../views/CareerDetailTailwind.vue'),
    meta: {
      title: 'Film Director Career',
      allowAll: true, // Make this accessible to all users
      layout: 'main' // Use main layout
    }
  },
  {
    path: '/film-director',
    name: 'film-director',
    component: () => import('../views/FilmDirectorCareer.vue'),
    meta: {
      title: 'Film Director',
      guest: true // Use guest mode to bypass layouts
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
    component: () => import('../views/CareerDetails.vue'),
    meta: {
      title: 'Career Details',
      requiresAuth: true,
      breadcrumb: {
        label: 'Career Details',
        icon: 'LucideUser'
      }
    },
    children: [
      {
        path: '',
        name: 'career-details',
        redirect: { name: 'career-overview' }
      },
      {
        path: 'overview',
        name: 'career-overview',
        component: () => import('../views/CareerDetails.vue'),
        meta: {
          title: 'Career Overview',
          requiresAuth: true,
          section: 'overview',
          breadcrumb: {
            label: 'Overview',
            icon: 'LucideUser'
          }
        }
      },
      {
        path: 'how-to-become',
        name: 'career-how-to-become',
        component: () => import('../views/CareerDetails.vue'),
        meta: {
          title: 'How to Become',
          requiresAuth: true,
          section: 'how-to-become',
          breadcrumb: {
            label: 'How to Become',
            icon: 'LucideGraduationCap'
          }
        }
      },
      {
        path: 'personality',
        name: 'career-personality',
        component: () => import('../views/CareerDetails.vue'),
        meta: {
          title: 'Personality',
          requiresAuth: true,
          section: 'personality',
          breadcrumb: {
            label: 'Personality',
            icon: 'LucideHeart'
          }
        }
      },
      {
        path: 'work-environment',
        name: 'career-work-environment',
        component: () => import('../views/CareerDetails.vue'),
        meta: {
          title: 'Work Environment',
          requiresAuth: true,
          section: 'work-environment',
          breadcrumb: {
            label: 'Work Environment',
            icon: 'LucideBuilding2'
          }
        }
      },
      {
        path: 'tech-skills',
        name: 'career-tech-skills',
        component: () => import('../views/CareerDetails.vue'),
        meta: {
          title: 'Tech Skills',
          requiresAuth: true,
          section: 'tech-skills',
          breadcrumb: {
            label: 'Tech Skills',
            icon: 'LucideCode'
          }
        }
      }
    ]
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
  {
    path: '/theme-test',
    name: 'theme-test',
    component: () => import('../views/ThemeTest.vue'),
    meta: {
      title: 'Theme Test',
      allowAll: true
    }
  },
  {
    path: '/career-how-to-become-test',
    name: 'career-how-to-become-test',
    component: () => import('../views/CareerHowToBecomeTest.vue'),
    meta: {
      title: 'Career How To Become Test',
      allowAll: true
    }
  },
  {
    path: '/feature-card-test',
    name: 'feature-card-test',
    component: () => import('../views/FeatureCardTest.vue'),
    meta: {
      title: 'Feature Card Test',
      allowAll: true
    }
  },
  {
    path: '/favorites-list-test',
    name: 'favorites-list-test',
    component: () => import('../views/FavoritesListTest.vue'),
    meta: {
      title: 'Favorites List Test',
      allowAll: true
    }
  },
  {
    path: '/timeline-test',
    name: 'timeline-test',
    component: () => import('../views/TimelineTest.vue'),
    meta: {
      title: 'Timeline Component Test',
      allowAll: true
    }
  },
  {
    path: '/career-constellation',
    name: 'career-constellation',
    component: () => import('../views/CareerConstellationView.vue'),
    meta: {
      title: 'Career Constellation View',
      allowAll: true
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
  if (to.name && to.name.toString().startsWith('career-') && to.name !== 'career-details' && to.params.slug) {
    // For career detail pages, include the career slug in the title
    document.title = `GenZ - ${to.meta.title || 'Career'} | ${to.params.slug}`;
  } else {
    document.title = `GenZ - ${to.meta.title || 'App'}`;
  }

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
