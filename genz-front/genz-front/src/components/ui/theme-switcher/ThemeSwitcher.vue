<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Icon } from '@/components/ui/icon'
import { useThemeStore } from '@/stores/theme/themeStore'

const themeStore = useThemeStore()
const isOpen = ref(false)

const selectedTheme = computed(() => {
  return themeStore.availableThemes.find(theme => theme.id === themeStore.currentThemeId) || 
         (themeStore.availableThemes.length > 0 ? themeStore.availableThemes[0] : null)
})

function setTheme(themeId: string) {
  themeStore.switchTheme(themeId)
  isOpen.value = false
}
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        size="icon"
        class="h-9 w-9 rounded-full"
        :class="selectedTheme ? `theme-border-${selectedTheme.id.replace('-theme', '')}` : ''"
      >
        <Icon v-if="selectedTheme" :path="selectedTheme.icon" class="h-5 w-5 theme-color" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-72 p-4">
      <h3 class="text-sm font-medium mb-3">Personality Type Themes</h3>
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="theme in themeStore.availableThemes"
          :key="theme.id"
          class="flex flex-col items-center"
        >
          <Button
            variant="outline"
            size="icon"
            class="h-12 w-12 rounded-full mb-1"
            :class="[
              { 'ring-2 ring-offset-2': selectedTheme && theme.id === selectedTheme.id },
              `theme-border-${theme.id.replace('-theme', '')}`
            ]"
            @click="setTheme(theme.id)"
          >
            <Icon :path="theme.icon" class="h-6 w-6" :class="`text-${theme.id.replace('-theme', '')}-500`" />
          </Button>
          <span class="text-xs font-medium">{{ theme.name }}</span>
          <span class="text-xs text-muted-foreground">{{ theme.category }}</span>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
