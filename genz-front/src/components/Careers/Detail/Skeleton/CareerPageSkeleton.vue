<template>
  <div class="animate-pulse">
    <!-- Breadcrumb skeleton -->
    <div class="mb-6 flex items-center space-x-2">
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
      <div class="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      <div class="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
    </div>
    
    <!-- Header skeleton -->
    <div class="mb-10">
      <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
      <div class="flex flex-col sm:flex-row sm:items-center gap-3">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      </div>
    </div>
    
    <!-- Main grid skeleton -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Sidebar skeleton -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <!-- Card header skeleton -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
              <div class="flex-1">
                <div class="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
              </div>
            </div>
          </div>
          
          <!-- Card content skeleton -->
          <div class="p-6">
            <div class="space-y-4">
              <!-- CTA skeleton -->
              <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full mb-3"></div>
                <div class="flex flex-col sm:flex-row gap-3">
                  <div class="h-10 bg-gray-200 dark:bg-gray-600 rounded w-full sm:w-1/2"></div>
                  <div class="h-10 bg-gray-200 dark:bg-gray-600 rounded w-full sm:w-1/2"></div>
                </div>
              </div>
              
              <!-- Stats skeleton -->
              <div class="space-y-3">
                <div class="flex justify-between items-center p-2">
                  <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
                  <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
                </div>
                <div class="flex justify-between items-center p-2">
                  <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
                  <div class="h-5 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main content area skeleton -->
      <div class="lg:col-span-2">
        <!-- Navigation tabs skeleton -->
        <div class="mb-8 border-b dark:border-gray-700">
          <div class="flex flex-wrap -mb-px">
            <div class="inline-block py-4 px-4 mr-2">
              <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
            <div class="inline-block py-4 px-4 mr-2">
              <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
            </div>
            <div class="inline-block py-4 px-4 mr-2">
              <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
            <div class="inline-block py-4 px-4 mr-2">
              <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>
          </div>
        </div>
        
        <!-- Content skeleton -->
        <div class="space-y-6">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Pure presentation component - no props or logic needed
</script>