<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { currentTheme, availableThemes } from '@/lib/theme-utils'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// Get the current theme object
const getCurrentThemeObject = () => {
  const themeId = currentTheme.value.endsWith('-theme')
    ? currentTheme.value
    : `${currentTheme.value}-theme`
  return availableThemes.find(t => t.id === themeId) || availableThemes[0]
}
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Personality Type Themes</h1>
      <div class="flex items-center gap-4">
        <ThemeSwitcher />
        <Button @click="themeStore.toggleDarkMode" variant="outline">
          {{ themeStore.isDarkMode ? 'Light Mode' : 'Dark Mode' }}
        </Button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-6">
        <div class="p-6 bg-card text-card-foreground rounded-lg border shadow-sm">
          <div class="flex items-center gap-3 mb-4">
            <div class="h-10 w-10 rounded-full flex items-center justify-center"
                 :class="`bg-${currentTheme.replace('-theme', '')}-500`">
              <span class="text-white font-bold">{{ getCurrentThemeObject().category?.[0]?.toUpperCase() }}</span>
            </div>
            <div>
              <h2 class="text-2xl font-semibold">{{ getCurrentThemeObject().name }} Theme</h2>
              <p class="text-muted-foreground">{{ getCurrentThemeObject().category }} personality type</p>
            </div>
          </div>
          <p class="text-muted-foreground mb-4">
            This page demonstrates the 16personalities.com-inspired theme system using shadcn-vue components.
          </p>
          <div class="flex flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        <div class="p-6 bg-muted text-muted-foreground rounded-lg">
          <h3 class="text-xl font-medium mb-2">Muted Card</h3>
          <p>This is a muted card with muted text.</p>
        </div>
      </div>

      <div class="space-y-6">
        <div class="p-6 bg-primary text-primary-foreground rounded-lg">
          <h3 class="text-xl font-medium mb-2">Primary Card</h3>
          <p>This is a primary card with primary foreground text.</p>
        </div>

        <div class="p-6 bg-secondary text-secondary-foreground rounded-lg">
          <h3 class="text-xl font-medium mb-2">Secondary Card</h3>
          <p>This is a secondary card with secondary foreground text.</p>
        </div>

        <div class="p-6 bg-accent text-accent-foreground rounded-lg">
          <h3 class="text-xl font-medium mb-2">Accent Card</h3>
          <p>This is an accent card with accent foreground text.</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div v-for="theme in availableThemes" :key="theme.id"
               class="p-4 rounded-lg border flex flex-col items-center justify-center"
               :class="`border-${theme.id.replace('-theme', '')}-500 bg-${theme.id.replace('-theme', '')}-50`">
            <div class="h-8 w-8 rounded-full mb-2 flex items-center justify-center"
                 :class="`bg-${theme.id.replace('-theme', '')}-500`">
              <span class="text-white font-bold text-xs">{{ theme.category?.[0]?.toUpperCase() }}</span>
            </div>
            <h4 class="font-medium text-sm">{{ theme.name }}</h4>
            <p class="text-xs text-center text-muted-foreground">{{ theme.category }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
