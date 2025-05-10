<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8" :class="themeStore.isDarkMode ? 'text-white' : 'text-gray-900'">
      Feature Card Test
    </h1>
    
    <div class="mb-6">
      <button 
        @click="themeStore.toggleDarkMode()" 
        class="px-4 py-2 rounded-md mb-4"
        :class="themeStore.isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'"
      >
        Toggle Dark Mode
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FeatureCard
        v-for="card in featureCards"
        :key="card.id"
        :title="card.title"
        :description="card.description"
        :visual-element="card.visual_element"
        :style-hints="card.style_hints"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useThemeStore } from '@/stores/theme/themeStore';
import { FeatureCard } from '@/components/ui/feature-card';

const themeStore = useThemeStore();

// Sample feature cards data
const featureCards = [
  {
    id: "comprehensive_listings",
    title: "Comprehensive Property Listings",
    description: "Effortlessly list or browse residential and commercial properties with detailed profiles, images, and virtual tours.",
    visual_element: {
      type: "stacked_cards_flow",
      elements: [
        { type: "card_silhouette", icon: "house_outline_variant1", highlight: "none" },
        { type: "card_silhouette", icon: "house_outline_variant2", highlight: "center_focus_orange" },
        { type: "card_silhouette", icon: "house_with_details_orange", highlight: "none" }
      ],
      connector: {
        type: "dotted_arrow",
        color: "orange",
        direction: "right"
      }
    },
    style_hints: {
      background_color: "dark_gray_transparent",
      text_color: "white",
      corner_radius: "medium"
    }
  },
  {
    id: "advanced_analytics",
    title: "Advanced Analytics",
    description: "Gain insights into property performance and more to make informed decisions fast.",
    visual_element: {
      type: "bar_chart_simple",
      bars: [
        { height_ratio: 0.3, color_theme: "dark_translucent" },
        { height_ratio: 0.5, color_theme: "dark_translucent" },
        { height_ratio: 0.9, color_theme: "orange_highlight", label: { text: "+ 2K", icon: "arrow_up_orange_small", position: "top" } },
        { height_ratio: 0.6, color_theme: "dark_translucent" },
        { height_ratio: 0.4, color_theme: "dark_translucent" }
      ]
    },
    style_hints: {
      background_color: "dark_gray_transparent",
      text_color: "white",
      corner_radius: "medium"
    }
  },
  {
    id: "marketplace_synergy",
    title: "Marketplace Synergy",
    description: "Seamlessly transition from managing to listing or selling properties within the same platform.",
    visual_element: {
      type: "stylized_sphere_with_tag",
      sphere_details: {
        texture: "yin_yang_subtle_craters",
        glow_points: [
          { color: "orange", position: "top_left" },
          { color: "orange", position: "bottom_right_inner" }
        ]
      },
      tag: {
        text: "BZ House",
        icon: "house_simple_white",
        background_color: "orange_gradient",
        position: "top_left_of_sphere"
      }
    },
    style_hints: {
      background_color: "dark_gray_transparent",
      text_color: "white",
      corner_radius: "medium"
    }
  },
  {
    id: "integrated_management",
    title: "Integrated Management Tools",
    description: "Manage all aspects of property ownership, from tenant screenings to maintenance requests, all in one place.",
    visual_element: {
      type: "central_icon_with_satellites",
      central_icon: {
        shape: "rounded_square",
        background_color: "orange_gradient_subtle",
        icon: "house_app_icon_white",
        glow_effect: "soft_orange"
      },
      satellite_icons: [
        { icon: "person_outline_dark", background_color: "dark_translucent_circle", position_angle: 270 },
        { icon: "lightning_bolt_orange", background_color: "dark_translucent_circle", position_angle: 45 },
        { icon: "search_dark", background_color: "dark_translucent_circle", position_angle: 0 }
      ]
    },
    style_hints: {
      background_color: "dark_gray_transparent",
      text_color: "white",
      corner_radius: "medium"
    }
  }
];
</script>
