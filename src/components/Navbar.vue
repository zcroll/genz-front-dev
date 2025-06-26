<template>
  <nav :class="[
    isMobile
      ? 'flex-row justify-around py-4 px-2 w-full'
      : 'flex-col items-center gap-5 pt-20'
  ]" class="flex">
    <RouterLink v-for="(item, index) in navigationItems" :key="item.route" :to="navigationStore.navigationMappings[item.route].path"
      class="nav-link group relative transition-all duration-300" :class="[
        isMobile
          ? 'flex flex-col items-center gap-1 py-1 px-3 rounded-xl hover:bg-white/10'
          : 'h-14 w-14 rounded-full flex items-center justify-center',
        { 'delay-100': index > 0 },
        { 'nav-active': navigationStore.isRouteActive(item.route) },
        navigationStore.isRouteActive(item.route)
          ? isMobile
            ? `text-${currentThemeColor}-500 bg-${currentThemeColor}-50/20 dark:bg-${currentThemeColor}-900/30`
            : [`bg-${currentThemeColor}-500`, 'shadow-lg']
          : isMobile
            ? 'text-gray-400'
            : ['bg-white/90 hover:bg-white/100 hover:scale-105 backdrop-blur-xl shadow-md']
      ]">
    <div class="relative z-10">
      <component :is="item.icon" class="nav-icon transition-all duration-300 ease-in-out" :class="[
        isMobile ? 'h-6 w-6' : 'h-7 w-7',
        navigationStore.isRouteActive(item.route)
          ? isMobile
            ? `text-${currentThemeColor}-600 dark:text-${currentThemeColor}-400`
            : 'text-white transform scale-110'
          : isMobile
            ? 'text-gray-400 group-hover:text-gray-300'
            : [`text-${currentThemeColor}-500`, `group-hover:text-${currentThemeColor}-600`]
      ]" />

      <!-- Navigation Label -->
      <span class="text-xs font-medium" v-if="isMobile" :class="[
        navigationStore.isRouteActive(item.route)
          ? `text-${currentThemeColor}-600 dark:text-${currentThemeColor}-400 font-semibold`
          : 'text-gray-400 group-hover:text-gray-300'
      ]">
        {{ item.name }}
      </span>
      <span v-if="!isMobile" class="nav-tooltip" :class="[
        navigationStore.isRouteActive(item.route)
          ? `text-${currentThemeColor}-600 dark:text-${currentThemeColor}-400 font-semibold`
          : `text-${currentThemeColor}-500`
      ]">
        {{ item.name }}
      </span>
    </div>

    <!-- Glass effect overlay -->
    <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" :class="[
      `bg-${currentThemeColor}-50/10`,
      isMobile ? 'rounded-xl' : 'rounded-full'
    ]" style="backdrop-filter: blur(8px);">
    </div>
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  BookOpenIcon
} from '@heroicons/vue/24/outline';
import { useThemeStore } from '@/stores/theme.js';
import { useNavigationStore } from '@/stores/navigation/navigationStore.js';
import { useUserStore } from '@/stores/user.js';
import { currentTheme, availableThemes } from '@/lib/theme-utils.js';

defineProps({
  isMobile: {
    type: Boolean,
    default: false
  }
});

// Get user store and router
const userStore = useUserStore();
const router = useRouter();

// Check if user is logged in
const isLoggedIn = computed(() => userStore.isLoggedIn);

// Redirect to login if not authenticated
onMounted(() => {
  if (!isLoggedIn.value) {
    router.push('/login');
  }
});

// Navigation items for authenticated users
const navigationItems = [
  { name: 'Dashboard', route: 'dashboard', icon: HomeIcon },
  { name: 'Results', route: 'results', icon: ClipboardDocumentListIcon },
  { name: 'Jobs', route: 'jobs.index', icon: BriefcaseIcon },
  { name: 'Careers', route: 'careers.index', icon: BriefcaseIcon },
  { name: 'Degrees', route: 'degrees.index', icon: AcademicCapIcon },
  { name: 'Formations', route: 'formations.index', icon: BookOpenIcon }
];

const themeStore = useThemeStore();
const navigationStore = useNavigationStore();

// Get the current theme color (blue, green, purple, amber)
const currentThemeColor = computed(() => {
  // Get theme from theme store or from theme-utils
  const themeId = themeStore.currentThemeId || currentTheme.value;
  // Remove '-theme' suffix if present
  return themeId.replace('-theme', '');
});

// Get the current theme object with name and category
const currentThemeObject = computed(() => {
  const themeId = currentThemeColor.value;
  // Find the theme object in availableThemes
  return availableThemes.find(theme => theme.id === themeId) ||
         themeStore.availableThemes.find(theme => theme.id === `${themeId}-theme`);
});
</script>

<style scoped>
.nav-link {
  position: relative;
  isolation: isolate;
  z-index: 1;
}

.nav-active {
  position: relative;
}

/* Desktop active state with pulsing effect */
@media (min-width: 768px) {
  .nav-active::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 9999px;
    z-index: -1;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    background: linear-gradient(45deg,
        var(--primary-translucent),
        var(--primary-translucent-light));
  }
}

/* Mobile active state with left border */
@media (max-width: 767px) {
  .nav-active::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 70%;
    border-radius: 4px;
    background: var(--primary-solid);
  }
}

/* Theme-specific variables */
.theme-blue .nav-active::before {
  --primary-translucent: rgba(37, 99, 235, 0.4);
  --primary-translucent-light: rgba(37, 99, 235, 0.2);
  --primary-solid: rgb(37, 99, 235);
}

.theme-green .nav-active::before {
  --primary-translucent: rgba(22, 163, 74, 0.4);
  --primary-translucent-light: rgba(22, 163, 74, 0.2);
  --primary-solid: rgb(22, 163, 74);
}

.theme-purple .nav-active::before {
  --primary-translucent: rgba(126, 34, 206, 0.4);
  --primary-translucent-light: rgba(126, 34, 206, 0.2);
  --primary-solid: rgb(126, 34, 206);
}

.theme-amber .nav-active::before {
  --primary-translucent: rgba(217, 119, 6, 0.4);
  --primary-translucent-light: rgba(217, 119, 6, 0.2);
  --primary-solid: rgb(217, 119, 6);
}

.nav-tooltip {
  position: absolute;
  left: calc(100% + 1rem);
  top: 50%;
  transform: translateY(-50%) translateX(-1rem);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 50;
}

.nav-link:hover .nav-tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}

/* Hover effect for icons */
.nav-link:hover {
  z-index: 10;
}

.nav-link:hover .nav-icon {
  transform: scale(1.1);
}

.nav-active .nav-icon {
  filter: drop-shadow(0 0 8px var(--primary-shadow));
}

/* Theme-specific shadow variables */
.theme-blue .nav-active .nav-icon {
  --primary-shadow: rgba(37, 99, 235, 0.3);
}

.theme-green .nav-active .nav-icon {
  --primary-shadow: rgba(22, 163, 74, 0.3);
}

.theme-purple .nav-active .nav-icon {
  --primary-shadow: rgba(126, 34, 206, 0.3);
}

.theme-amber .nav-active .nav-icon {
  --primary-shadow: rgba(217, 119, 6, 0.3);
}

/* Ensure icon stays above glass effect */
.nav-icon {
  position: relative;
  z-index: 2;
}
</style>
