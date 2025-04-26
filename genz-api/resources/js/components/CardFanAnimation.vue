<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useMotion } from '@vueuse/motion';
import { animate } from 'motion';
import NumberFlow from 'number-flow';
import SvgIcon from '@/components/SvgIcon.vue';
import CardPattern from '@/components/CardPattern.vue';

const props = defineProps({
  cards: {
    type: Array,
    required: true
  },
  selectedCardId: {
    type: String,
    default: null
  },
  locale: {
    type: String,
    default: 'en'
  },
  // Animation settings
  fanSpread: {
    type: Number,
    default: 20 // Degrees of spread between cards
  },
  fanRadius: {
    type: Number,
    default: 180 // Distance for horizontal spread
  },
  animationDuration: {
    type: Number,
    default: 600 // ms
  },
  staggerDelay: {
    type: Number,
    default: 50 // ms delay between each card animation
  }
});

const emit = defineEmits(['card-click', 'close']);

// Refs for animation elements
const cardContainer = ref(null);
const cardRefs = ref([]);
const isAnimating = ref(false);
const isExpanded = ref(false);
const prefersReducedMotion = ref(false);

// Check for reduced motion preference
onMounted(() => {
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.value = mediaQuery.matches;

    // Listen for changes to the prefers-reduced-motion media query
    mediaQuery.addEventListener('change', (event) => {
      prefersReducedMotion.value = event.matches;
    });
  }
});

// Get localized text
const getLocalizedText = (card) => {
  if (props.locale === 'fr' && card.descriptionText_fr) {
    return {
      title: card.descriptionTitle_fr || card.descriptionTitle,
      text: card.descriptionText_fr
    };
  }
  return {
    title: card.descriptionTitle,
    text: card.descriptionText
  };
};

// Get category-specific class
const getCategoryClass = (category) => {
  switch (category) {
    case 'holland':
      return 'border-b-4 border-b-indigo-500';
    case 'personality':
      return 'border-b-4 border-b-emerald-500';
    case 'skill':
      return 'border-b-4 border-b-amber-500';
    case 'career':
      return 'border-b-4 border-b-pink-500';
    default:
      return '';
  }
};

// Calculate positions for horizontal fan layout
const calculateFanPosition = (index, totalCards) => {
  // For initial state (stacked)
  if (!isExpanded.value) {
    // Slight offset for stacked appearance
    return {
      x: index * 0.5,
      y: index * 0.5,
      rotation: 0,
      scale: 1,
      opacity: 1
    };
  }

  // For selected card
  if (props.selectedCardId && cards.value.find(c => c.id === props.selectedCardId)?.id === cards.value[index].id) {
    // Bring selected card to center and slightly forward
    return {
      x: 0,
      y: -20,
      rotation: 0,
      scale: 1.05,
      opacity: 1,
      zIndex: 50
    };
  }

  // For fan-out layout
  // Calculate position based on index relative to total cards
  const totalWidth = window.innerWidth * 0.7; // Use 70% of viewport width
  const cardWidth = 280; // Card width in pixels
  const maxVisibleCards = Math.min(totalCards, 12); // Limit visible cards

  // Calculate spacing between cards
  const spacing = Math.min((totalWidth - cardWidth) / (maxVisibleCards - 1), cardWidth * 0.8);

  // Calculate horizontal position
  const middleIndex = (totalCards - 1) / 2;
  const offset = index - middleIndex;
  const x = offset * spacing;

  // Add a subtle vertical offset based on distance from center
  const distanceFromCenter = Math.abs(offset);
  const y = distanceFromCenter * 5; // Slight arc effect

  // Add subtle rotation for visual interest
  const rotation = offset * 2;

  // Reduce opacity for cards further from center
  const opacity = Math.max(0.7, 1 - (distanceFromCenter * 0.05));

  return { x, y, rotation, scale: 1, opacity };
};

// Expand the cards into a fan
const expandCards = async () => {
  if (isAnimating.value || isExpanded.value) return;

  isAnimating.value = true;
  isExpanded.value = true;

  const totalCards = cardRefs.value.length;

  // Animate each card to its fan position
  const animations = cardRefs.value.map((card, index) => {
    const { x, y, rotation, scale, opacity } = calculateFanPosition(index, totalCards);

    // Use reduced motion settings if preferred
    const duration = prefersReducedMotion.value ? 0 : props.animationDuration;
    const delay = prefersReducedMotion.value ? 0 : index * props.staggerDelay;

    return animate(
      card,
      {
        x,
        y,
        rotate: rotation,
        scale,
        opacity,
        boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
      },
      {
        duration,
        delay,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)', // Custom easing for elegant motion
      }
    );
  });

  // Wait for all animations to complete
  await Promise.all(animations);
  isAnimating.value = false;

  // Initialize counters after animation completes
  setTimeout(initCounters, 100);
};

// Collapse the cards back to a stack
const collapseCards = async () => {
  if (isAnimating.value || !isExpanded.value) return;

  isAnimating.value = true;

  // Animate each card back to its original position
  const animations = cardRefs.value.map((card, index) => {
    // Use reduced motion settings if preferred
    const duration = prefersReducedMotion.value ? 0 : props.animationDuration;
    const delay = prefersReducedMotion.value ? 0 : (cardRefs.value.length - index - 1) * (props.staggerDelay / 2);

    return animate(
      card,
      {
        x: index * 0.5,
        y: index * 0.5,
        rotate: 0,
        scale: 1,
        opacity: 1,
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      },
      {
        duration,
        delay,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smooth easing for collapse
      }
    );
  });

  // Wait for all animations to complete
  await Promise.all(animations);
  isExpanded.value = false;
  isAnimating.value = false;
};

// Handle card click
const handleCardClick = (card) => {
  emit('card-click', card);
  collapseCards();
};

// Handle close button click
const handleClose = () => {
  emit('close');
  collapseCards();
};

// Watch for changes to selectedCardId
watch(() => props.selectedCardId, (newValue) => {
  if (newValue) {
    expandCards();
  } else {
    collapseCards();
  }
});

// Numeric counter animation
const createCounter = (el, startValue, endValue) => {
  const counter = new NumberFlow({
    from: startValue,
    to: endValue,
    duration: prefersReducedMotion.value ? 0 : 1000,
    delay: 0,
    decimals: 0,
    easing: 'easeOutCubic',
    onUpdate: (value) => {
      el.textContent = Math.floor(value);
    }
  });

  counter.start();
  return counter;
};

// Initialize counter elements
const initCounters = () => {
  const counterElements = document.querySelectorAll('[data-counter]');
  counterElements.forEach(el => {
    const value = parseInt(el.getAttribute('data-counter'), 10);
    createCounter(el, 0, value);
  });
};

// Call initCounters when expanded
watch(() => isExpanded.value, (newValue) => {
  if (newValue) {
    // Wait for DOM to update
    setTimeout(initCounters, 100);
  }
});
</script>

<template>
  <div class="relative">
    <!-- Card container -->
    <div
      ref="cardContainer"
      class="relative h-[400px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 dark:from-blue-900 dark:to-blue-950"
    >
      <!-- Close button (visible when expanded) -->
      <button
        v-if="isExpanded"
        @click="handleClose"
        class="absolute right-4 top-4 z-50 rounded-full bg-white p-2 shadow-md transition-all hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        :class="{ 'motion-safe:animate-fadeIn': isExpanded }"
      >
        <SvgIcon name="x" />
        <span class="sr-only">{{ locale === 'en' ? 'Close' : 'Fermer' }}</span>
      </button>

      <!-- Cards -->
      <div
        v-for="(card, index) in cards"
        :key="card.id"
        ref="cardRefs"
        class="group absolute left-1/2 top-1/2 h-[180px] w-[280px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-md transition-all duration-300 dark:border-blue-800 dark:bg-blue-900 dark:text-white"
        :class="[
          getCategoryClass(card.category),
          { 'hover:shadow-lg': isExpanded }
        ]"
        :style="{
          backgroundColor: card.color || '#ffffff',
          zIndex: cards.length - index,
          transformOrigin: 'center center',
          boxShadow: isExpanded ? '0 10px 25px rgba(0,0,0,0.1)' : '0 4px 6px rgba(0,0,0,0.05)',
        }"
        @click="handleCardClick(card)"
      >
        <!-- Decorative pattern background -->
        <CardPattern :opacity="0.1" color="#000" />

        <!-- Card content -->
        <div class="relative z-10 flex h-full flex-col">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100">{{ card.title }}</h3>
            <span v-if="card.icon" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 shadow-sm transition-transform duration-300 group-hover:scale-110 dark:bg-blue-800/50">
              <SvgIcon :name="card.icon" size="20" class="text-blue-800 dark:text-blue-200" />
            </span>
          </div>

          <!-- Only show details when expanded -->
          <div
            v-if="isExpanded"
            class="mt-4 flex-1 overflow-hidden text-sm"
            :class="{ 'motion-safe:animate-slideIn': isExpanded }"
          >
            <p class="line-clamp-3 text-blue-800 dark:text-blue-200">{{ getLocalizedText(card).text }}</p>

            <!-- Stats (example) -->
            <div class="mt-4 grid grid-cols-2 gap-2">
              <div class="rounded-lg bg-white/60 p-2 text-center shadow-sm dark:bg-blue-800/40">
                <div class="text-xl font-bold text-blue-900 dark:text-blue-100" :data-counter="85 - index * 10">0</div>
                <div class="text-xs text-blue-700 dark:text-blue-300">
                  {{ locale === 'en' ? 'Match' : 'Correspondance' }}
                </div>
              </div>
              <div class="rounded-lg bg-white/60 p-2 text-center shadow-sm dark:bg-blue-800/40">
                <div class="text-xl font-bold text-blue-900 dark:text-blue-100" :data-counter="(index + 1) * 120 + 400">0</div>
                <div class="text-xs text-blue-700 dark:text-blue-300">
                  {{ locale === 'en' ? 'Jobs' : 'Emplois' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Animation utilities */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.motion-safe\:animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

.motion-safe\:animate-slideIn {
  animation: slideIn 0.5s ease-out forwards;
}

/* Ensure we respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .motion-safe\:animate-fadeIn,
  .motion-safe\:animate-slideIn {
    animation: none;
  }
}
</style>
