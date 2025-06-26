<template>
  <div class="smooth-scroll-demo">
    <div class="controls-container">
      <h3 class="text-lg font-semibold mb-4">Smooth Scroll Demo</h3>
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="section in sections" 
          :key="section.id"
          @click="scrollToSection(section.id)"
          class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          :class="[
            themeStore.isDarkMode 
              ? `bg-${themeStore.color}-800 hover:bg-${themeStore.color}-700 text-white` 
              : `bg-${themeStore.color}-100 hover:bg-${themeStore.color}-200 text-${themeStore.color}-800`
          ]"
        >
          {{ section.name }}
        </button>
        <button 
          @click="scrollToTop()"
          class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          :class="[
            themeStore.isDarkMode 
              ? `bg-${themeStore.color}-800 hover:bg-${themeStore.color}-700 text-white` 
              : `bg-${themeStore.color}-100 hover:bg-${themeStore.color}-200 text-${themeStore.color}-800`
          ]"
        >
          Back to Top
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { scrollToElement, scrollToTop as scrollToTopUtil } from '@/utils/scroll'

const themeStore = useThemeStore()

const sections = [
  { id: 'section1', name: 'Section 1' },
  { id: 'section2', name: 'Section 2' },
  { id: 'section3', name: 'Section 3' },
  { id: 'section4', name: 'Section 4' },
]

const scrollToSection = (sectionId: string) => {
  scrollToElement(sectionId, 80)
}

const scrollToTop = () => {
  scrollToTopUtil()
}
</script>

<style scoped>
.smooth-scroll-demo {
  position: sticky;
  top: 1rem;
  z-index: 10;
}

.controls-container {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

:deep(.dark) .controls-container {
  background-color: rgba(30, 30, 30, 0.8);
}
</style>
