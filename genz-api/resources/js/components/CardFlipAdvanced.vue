<template>
  <div class="card-flip-container">
    <div class="cards-grid" :style="{ '--columns': columns }">
      <div 
        v-for="(card, index) in cards" 
        :key="index" 
        class="card-wrapper"
        :class="{ 'flipped': flippedCards[index] }"
        @click="flipCard(index)"
        :style="{
          '--front-bg': card.frontBg || defaultFrontBg,
          '--back-bg': card.backBg || defaultBackBg,
          '--front-color': card.frontColor || defaultFrontColor,
          '--back-color': card.backColor || defaultBackColor,
          '--button-bg': card.buttonBg || defaultButtonBg,
          '--button-color': card.buttonColor || defaultButtonColor
        }"
      >
        <div class="card-inner">
          <div class="card-front">
            <div class="card-content">
              <div class="card-icon" v-if="card.icon">{{ card.icon }}</div>
              <div class="card-image-container" v-if="card.frontImage">
                <img :src="card.frontImage" :alt="card.title" class="card-image">
              </div>
              <h3 class="card-title">{{ card.title }}</h3>
              <p class="card-subtitle" v-if="card.subtitle">{{ card.subtitle }}</p>
            </div>
          </div>
          <div class="card-back">
            <div class="card-content">
              <h4 class="card-back-title" v-if="card.backTitle">{{ card.backTitle }}</h4>
              <p class="card-description">{{ card.description }}</p>
              <button class="card-button" v-if="card.buttonText">{{ card.buttonText }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  cards: {
    type: Array,
    required: true,
    default: () => []
  },
  columns: {
    type: Number,
    default: 3
  },
  defaultFrontBg: {
    type: String,
    default: 'linear-gradient(135deg, #6e8efb, #a777e3)'
  },
  defaultBackBg: {
    type: String,
    default: 'white'
  },
  defaultFrontColor: {
    type: String,
    default: 'white'
  },
  defaultBackColor: {
    type: String,
    default: '#333'
  },
  defaultButtonBg: {
    type: String,
    default: '#6e8efb'
  },
  defaultButtonColor: {
    type: String,
    default: 'white'
  }
});

// Track which cards are flipped
const flippedCards = ref(Array(props.cards.length).fill(false));

// Function to flip a card
const flipCard = (index) => {
  flippedCards.value[index] = !flippedCards.value[index];
};
</script>

<style scoped>
.card-flip-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(var(--columns, 3), 1fr);
  gap: 2rem;
}

.card-wrapper {
  height: 280px;
  perspective: 1000px;
  cursor: pointer;
  --front-bg: linear-gradient(135deg, #6e8efb, #a777e3);
  --back-bg: white;
  --front-color: white;
  --back-color: #333;
  --button-bg: #6e8efb;
  --button-color: white;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.card-wrapper.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-front {
  background: var(--front-bg);
  color: var(--front-color);
}

.card-back {
  background: var(--back-bg);
  color: var(--back-color);
  transform: rotateY(180deg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.card-image-container {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.card-subtitle {
  font-size: 0.875rem;
  opacity: 0.8;
  margin: 0;
}

.card-back-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem;
}

.card-description {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  overflow-y: auto;
  max-height: 150px;
}

.card-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--button-bg);
  color: var(--button-color);
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.card-button:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
}

/* Add some hover effects */
.card-wrapper:hover .card-inner:not(.flipped) {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .card-wrapper {
    height: 250px;
  }
  
  .card-icon {
    font-size: 2.5rem;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
  
  .card-content {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
