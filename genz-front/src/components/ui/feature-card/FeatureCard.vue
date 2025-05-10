<template>
  <div 
    class="relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg"
    :class="[
      isDarkMode ? 'bg-gray-800/70 text-white border border-gray-700/50' : 'bg-white text-gray-800 border border-gray-200',
      'backdrop-blur-sm'
    ]"
  >
    <!-- Card Content -->
    <div class="p-6">
      <!-- Title -->
      <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
      
      <!-- Description -->
      <p class="text-base mb-4" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'">
        {{ description }}
      </p>
      
      <!-- Visual Element -->
      <div class="mt-4">
        <!-- Stacked Cards Flow -->
        <div v-if="visualElement?.type === 'stacked_cards_flow'" class="flex items-center justify-center py-4">
          <div v-for="(card, index) in visualElement.elements" :key="index" 
               class="relative mx-[-10px] transition-all duration-300"
               :class="[
                 card.highlight === 'center_focus_orange' ? 'z-10 scale-110' : 'z-0',
                 index === 0 ? 'transform -rotate-6' : '',
                 index === 2 ? 'transform rotate-6' : ''
               ]">
            <div class="w-16 h-20 rounded-lg flex items-center justify-center"
                 :class="[
                   card.highlight === 'center_focus_orange' ? 
                     'bg-orange-500/20 border-2 border-orange-500/50' : 
                     'bg-gray-700/30 border border-gray-600/30'
                 ]">
              <span class="text-2xl" :class="card.highlight === 'center_focus_orange' ? 'text-orange-400' : 'text-gray-400'">
                🏠
              </span>
            </div>
          </div>
          <!-- Connector -->
          <div v-if="visualElement.connector" class="absolute w-full flex justify-center">
            <div class="border-t-2 border-dashed w-24 border-orange-500/70"></div>
          </div>
        </div>
        
        <!-- Bar Chart Simple -->
        <div v-else-if="visualElement?.type === 'bar_chart_simple'" class="flex items-end justify-center h-32 gap-3 py-4">
          <div v-for="(bar, index) in visualElement.bars" :key="index"
               class="w-8 rounded-t-md relative transition-all duration-300 hover:opacity-90"
               :class="[
                 bar.color_theme === 'orange_highlight' ? 'bg-orange-500' : 'bg-gray-700/50',
                 'h-' + Math.round(bar.height_ratio * 100) + '%'
               ]">
            <div v-if="bar.label" class="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div class="flex items-center">
                <span v-if="bar.label.icon === 'arrow_up_orange_small'" class="text-orange-500 mr-1">↑</span>
                <span class="text-sm font-medium text-orange-400">{{ bar.label.text }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Stylized Sphere with Tag -->
        <div v-else-if="visualElement?.type === 'stylized_sphere_with_tag'" class="flex justify-center py-4">
          <div class="relative">
            <!-- Sphere -->
            <div class="w-32 h-32 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden">
              <!-- Glow points -->
              <div v-for="(glow, index) in visualElement.sphere_details.glow_points" :key="index"
                   class="absolute w-12 h-12 rounded-full blur-md"
                   :class="[
                     glow.color === 'orange' ? 'bg-orange-500/50' : 'bg-gray-500/50',
                     glow.position === 'top_left' ? 'top-0 left-0' : '',
                     glow.position === 'bottom_right_inner' ? 'bottom-4 right-4' : ''
                   ]">
              </div>
              <!-- Texture -->
              <div class="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-full"></div>
            </div>
            
            <!-- Tag -->
            <div v-if="visualElement.tag" 
                 class="absolute -top-2 -left-2 px-3 py-1 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 text-white text-sm font-medium shadow-lg">
              <div class="flex items-center">
                <span class="mr-1">🏠</span>
                <span>{{ visualElement.tag.text }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Central Icon with Satellites -->
        <div v-else-if="visualElement?.type === 'central_icon_with_satellites'" class="flex justify-center py-4">
          <div class="relative">
            <!-- Central Icon -->
            <div class="w-20 h-20 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/30 flex items-center justify-center relative z-10">
              <div class="absolute inset-0 rounded-xl blur-sm bg-orange-500/20"></div>
              <span class="text-3xl text-white">🏠</span>
            </div>
            
            <!-- Satellite Icons -->
            <div v-for="(satellite, index) in visualElement.satellite_icons" :key="index"
                 class="absolute w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center border border-gray-700/50"
                 :style="{
                   transform: `rotate(${satellite.position_angle}deg) translate(40px) rotate(-${satellite.position_angle}deg)`
                 }">
              <span class="text-lg" :class="satellite.icon.includes('orange') ? 'text-orange-400' : 'text-gray-400'">
                {{ satellite.icon.includes('person') ? '👤' : 
                   satellite.icon.includes('lightning') ? '⚡' : 
                   satellite.icon.includes('search') ? '🔍' : '⚙️' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useThemeStore } from '@/stores/theme/themeStore';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  visualElement: {
    type: Object,
    default: () => ({})
  },
  styleHints: {
    type: Object,
    default: () => ({
      background_color: 'dark_gray_transparent',
      text_color: 'white',
      corner_radius: 'medium'
    })
  }
});

const themeStore = useThemeStore();
const isDarkMode = computed(() => themeStore.isDarkMode);
</script>

<style scoped>
/* Additional styling if needed */
</style>
