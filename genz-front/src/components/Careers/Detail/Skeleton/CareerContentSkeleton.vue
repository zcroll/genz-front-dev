<template>
  <div class="animate-pulse space-y-6">
    <!-- Title skeleton -->
    <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-2"></div>
    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
    
    <!-- Content paragraphs -->
    <div class="space-y-3 mt-6">
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
    </div>
    
    <!-- List items -->
    <div class="space-y-2 mt-4">
      <div class="flex items-center">
        <div class="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
      </div>
      <div class="flex items-center">
        <div class="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/5"></div>
      </div>
      <div class="flex items-center">
        <div class="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
    
    <!-- Card/Section grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div class="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      <div class="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>
    
    <!-- Extra section -->
    <div class="mt-6">
      <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3"></div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Pure presentation component - no props or logic needed
</script>