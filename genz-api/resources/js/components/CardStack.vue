<script setup>
import { ref, onMounted } from 'vue';
import { animate, stagger } from 'motion';

const props = defineProps({
  cards: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['select-card']);

// Reference to the card elements for animation
const cardRefs = ref([]);

// Handle card selection
const handleCardClick = (card, index) => {
  if (isAnimating.value) return;

  emit('select-card', {
    cardId: card.id,
    element: cardRefs.value[index]
  });
};

// Track animation state
const isAnimating = ref(false);

// Run entrance animation when component mounts
onMounted(() => {
  runEntranceAnimation();
});

// Animate cards appearing in the stack
const runEntranceAnimation = async () => {
  isAnimating.value = true;

  // First, ensure all cards are invisible
  cardRefs.value.forEach(card => {
    card.style.opacity = '0';
  });

  // Stagger the appearance of cards
  await animate(
    cardRefs.value,
    {
      opacity: [0, 1],
      translateZ: [-80, 0],
      scale: [0.7, 1],
      rotateX: [70, 0],
    },
    {
      delay: stagger(0.08, { from: 'last' }), // Animate from the bottom card up
      duration: 0.8,
      easing: [0.34, 1.56, 0.64, 1] // Spring-like easing for more dynamic feel
    }
  );

  isAnimating.value = false;
};
</script>

<template>
  <div class="stack-view-wrapper">
    <div class="perspective-container">
      <div class="iso-transform-container">
        <!-- Card Stack -->
        <div
          v-for="(card, index) in cards"
          :key="card.id"
          ref="cardRefs"
          class="iso-card"
          :style="card.stackStyle"
          @click="handleCardClick(card, index)"
        >
          <div class="card-inner">
            <img
              :src="card.imageBack"
              :alt="card.title"
              class="card-back-image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stack-view-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.perspective-container {
  perspective: 1800px;
  width: 100%;
  max-width: 700px;
  height: 500px;
  position: relative;
}

.iso-transform-container {
  transform-style: preserve-3d;
  transform: rotateX(60deg) rotateY(-15deg) rotateZ(-15deg);
  width: 100%;
  height: 100%;
  position: relative;
}

.iso-card {
  position: absolute;
  width: 200px;
  height: 280px;
  transform-style: preserve-3d;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, z-index 0s;
  will-change: transform, box-shadow;
  transform-origin: center center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  left: calc(50% - 100px);
  top: calc(50% - 140px);
}

.iso-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(0, 0, 0, 0.4);
  filter: blur(15px);
  opacity: 0;
  transform: translateZ(-10px) translateX(5px) translateY(5px);
  transform-origin: center center;
  z-index: -1;
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.iso-card:hover {
  transform: translateZ(40px) scale(1.05) !important;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  z-index: 50 !important;
}

.iso-card:hover::after {
  opacity: 0.6;
  transform: translateZ(-15px) translateX(15px) translateY(15px);
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
}

.card-back-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;
}
</style>
