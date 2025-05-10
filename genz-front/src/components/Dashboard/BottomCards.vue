<template>
  <div class="grid gap-4" :class="[
    isMobile ? 'grid-cols-1 relative z-10' : 'md:grid-cols-2 lg:grid-cols-3'
  ]">
    <!-- Favorite Jobs Card -->
    <div class="unlock-card group"
         :style="{ '--delay': '200ms' }">
      <Card variant="frosted" class="relative overflow-hidden transition-all duration-300 hover:shadow-xl"
           @click="toggleCard('complete')"
           @mouseenter="!isMobile && (activeCard = 'complete')"
           @mouseleave="!isMobile && (activeCard = null)"
      >
        <!-- Background Gradient -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

        <CardContent class="p-0">
          <div class="relative flex items-start space-x-4">
            <!-- Icon -->
          <div :class="[
            'w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110',
            `bg-${safeTheme.primary}-100 dark:bg-${safeTheme.primary}-900/50`
          ]">
            <ArrowRight :class="[`text-${safeTheme.primary}-600 dark:text-${safeTheme.primary}-400`, 'w-6 h-6']" />
          </div>

          <!-- Content -->
          <div class="flex-1 space-y-1">
            <h3 class="font-semibold flex items-center" :style="{ color: 'var(--text-primary)' }">
              Favorite Jobs
              <span :class="[
                `bg-${safeTheme.primary}-100/30 ml-2`,
                `text-${safeTheme.primary}-600`,
                'text-xs px-2 py-0.5 rounded-full'
              ]">{{ favoriteJobs.length }}</span>
            </h3>
            <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">Your saved career opportunities</p>

            <!-- Expandable content -->
            <div class="pt-2 overflow-hidden transition-all duration-300"
              :class="{ 'max-h-[200px]': activeCard === 'complete', 'max-h-0': activeCard !== 'complete' }">
              <div class="max-h-[140px] overflow-y-auto custom-scrollbar pr-2">
                <RouterLink v-for="(job, index) in favoriteJobs"
                      :key="job.id"
                      :to="`/career/${job.slug}`"
                      class="flex items-center gap-1.5 p-1.5 rounded-lg mb-1 group/job transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      :class="[`focus:ring-${safeTheme.primary}-500`, { 'translate-x-0 opacity-100': activeCard === 'complete', 'translate-x-4 opacity-0': activeCard !== 'complete' }]"
                      :style="{
                        transitionDelay: `${index * 50}ms`,
                        backgroundColor: themeStore.isDarkMode ? 'rgba(40, 40, 40, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(8px)',
                        ':hover': { backgroundColor: themeStore.isDarkMode ? 'rgba(50, 50, 50, 0.7)' : 'rgba(255, 255, 255, 0.7)' }
                      }"
                >
                  <div class="w-6 md:w-7 h-6 md:h-7 rounded-lg overflow-hidden bg-white/50 p-1.5 backdrop-blur-sm">
                    <img :src="job.image" :alt="job.name" class="w-full h-full object-contain filter contrast-125" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-xs md:text-sm font-medium truncate" :style="{ color: 'var(--text-primary)' }">{{ job.name }}</h4>
                  </div>
                  <ArrowRight :class="[
                    `text-${safeTheme.primary}-600`,
                    'w-3 md:w-3.5 h-3 md:h-3.5 transform group-hover/job:translate-x-0.5 transition-transform'
                  ]" />
                </RouterLink>
              </div>
            </div>
          </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Favorite Degrees Card -->
    <div class="unlock-card group"
         :style="{ '--delay': '400ms' }">
      <Card variant="frosted" class="relative overflow-hidden transition-all duration-300 hover:shadow-xl"
           @click="toggleCard('degrees')"
           @mouseenter="!isMobile && (activeCard = 'degrees')"
           @mouseleave="!isMobile && (activeCard = null)"
      >
        <!-- Background Gradient -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

        <CardContent class="p-0">
          <div class="relative flex items-start space-x-4">
            <!-- Icon -->
          <div :class="[
            'w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110',
            `bg-purple-100 dark:bg-purple-900/50`
          ]">
            <ArrowRight :class="['text-purple-600 dark:text-purple-400', 'w-6 h-6']" />
          </div>

          <!-- Content -->
          <div class="flex-1 space-y-1">
            <h3 class="font-semibold flex items-center" :style="{ color: 'var(--text-primary)' }">
              Favorite Degrees
              <span :class="[
                `bg-${safeTheme.primary}-100/30 ml-2`,
                `text-${safeTheme.primary}-600`,
                'text-xs px-2 py-0.5 rounded-full'
              ]">{{ favoriteDegrees.length }}</span>
            </h3>
            <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">Your saved educational paths</p>

            <!-- Expandable content -->
            <div class="pt-2 overflow-hidden transition-all duration-300"
              :class="{ 'max-h-[200px]': activeCard === 'degrees', 'max-h-0': activeCard !== 'degrees' }">
              <div class="max-h-[140px] overflow-y-auto custom-scrollbar pr-2">
                <RouterLink v-for="(degree, index) in favoriteDegrees"
                      :key="degree.id"
                      :to="`/degree/${degree.slug}`"
                      class="flex items-center gap-1.5 p-1.5 rounded-lg mb-1 group/degree transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      :class="[`focus:ring-${safeTheme.primary}-500`, { 'translate-x-0 opacity-100': activeCard === 'degrees', 'translate-x-4 opacity-0': activeCard !== 'degrees' }]"
                      :style="{
                        transitionDelay: `${index * 50}ms`,
                        backgroundColor: themeStore.isDarkMode ? 'rgba(40, 40, 40, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(8px)',
                        ':hover': { backgroundColor: themeStore.isDarkMode ? 'rgba(50, 50, 50, 0.7)' : 'rgba(255, 255, 255, 0.7)' }
                      }"
                >
                  <div class="w-6 md:w-7 h-6 md:h-7 rounded-lg overflow-hidden bg-white/50 p-1.5 backdrop-blur-sm">
                    <img :src="degree.image" :alt="degree.name" class="w-full h-full object-contain filter contrast-125" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-xs md:text-sm font-medium truncate" :style="{ color: 'var(--text-primary)' }">{{ degree.name }}</h4>
                  </div>
                  <ArrowRight :class="[
                    `text-${safeTheme.primary}-600`,
                    'w-3 md:w-3.5 h-3 md:h-3.5 transform group-hover/degree:translate-x-0.5 transition-transform'
                  ]" />
                </RouterLink>
              </div>
            </div>
          </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Watch Card -->
    <div class="unlock-card group"
         :style="{ '--delay': '600ms' }">
      <Card variant="frosted" class="relative overflow-hidden transition-all duration-300 hover:shadow-xl"
           @click="toggleCard('watch')"
           @mouseenter="!isMobile && (activeCard = 'watch')"
           @mouseleave="!isMobile && (activeCard = null)"
      >
        <!-- Background Gradient -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

        <CardContent class="p-0">
          <div class="relative flex items-start space-x-4">
            <!-- Icon -->
          <div :class="[
            'w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110',
            `bg-blue-100 dark:bg-blue-900/50`
          ]">
            <Tv :class="['text-blue-600 dark:text-blue-400', 'w-6 h-6']" />
          </div>

          <!-- Content -->
          <div class="flex-1 space-y-1">
            <h3 class="font-semibold text-gray-900 dark:text-white flex items-center">
              Watch
              <span :class="[
                `bg-${safeTheme.primary}-100/30 ml-2`,
                `text-${safeTheme.primary}-600`,
                'text-xs px-2 py-0.5 rounded-full'
              ]">{{ streamingPlatforms.length }}</span>
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">Streaming platforms for your entertainment</p>

            <!-- Expandable content -->
            <div class="pt-2 overflow-hidden transition-all duration-300"
              :class="{ 'max-h-[200px]': activeCard === 'watch', 'max-h-0': activeCard !== 'watch' }">
              <div class="max-h-[140px] overflow-y-auto custom-scrollbar pr-2">
                <RouterLink v-for="(platform, index) in streamingPlatforms"
                      :key="platform.name"
                      :to="`/watch/${platform.name.toLowerCase()}`"
                      class="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/50 backdrop-blur-sm mb-1 group/platform hover:bg-white/70 active:bg-white/90 transition-all duration-200"
                      :style="{ transitionDelay: `${index * 50}ms` }"
                      :class="{ 'translate-x-0 opacity-100': activeCard === 'watch', 'translate-x-4 opacity-0': activeCard !== 'watch' }"
                >
                  <div class="w-6 md:w-7 h-6 md:h-7 rounded-lg overflow-hidden bg-white/50 p-1.5 backdrop-blur-sm">
                    <component :is="platform.icon" class="w-full h-full text-gray-700" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-xs md:text-sm font-medium text-gray-700 truncate">{{ platform.name }}</h4>
                  </div>
                  <ArrowRight :class="[
                    `text-${safeTheme.primary}-600`,
                    'w-3 md:w-3.5 h-3 md:h-3.5 transform group-hover/platform:translate-x-0.5 transition-transform'
                  ]" />
                </RouterLink>
              </div>
            </div>
          </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, Play, Tv, Monitor, Laptop } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme/themeStore'
import { Card, CardContent } from '@/components/ui/card'

const props = defineProps({
  favoriteJobs: {
    type: Array,
    required: true,
    default: () => []
  },
  favoriteDegrees: {
    type: Array,
    required: true,
    default: () => []
  },
  isMobile: {
    type: Boolean,
    default: false
  }
})

// Reactive state
const activeCard = ref(null)
const themeStore = useThemeStore()

// Safe theme access with fallbacks
const safeTheme = computed(() => {
  return themeStore.currentTheme || { primary: 'gray', button: 'gray-500' }
})

const streamingPlatforms = [
  { name: 'Crunchyroll', icon: Play },
  { name: 'Netflix', icon: Tv },
  { name: 'Funimation', icon: Monitor },
  { name: 'HIDIVE', icon: Laptop }
]

// Toggle card for mobile
const toggleCard = (cardName) => {
  if (props.isMobile) {
    if (activeCard.value === cardName) {
      activeCard.value = null
    } else {
      // Close any open card first
      activeCard.value = null
      // Then open the new card after a short delay
      setTimeout(() => {
        activeCard.value = cardName
      }, 50)
    }
  }
}
</script>

<style scoped>
.unlock-card {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
  animation-delay: var(--delay);
}

.unlock-card:hover {
  transform: translateY(-2px);
}

/* Enhanced card hover effects */
.unlock-card .group-hover\:scale-110 {
  transition-delay: 100ms;
}

.unlock-card .group-hover\:translate-x-\[200\%\] {
  transition-delay: 200ms;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Glass effect enhancement */
.backdrop-blur-sm {
  backdrop-filter: blur(8px) saturate(180%);
  -webkit-backdrop-filter: blur(8px) saturate(180%);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .unlock-card {
    margin-bottom: 0.75rem;
  }

  .group:active {
    transform: scale(0.98);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply rounded-full;
  background-color: v-bind('`rgb(var(--${safeTheme.primary}-rgb), 0.2)`');
}

@keyframes count-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-number {
  animation: count-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Touch-friendly scrolling */
@media (max-width: 768px) {
  .custom-scrollbar {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .custom-scrollbar::-webkit-scrollbar {
    display: none;
  }
}
</style>
