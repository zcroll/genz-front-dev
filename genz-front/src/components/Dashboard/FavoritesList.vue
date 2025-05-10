<template>
  <div class="rounded-xl p-6 border transition-all duration-300"
       :class="[themeStore.isDarkMode ? 'bg-gray-800/70 border-gray-700/50 text-white' : 'bg-white border-gray-200 text-gray-900']">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold">{{ title }}</h2>
      <span class="px-4 py-2 rounded-full text-sm"
            :class="[themeStore.isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-600']">
        {{ items.length }}
      </span>
    </div>

    <!-- Feature Cards in Dark Mode -->
    <div v-if="items.length > 0 && themeStore.isDarkMode && useFeatureCards"
         class="max-h-[500px] overflow-y-auto custom-scrollbar">
      <FeatureCardGrid :cards="featureCards" />
    </div>

    <!-- Regular List in Light Mode or when feature cards are disabled -->
    <div v-else-if="items.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[200px] overflow-y-auto custom-scrollbar">
      <div v-for="item in items" :key="item.id"
        class="group rounded-xl p-4 transition-all duration-300"
        :class="[themeStore.isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-50 hover:bg-gray-100']">
        <RouterLink :to="generateItemLink(item)" class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-medium" :class="[themeStore.isDarkMode ? 'text-gray-100' : 'text-gray-900']">{{ item.name }}</h3>
            <p class="text-sm" :class="[themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-600']">{{ type }} Path</p>
          </div>
          <button @click.prevent="$emit('remove', item.id)"
            class="opacity-0 group-hover:opacity-100 p-2 rounded-full transition-all"
            :class="[themeStore.isDarkMode ? 'hover:bg-gray-500/50' : 'hover:bg-gray-200']">
            <svg class="w-5 h-5" :class="[themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-600']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </RouterLink>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-8 text-center">
      <slot name="empty-state">
        <svg class="w-16 h-16 mb-4" :class="[themeStore.isDarkMode ? 'text-gray-500' : 'text-gray-400']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <p :class="[themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-600']" class="mb-2">{{ emptyMessage }}</p>
        <RouterLink :to="browseLink" class="hover:text-amber-700 text-sm" :class="[themeStore.isDarkMode ? 'text-amber-500' : 'text-amber-600']">
          {{ browseMessage }} →
        </RouterLink>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { computed, ref } from 'vue';
import { useThemeStore } from '@/stores/theme/themeStore';
import { FeatureCardGrid } from '@/components/ui/feature-card';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    required: true
  },
  emptyMessage: {
    type: String,
    required: true
  },
  browseMessage: {
    type: String,
    required: true
  },
  browseLink: {
    type: String,
    required: true
  },
  useFeatureCards: {
    type: Boolean,
    default: true
  }
});

const themeStore = useThemeStore();

// Generate feature cards based on items
const featureCards = computed(() => {
  // Visual element types to cycle through
  const visualTypes = [
    {
      type: 'stacked_cards_flow',
      elements: [
        { type: 'card_silhouette', icon: 'house_outline_variant1', highlight: 'none' },
        { type: 'card_silhouette', icon: 'house_outline_variant2', highlight: 'center_focus_orange' },
        { type: 'card_silhouette', icon: 'house_with_details_orange', highlight: 'none' }
      ],
      connector: {
        type: 'dotted_arrow',
        color: 'orange',
        direction: 'right'
      }
    },
    {
      type: 'bar_chart_simple',
      bars: [
        { height_ratio: 0.3, color_theme: 'dark_translucent' },
        { height_ratio: 0.5, color_theme: 'dark_translucent' },
        { height_ratio: 0.9, color_theme: 'orange_highlight', label: { text: '+ 2K', icon: 'arrow_up_orange_small', position: 'top' } },
        { height_ratio: 0.6, color_theme: 'dark_translucent' },
        { height_ratio: 0.4, color_theme: 'dark_translucent' }
      ]
    },
    {
      type: 'stylized_sphere_with_tag',
      sphere_details: {
        texture: 'yin_yang_subtle_craters',
        glow_points: [
          { color: 'orange', position: 'top_left' },
          { color: 'orange', position: 'bottom_right_inner' }
        ]
      },
      tag: {
        text: 'BZ House',
        icon: 'house_simple_white',
        background_color: 'orange_gradient',
        position: 'top_left_of_sphere'
      }
    },
    {
      type: 'central_icon_with_satellites',
      central_icon: {
        shape: 'rounded_square',
        background_color: 'orange_gradient_subtle',
        icon: 'house_app_icon_white',
        glow_effect: 'soft_orange'
      },
      satellite_icons: [
        { icon: 'person_outline_dark', background_color: 'dark_translucent_circle', position_angle: 270 },
        { icon: 'lightning_bolt_orange', background_color: 'dark_translucent_circle', position_angle: 45 },
        { icon: 'search_dark', background_color: 'dark_translucent_circle', position_angle: 0 }
      ]
    }
  ];

  // Map items to feature cards
  return props.items.map((item, index) => {
    const visualType = visualTypes[index % visualTypes.length];

    return {
      id: item.id,
      title: item.name,
      description: `${props.type} Path with advanced features and detailed information.`,
      visual_element: visualType,
      style_hints: {
        background_color: 'dark_gray_transparent',
        text_color: 'white',
        corner_radius: 'medium'
      }
    };
  });
});

const generateItemLink = (item) => {
  return `/${props.type.toLowerCase()}/${item.slug}`;
};

defineEmits(['remove']);
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: theme('colors.gray.300') theme('colors.gray.100');
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: theme('colors.gray.100');
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: theme('colors.gray.300');
  border-radius: 3px;
}

:global(.dark) .custom-scrollbar {
  scrollbar-color: theme('colors.gray.600') theme('colors.gray.800');
}

:global(.dark) .custom-scrollbar::-webkit-scrollbar-track {
  background: theme('colors.gray.800');
}

:global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: theme('colors.gray.600');
}
</style>
