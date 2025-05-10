<script setup lang="ts">
import GlobalThemeCard from '@/components/examples/GlobalThemeCard.vue'
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6" :style="{ color: 'var(--text-primary)' }">Global Theme Examples</h1>
    <p class="mb-8" :style="{ color: 'var(--text-secondary)' }">
      This page demonstrates the use of global theme variables with different card variants.
      The cards automatically adapt to light and dark modes.
    </p>
    
    <GlobalThemeCard />
  </div>
</template>
