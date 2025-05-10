<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <FeatureCard
      v-for="card in cards"
      :key="card.id"
      :title="card.title"
      :description="card.description"
      :visual-element="card.visual_element"
      :style-hints="card.style_hints"
    />
  </div>
</template>

<script setup>
import FeatureCard from './FeatureCard.vue';

const props = defineProps({
  cards: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>
