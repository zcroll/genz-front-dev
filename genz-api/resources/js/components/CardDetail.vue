<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { animate, stagger } from 'motion';
import NumberFlow from 'number-flow';
import { XIcon, ArrowLeftIcon, ShoppingCartIcon } from 'lucide-vue-next';

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);

// State for user selections
const selectedColorId = ref(props.card.colors?.[0]?.id || null);
const selectedCurrency = ref(props.card.currency || '$');

// Refs for animation targets
const titleRef = ref(null);
const imageRef = ref(null);
const descriptionRef = ref(null);
const optionsRef = ref(null);
const priceRef = ref(null);
const buttonRef = ref(null);
const closeButtonRef = ref(null);
const returnButtonRef = ref(null);
const detailContainerRef = ref(null);

// NumberFlow instance for price animation
let priceAnimator = null;

// Computed properties
const selectedVariant = computed(() => {
  if (!selectedColorId.value || !props.card.colors) return null;
  return props.card.colors.find(color => color.id === selectedColorId.value) || null;
});

const displayPrice = computed(() => {
  if (selectedVariant.value) {
    return selectedVariant.value.price || props.card.price;
  }
  return props.card.price;
});

const displayImage = computed(() => {
  if (selectedVariant.value && selectedVariant.value.image) {
    return selectedVariant.value.image;
  }
  return props.card.imageFront;
});

const displayMaterial = computed(() => {
  if (selectedVariant.value && selectedVariant.value.material) {
    return selectedVariant.value.material;
  }
  return props.card.material;
});

// Get selected card data from session storage
const getSelectedCardData = () => {
  try {
    const data = JSON.parse(sessionStorage.getItem('selectedCardData'));
    return data || { id: null, rect: null };
  } catch (e) {
    console.error('Error parsing selected card data:', e);
    return { id: null, rect: null };
  }
};

// Initialize animations when component mounts
onMounted(() => {
  // Get the selected card data
  const selectedCardData = getSelectedCardData();

  // Run entrance animation first with the selected card data
  runEnterAnimation(selectedCardData);

  // Initialize price animation after elements are visible
  setTimeout(() => {
    initPriceAnimation();
  }, 800); // Delay to ensure price element is visible after entrance animation
});

// Price animation with NumberFlow
let priceAnimation = null;

// Function to initialize price animation
const initPriceAnimation = () => {
  if (priceRef.value && !priceAnimation) {
    priceAnimation = new NumberFlow({
      node: priceRef.value,
      from: 0,
      to: displayPrice.value,
      duration: 1000,
      easing: 'easeOutCubic',
      decimals: 2,
      prefix: selectedCurrency.value
    });
    priceAnimation.start();
  }
};

// Function to animate price changes
const animatePrice = (from, to) => {
  if (priceAnimation) {
    // Add a subtle scale effect during price change
    const scale = 1 + Math.sin(0.5 * Math.PI) * 0.05;
    if (priceRef.value) {
      priceRef.value.style.transform = `scale(${scale})`;
    }

    // Update and start the animation
    priceAnimation.update({
      from: from,
      to: to,
      duration: 600,
      prefix: selectedCurrency.value
    }).start();

    // Reset transform after animation
    setTimeout(() => {
      if (priceRef.value) {
        priceRef.value.style.transform = '';
      }
    }, 600);
  }
};

// Watch for price changes and animate them
watch(displayPrice, (newPrice, oldPrice) => {
  animatePrice(oldPrice, newPrice);
});

watch(selectedCurrency, () => {
  // Just update the display when currency changes
  if (priceRef.value) {
    priceRef.value.textContent = `${selectedCurrency.value}${displayPrice.value.toFixed(2)}`;
  }
});

// Handle color selection
const selectColor = async (colorId) => {
  // If the same color is selected, do nothing
  if (selectedColorId.value === colorId) return;

  // Fade out the current image
  if (imageRef.value) {
    await animate(imageRef.value, { opacity: 0 }, { duration: 0.15 });
  }

  // Update the selected color
  selectedColorId.value = colorId;

  // Wait for the next tick to ensure the image src has updated
  await new Promise(resolve => setTimeout(resolve, 10));

  // Fade in the new image
  if (imageRef.value) {
    await animate(imageRef.value, { opacity: 1 }, { duration: 0.15 });
  }
};

// Handle currency selection
const setCurrency = (currency) => {
  // If the same currency is selected, do nothing
  if (selectedCurrency.value === currency) return;

  // Update the selected currency
  selectedCurrency.value = currency;

  // Add a subtle animation to the price element
  if (priceRef.value) {
    animate(priceRef.value,
      { scale: [1, 1.1, 1] },
      { duration: 0.4, easing: [0.34, 1.56, 0.64, 1] }
    );
  }
};

// Handle close button click
const handleClose = () => {
  emit('close');
};

// Run entrance animation for detail view
const runEnterAnimation = async (selectedCardData) => {
  // Calculate the initial state for the card animation based on the selected card data
  const calculateInitialState = (selectedCardData) => {
    // Default values if no data is available
    const defaultTransform = 'translateX(-150px) translateY(80px) translateZ(0px) scale(0.5) rotateX(60deg) rotateY(-15deg) rotateZ(-15deg)';

    if (!selectedCardData || !selectedCardData.rect) {
      return {
        opacity: 1, // Start visible for better animation
        transform: defaultTransform
      };
    }

    // Calculate the center position of the image in the detail view
    const detailContainer = detailContainerRef?.value;
    const detailRect = detailContainer?.getBoundingClientRect() || { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    const detailCenterX = detailRect.left + (detailRect.width / 2);
    const detailCenterY = detailRect.top + (detailRect.height / 2);

    // Calculate the offset from the selected card to the detail center
    const cardCenterX = selectedCardData.rect.left + (selectedCardData.rect.width / 2);
    const cardCenterY = selectedCardData.rect.top + (selectedCardData.rect.height / 2);

    const offsetX = cardCenterX - detailCenterX;
    const offsetY = cardCenterY - detailCenterY;

    // Calculate the scale factor (card size vs detail image size)
    // We need to ensure this is accurate for the visual match
    const scaleFactor = selectedCardData.rect.width / (imageRef.value?.offsetWidth || 400) * 0.9; // Slight adjustment for better visual match

    // Extract transform values from stackStyle if available
    let stackTransform = '';
    if (selectedCardData.stackStyle && selectedCardData.stackStyle.transform) {
      // Extract just the translateX and translateZ values from the stack style
      const transformStr = selectedCardData.stackStyle.transform;
      const translateXMatch = transformStr.match(/translateX\(([^)]+)\)/);
      const translateYMatch = transformStr.match(/translateY\(([^)]+)\)/);
      const translateZMatch = transformStr.match(/translateZ\(([^)]+)\)/);

      const stackTranslateX = translateXMatch ? translateXMatch[1] : '0px';
      const stackTranslateY = translateYMatch ? translateYMatch[1] : '0px';
      const stackTranslateZ = translateZMatch ? translateZMatch[1] : '0px';

      // Use these values to enhance our transform
      stackTransform = `translateX(${stackTranslateX}) translateY(${stackTranslateY}) translateZ(${stackTranslateZ})`;
    }

    // If we have stack transform data, use it, otherwise fall back to calculated position
    // The key is to match the isometric angle of the stack (rotateX, rotateY, rotateZ)
    const transform = stackTransform ?
      `${stackTransform} scale(${scaleFactor}) rotateX(60deg) rotateY(-15deg) rotateZ(-15deg)` :
      `translateX(${offsetX}px) translateY(${offsetY}px) translateZ(0px) scale(${scaleFactor}) rotateX(60deg) rotateY(-15deg) rotateZ(-15deg)`;

    // Set the initial style directly on the element for immediate effect
    if (imageRef.value) {
      imageRef.value.style.opacity = '1';
      imageRef.value.style.transform = transform;
      imageRef.value.style.transformOrigin = 'center center';
    }

    return {
      opacity: 1, // Start visible
      transform: transform
    };
  };

  // First, calculate and apply the initial state
  const initialState = calculateInitialState(selectedCardData);

  // Create a timeline for coordinated animations
  const timeline = [
    // Animate image with the morphing effect from stack to detail
    [
      imageRef.value,
      {
        opacity: [1, 1], // Keep visible throughout
        transform: [
          // Initial state is already applied directly to the element
          initialState.transform,
          // Final state - flat and centered
          'translateX(0px) translateY(0px) translateZ(0px) scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
        ]
      },
      {
        duration: 0.85, // Slightly longer for more dramatic effect
        easing: [0.22, 1, 0.36, 1], // Spring-like easing
        at: 0 // Start immediately
      }
    ],

    // Animate title with slight delay
    [
      titleRef.value,
      {
        opacity: [0, 1],
        y: [15, 0]
      },
      {
        duration: 0.5,
        easing: 'ease-out',
        at: 0.2 // Start after card animation has begun
      }
    ],

    // Animate description shortly after title
    [
      descriptionRef.value,
      {
        opacity: [0, 1],
        y: [15, 0]
      },
      {
        duration: 0.5,
        easing: 'ease-out',
        at: '<+0.1' // 0.1s after previous animation starts
      }
    ],

    // Animate options with staggered effect
    [
      optionsRef.value,
      {
        opacity: [0, 1],
        x: [-15, 0]
      },
      {
        duration: 0.4,
        at: 0.4 // Start after card and title animations
      }
    ],

    // Animate price container
    [
      priceRef.value.parentElement,
      {
        opacity: [0, 1],
        y: [10, 0]
      },
      {
        duration: 0.4,
        at: 0.6 // Start after options animation
      }
    ],

    // Animate purchase button
    [
      buttonRef.value,
      {
        opacity: [0, 1],
        scale: [0.9, 1]
      },
      {
        duration: 0.5,
        at: 0.65 // Start after price animation
      }
    ],

    // Animate close button
    [
      closeButtonRef.value,
      {
        opacity: [0, 1],
        scale: [0.5, 1],
        rotate: [-10, 0]
      },
      {
        duration: 0.4,
        at: 0.3 // Start after card animation has begun
      }
    ],

    // Animate return button
    [
      returnButtonRef.value,
      {
        opacity: [0, 1],
        x: [-20, 0]
      },
      {
        duration: 0.4,
        at: 0.35 // Start after close button animation
      }
    ]
  ];

  // Execute the timeline
  const animation = animate(timeline);

  // Wait for animation to complete
  await animation.finished;
};
</script>

<template>
  <div class="card-detail-container" ref="detailContainerRef">
    <div class="card-detail-inner">
      <!-- Close button -->
      <button
        ref="closeButtonRef"
        @click="handleClose"
        class="close-button"
        aria-label="Close"
      >
        <XIcon size="24" />
      </button>

      <!-- Return button -->
      <button
        ref="returnButtonRef"
        @click="handleClose"
        class="return-button"
        aria-label="Return to cards"
      >
        <ArrowLeftIcon size="20" class="mr-2" />
        Return to cards
      </button>

      <div class="card-detail-content">
        <!-- Left column: Image -->
        <div class="card-image-container">
          <img
            ref="imageRef"
            :src="displayImage"
            :alt="card.title"
            class="card-image"
          />
        </div>

        <!-- Right column: Details -->
        <div class="card-info-container">
          <h2 ref="titleRef" class="card-title">{{ card.title }}</h2>

          <div ref="descriptionRef" class="card-description">
            <p>{{ card.description }}</p>

            <div class="card-specs">
              <div class="spec-item">
                <span class="spec-label">Dimensions:</span>
                <span>{{ card.dimensions }}</span>
                <span class="text-sm text-gray-500">({{ card.dimensionsMetric }})</span>
              </div>

              <div class="spec-item">
                <span class="spec-label">Material:</span>
                <span>{{ displayMaterial }}</span>
              </div>
            </div>
          </div>

          <!-- Options -->
          <div ref="optionsRef" class="card-options">
            <!-- Color options -->
            <div v-if="card.colors && card.colors.length > 0" class="color-options">
              <h3 class="options-title">Color / Style</h3>
              <div class="color-swatches">
                <button
                  v-for="color in card.colors"
                  :key="color.id"
                  class="color-swatch"
                  :class="{ 'selected': selectedColorId === color.id }"
                  :style="{ backgroundColor: color.hex }"
                  @click="selectColor(color.id)"
                  :aria-label="`Select ${color.name}`"
                  :title="color.name"
                ></button>
              </div>
            </div>

            <!-- Currency options -->
            <div class="currency-options">
              <h3 class="options-title">Currency</h3>
              <div class="currency-buttons">
                <button
                  v-for="currency in ['$', '€', '£']"
                  :key="currency"
                  class="currency-button"
                  :class="{ 'selected': selectedCurrency === currency }"
                  @click="setCurrency(currency)"
                >
                  {{ currency }}
                </button>
              </div>
            </div>
          </div>

          <!-- Price and purchase -->
          <div class="purchase-container">
            <div ref="priceRef" class="price">
              {{ selectedCurrency }}{{ displayPrice.toFixed(2) }}
            </div>

            <button ref="buttonRef" class="purchase-button">
              <ShoppingCartIcon size="20" class="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-detail-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.card-detail-inner {
  width: 100%;
  max-width: 1000px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  z-index: 10;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.return-button {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 10;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.return-button:hover {
  background-color: #f1f5f9;
  transform: translateX(-3px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.return-button:active {
  transform: translateX(0);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.card-image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-image {
  max-width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background-color: #f8fafc;
  transform-origin: center center;
  will-change: transform, opacity;
  transition: box-shadow 0.3s ease;
}

.card-info-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.card-description {
  color: #555;
  line-height: 1.6;
}

.card-specs {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spec-label {
  font-weight: 600;
  color: #333;
}

.card-options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.options-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.color-swatches {
  display: flex;
  gap: 0.75rem;
}

.color-swatch {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s, box-shadow 0.3s;
  position: relative;
  overflow: visible;
}

.color-swatch:hover {
  transform: scale(1.15);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.color-swatch.selected {
  border-color: #333;
  transform: scale(1.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.color-swatch.selected::after {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

.currency-buttons {
  display: flex;
  gap: 0.5rem;
}

.currency-button {
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.currency-button:hover {
  background-color: #eee;
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.currency-button.selected {
  background-color: #333;
  color: white;
  border-color: #333;
  transform: scale(1.05);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.currency-button.selected::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
  opacity: 0;
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% { transform: scale(0.5); opacity: 0; }
  40% { opacity: 0.3; }
  100% { transform: scale(2); opacity: 0; }
}

.purchase-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
}

.price {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
}

.purchase-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);
}

.purchase-button:hover {
  background-color: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(79, 70, 229, 0.3);
}

.purchase-button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
}

.purchase-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s;
}

.purchase-button:hover::before {
  left: 100%;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-detail-content {
    grid-template-columns: 1fr;
  }

  .card-image {
    max-height: 300px;
  }

  .return-button {
    top: 4rem; /* Position below the close button on mobile */
    left: 1rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .close-button {
    top: 1rem;
    right: 1rem;
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .return-button {
    top: 1rem;
    left: 4rem; /* Position to the right of the close button on very small screens */
  }
}
</style>
