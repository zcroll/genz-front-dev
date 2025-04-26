<script setup>
import { ref, computed } from 'vue';
import { animate } from 'motion';
import CardStack from './CardStack.vue';
import CardDetail from './CardDetail.vue';

const props = defineProps({
  cards: {
    type: Array,
    required: true
  }
});

// State
const selectedCardId = ref(null);
const isTransitioning = ref(false);

// Refs for animation targets
const stackContainerRef = ref(null);
const detailContainerRef = ref(null);

// Computed properties
const selectedCard = computed(() => {
  if (!selectedCardId.value) return null;
  return props.cards.find(card => card.id === selectedCardId.value) || null;
});

const isDetailView = computed(() => {
  return selectedCardId.value !== null;
});

// Handle card selection
const handleSelectCard = async (data) => {
  if (isTransitioning.value) return;

  selectedCardId.value = data.cardId;
  await animateToDetail(data);
};

// Handle detail view close
const handleCloseDetail = async () => {
  if (isTransitioning.value) return;

  await animateToStack();
  selectedCardId.value = null;
};

// Animate transition to detail view
const animateToDetail = async (cardData) => {
  isTransitioning.value = true;

  // Store the selected card data for the detail view to use
  // This will be used to calculate the initial state of the card in the detail view
  const selectedCard = cards.value.find(card => card.id === cardData.cardId);

  sessionStorage.setItem('selectedCardData', JSON.stringify({
    id: cardData.cardId,
    rect: cardData.element ? {
      top: cardData.element.getBoundingClientRect().top,
      left: cardData.element.getBoundingClientRect().left,
      width: cardData.element.getBoundingClientRect().width,
      height: cardData.element.getBoundingClientRect().height
    } : null,
    stackStyle: selectedCard ? selectedCard.stackStyle : null
  }));

  // Create a timeline for coordinated animations
  const timeline = [
    // First, animate stack container out
    [
      stackContainerRef.value,
      {
        opacity: [1, 0],
        filter: ['blur(0px)', 'blur(10px)'],
        transform: ['scale(1)', 'scale(0.85)']
      },
      {
        duration: 0.5,
        easing: [0.7, 0, 0.3, 1] // Ease-in-out variant
      }
    ],
    // Then, animate detail container in with slight delay
    // Important: We need to make the detail container visible but transparent
    // so the card can be positioned correctly before animation
    [
      detailContainerRef.value,
      {
        opacity: [0, 1],
        visibility: ['visible', 'visible'] // Ensure it's visible from the start
      },
      {
        duration: 0.6,
        easing: [0.3, 0, 0.3, 1],
        at: 0.05 // Start earlier for better coordination with card animation
      }
    ]
  ];

  // Make sure the detail container is visible but transparent before animation
  if (detailContainerRef.value) {
    detailContainerRef.value.style.visibility = 'visible';
    detailContainerRef.value.style.opacity = '0';
  }

  // Execute the timeline
  const animation = animate(timeline);

  // Wait for animation to complete
  await animation.finished;

  isTransitioning.value = false;
};

// Animate transition to stack view
const animateToStack = async () => {
  isTransitioning.value = true;

  // Create a timeline for coordinated animations
  const timeline = [
    // First, animate detail container out
    [
      detailContainerRef.value,
      {
        opacity: [1, 0]
      },
      {
        duration: 0.4,
        easing: 'ease-in'
      }
    ],
    // Then, animate stack container in with slight delay
    [
      stackContainerRef.value,
      {
        opacity: [0, 1],
        scale: [0.95, 1],
        filter: ['blur(5px)', 'blur(0px)']
      },
      {
        duration: 0.5,
        easing: 'ease-out',
        at: 0.1 // Start 0.1s after the first animation begins
      }
    ]
  ];

  // Execute the timeline
  const animation = animate(timeline);

  // Wait for animation to complete
  await animation.finished;

  isTransitioning.value = false;
};
</script>

<template>
  <div class="card-gallery-container">
    <!-- Stack View -->
    <div
      v-show="!isDetailView"
      ref="stackContainerRef"
      class="view-container stack-view"
    >
      <CardStack
        :cards="cards"
        @select-card="handleSelectCard"
      />
    </div>

    <!-- Detail View -->
    <div
      v-show="isDetailView"
      ref="detailContainerRef"
      class="view-container detail-view"
    >
      <CardDetail
        v-if="selectedCard"
        :card="selectedCard"
        @close="handleCloseDetail"
      />
    </div>
  </div>
</template>

<style scoped>
.card-gallery-container {
  width: 100%;
  height: 100%;
  min-height: 600px;
  position: relative;
  overflow: hidden;
  background-color: #f9fafb;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
}

.view-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  will-change: opacity, transform;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stack-view {
  z-index: 1;
  padding: 1rem;
}

.detail-view {
  z-index: 2;
}
</style>
