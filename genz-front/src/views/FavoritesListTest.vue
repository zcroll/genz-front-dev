<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8" :class="themeStore.isDarkMode ? 'text-white' : 'text-gray-900'">
      Favorites List Test
    </h1>
    
    <div class="mb-6 flex space-x-4">
      <button 
        @click="themeStore.toggleDarkMode()" 
        class="px-4 py-2 rounded-md"
        :class="themeStore.isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'"
      >
        Toggle Dark Mode
      </button>
      
      <button 
        @click="toggleFeatureCards()" 
        class="px-4 py-2 rounded-md"
        :class="[
          useFeatureCards ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-800',
          themeStore.isDarkMode ? 'hover:bg-orange-600' : 'hover:bg-orange-400'
        ]"
      >
        {{ useFeatureCards ? 'Disable Feature Cards' : 'Enable Feature Cards' }}
      </button>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <FavoritesList
        title="Favorite Careers"
        :items="favoriteItems"
        type="Career"
        empty-message="You haven't saved any careers yet."
        browse-message="Browse Careers"
        browse-link="/careers"
        :use-feature-cards="useFeatureCards"
        @remove="removeItem"
      />
      
      <FavoritesList
        title="Favorite Degrees"
        :items="favoriteItems"
        type="Degree"
        empty-message="You haven't saved any degrees yet."
        browse-message="Browse Degrees"
        browse-link="/degrees"
        :use-feature-cards="useFeatureCards"
        @remove="removeItem"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useThemeStore } from '@/stores/theme/themeStore';
import FavoritesList from '@/components/Dashboard/FavoritesList.vue';

const themeStore = useThemeStore();
const useFeatureCards = ref(true);

// Sample favorite items
const favoriteItems = ref([
  { id: 1, name: 'Software Developer', slug: 'software-developer' },
  { id: 2, name: 'Data Scientist', slug: 'data-scientist' },
  { id: 3, name: 'UX Designer', slug: 'ux-designer' },
  { id: 4, name: 'Product Manager', slug: 'product-manager' }
]);

const toggleFeatureCards = () => {
  useFeatureCards.value = !useFeatureCards.value;
};

const removeItem = (id) => {
  favoriteItems.value = favoriteItems.value.filter(item => item.id !== id);
};
</script>
