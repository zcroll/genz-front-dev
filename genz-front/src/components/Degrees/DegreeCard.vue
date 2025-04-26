<template>
  <Card class="group relative backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1" :class="[
      themeStore.isDarkMode ? 'dark:bg-gray-800/40 border-gray-700' : 'bg-white/40 border-gray-200'
    ]">
    <CardContent class="p-4">
      <!-- Header with Image and Title -->
      <div class="flex items-start gap-3 mb-3">
        <div >
          <img :src="degree.image" :alt="`image for ${degree.name}`"
            class="w-full h-full object-contain filter contrast-125 transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div class="min-w-0">
          <h3 :class="[
            'text-base font-bold truncate',
            themeStore.isDarkMode ? 'text-white' : 'text-gray-900'
          ]">
            {{ degree.name }}
          </h3>
          <p :class="['text-sm truncate', themeClasses.accent]">{{ degree.type }}</p>
        </div>
      </div>

      <!-- Description -->
      <p :class="['text-sm line-clamp-2 mb-3 h-10', themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600']">{{ degree.description }}</p>

      <!-- Key Details -->
      <div class="grid grid-cols-2 gap-2 mb-3">
        <div class="flex items-center gap-1.5">
          <Clock :class="['w-4 h-4', themeStore.isDarkMode ? 'text-gray-500' : 'text-gray-400']" />
          <span :class="['text-sm', themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600']">{{ degreeDetails.duration }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <GraduationCap :class="['w-4 h-4', themeStore.isDarkMode ? 'text-gray-500' : 'text-gray-400']" />
          <span :class="['text-sm', themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600']">{{ degreeDetails.level }}</span>
        </div>
      </div>

      <!-- Action Button -->
      <RouterLink :to="`/degree/${degree.slug}`"
        class="inline-flex items-center justify-between w-full px-4 py-2 font-medium rounded-full transition-all duration-300 text-sm backdrop-blur-sm border"
        :class="[
          themeStore.isDarkMode
            ? [
              'bg-gray-800/60 text-white border-gray-700/20',
              `hover:bg-${themeStore.color}-800`
            ]
            : [
              'bg-white/60 text-gray-900 border-white/20 hover:text-white',
              `hover:bg-${themeStore.color}-400`
            ]
        ]">
      <span>Learn More</span>
      <ArrowRight :class="['w-4 h-4 transform group-hover:translate-x-1 transition-transform',
        themeStore.isDarkMode ? `text-${themeStore.color}-400` : `text-${themeStore.color}-500`]" />
      </RouterLink>
    </CardContent>
  </Card>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, GraduationCap } from 'lucide-vue-next';
import { useThemeStore } from '@/stores/theme';

const props = defineProps({
  degree: {
    type: Object,
    required: true
  }
});

const themeStore = useThemeStore();

const themeClasses = computed(() => ({
  text: themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600',
  accent: `text-${themeStore.color}-${themeStore.isDarkMode ? '400' : '500'}`
}));

const degreeDetails = computed(() => ({
  duration: props.degree.duration,
  level: props.degree.level
}));
</script>

<style scoped>
.grid>div {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
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
</style>
