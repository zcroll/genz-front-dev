<template>
  <div class="card-flip-container">
    <div class="cards-grid">
      <div 
        v-for="(card, index) in cards" 
        :key="index" 
        class="card-wrapper"
        :class="{ 'flipped': flippedCards[index] }"
        @click="flipCard(index)"
      >
        <div class="card-inner">
          <div class="card-front">
            <div class="card-content">
              <div class="card-icon">{{ card.icon }}</div>
              <h3 class="card-title">{{ card.title }}</h3>
            </div>
          </div>
          <div class="card-back">
            <div class="card-content">
              <p class="card-description">{{ card.description }}</p>
              <button class="card-button">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Sample card data
const cards = ref([
  {
    icon: '🚀',
    title: 'Getting Started',
    description: 'Begin your journey with our comprehensive onboarding process designed to get you up and running quickly.'
  },
  {
    icon: '💡',
    title: 'Innovative Ideas',
    description: 'Explore cutting-edge concepts and creative solutions that push the boundaries of what\'s possible.'
  },
  {
    icon: '🛠️',
    title: 'Powerful Tools',
    description: 'Access a suite of robust tools engineered to streamline your workflow and boost productivity.'
  },
  {
    icon: '📊',
    title: 'Analytics',
    description: 'Gain valuable insights with our advanced analytics platform that transforms data into actionable intelligence.'
  },
  {
    icon: '🔒',
    title: 'Security',
    description: 'Rest easy knowing your data is protected by state-of-the-art security measures and encryption protocols.'
  },
  {
    icon: '🌐',
    title: 'Global Reach',
    description: 'Connect with audiences worldwide through our internationally optimized platform and localization features.'
  }
]);

// Track which cards are flipped
const flippedCards = ref(Array(cards.value.length).fill(false));

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
  padding: 2rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.card-wrapper {
  height: 280px;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
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
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
}

.card-back {
  background: white;
  color: #333;
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
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.card-description {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.card-button {
  padding: 0.75rem 1.5rem;
  background-color: #6e8efb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.card-button:hover {
  background-color: #5d7ce0;
}

/* Add some hover effects */
.card-wrapper:hover .card-inner:not(.flipped) {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

/* Responsive adjustments */
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
}

@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
