<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/theme/themeStore'

const themeStore = useThemeStore()

// Toggle dark mode function
const toggleDarkMode = () => {
  themeStore.toggleDarkMode()
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
    <!-- Default Card -->
    <Card>
      <CardHeader>
        <CardTitle>Default Card</CardTitle>
        <CardDescription>Using the default shadcn styling</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card uses the default shadcn styling with no custom theme variables.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Learn More</Button>
      </CardFooter>
    </Card>

    <!-- Themed Card -->
    <Card variant="themed">
      <CardHeader variant="themed">
        <CardTitle>Themed Card</CardTitle>
        <CardDescription>Using the themed variant</CardDescription>
      </CardHeader>
      <CardContent variant="themed">
        <p>This card uses the themed variant which applies theme-specific colors.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Learn More</Button>
      </CardFooter>
    </Card>

    <!-- Frosted Card -->
    <Card variant="frosted" padding="large">
      <CardHeader variant="frosted" padding="none">
        <CardTitle variant="frosted" size="large">Frosted Card</CardTitle>
        <CardDescription variant="frosted">Using global theme variables</CardDescription>
      </CardHeader>
      <CardContent variant="frosted" padding="none">
        <p>This card uses the frosted glass effect with global theme variables. It adapts to both light and dark modes automatically.</p>
      </CardContent>
      <CardFooter variant="frosted" padding="none" class="mt-4">
        <Button>Primary Action</Button>
        <Button variant="outline" class="ml-2">Secondary Action</Button>
      </CardFooter>
    </Card>

    <!-- Today's Meeting Card (Frosted) -->
    <Card variant="frosted" padding="large">
      <CardHeader variant="frosted" padding="none">
        <CardTitle variant="frosted" size="large">Today's Meeting</CardTitle>
        <CardDescription variant="frosted">10:00 AM - 11:30 AM</CardDescription>
      </CardHeader>
      <CardContent variant="frosted" padding="none">
        <p>Weekly team sync to discuss project progress and upcoming milestones. Don't forget to prepare your status update.</p>
      </CardContent>
      <CardFooter variant="frosted" padding="none" class="mt-4 justify-between">
        <div class="flex items-center text-sm">
          <span>5 participants</span>
        </div>
        <Button>Join Meeting</Button>
      </CardFooter>
    </Card>
  </div>

  <!-- Dark Mode Toggle -->
  <div class="flex justify-center mt-6">
    <Button @click="toggleDarkMode">
      {{ themeStore.isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
    </Button>
  </div>
</template>
