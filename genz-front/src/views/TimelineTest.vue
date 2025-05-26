<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Timeline Component Test</h1>
    
    <div class="flex justify-end mb-4">
      <button 
        @click="toggleDarkMode" 
        class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200"
      >
        Toggle Dark Mode
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <h4 class="font-semibold text-gray-800 dark:text-gray-200">Premier University Track</h4>
        </div>
        <div class="p-4">
          <CareerTimelineComponent 
            pathway-id="P1" 
            :progression-data="progressionData"
            theme-color="indigo"
          />
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <h4 class="font-semibold text-gray-800 dark:text-gray-200">Alternative University Track</h4>
        </div>
        <div class="p-4">
          <CareerTimelineComponent 
            pathway-id="P2" 
            :progression-data="progressionData"
            theme-color="blue"
          />
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <h4 class="font-semibold text-gray-800 dark:text-gray-200">Vocational Excellence Track</h4>
        </div>
        <div class="p-4">
          <CareerTimelineComponent 
            pathway-id="P3" 
            :progression-data="progressionData"
            theme-color="green"
          />
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <h4 class="font-semibold text-gray-800 dark:text-gray-200">Emerging Alternative Path</h4>
        </div>
        <div class="p-4">
          <CareerTimelineComponent 
            pathway-id="P4" 
            :progression-data="progressionData"
            theme-color="purple"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CareerTimelineComponent from '@/components/Careers/Detail/CareerTimelineComponent.vue';

// Toggle dark mode function
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark');
};

// Sample progression data
const progressionData = ref([
  {
    "from_pathway_id": "P1",
    "typical_progression": [
      "Junior Audio Engineer",
      "Audio Engineer",
      "Senior Audio Engineer/Sound Designer/Project Manager",
      "Studio Manager/Technical Director"
    ]
  },
  {
    "from_pathway_id": "P2",
    "typical_progression": [
      "Assistant Sound Technician",
      "Sound Technician",
      "Audio Editor/Mixing Engineer",
      "Freelance Audio Engineer"
    ]
  },
  {
    "from_pathway_id": "P3",
    "typical_progression": [
      "Sound Assistant",
      "Stagehand/Sound Technician",
      "Entry-level positions in broadcast or live events"
    ]
  },
  {
    "from_pathway_id": "P4",
    "typical_progression": [
      "Freelance Audio Editor (entry-level)",
      "Remote Sound Technician (entry-level)",
      "Content Creator (audio focused)"
    ]
  }
]);
</script>

<style>
/* Add any additional styles here */
</style>
