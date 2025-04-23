<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="space-y-3">
      <div class="flex items-start justify-between">
        <h2 class="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          {{ formatArchetypeName(archetype.slug) }}
        </h2>
        <!-- Rarity Badge -->
        <div class="rarity-badge" :class="{ 'show-badge': true }">
          <div :class="[
            `border-${theme.border}`,
            'px-2 md:px-3 py-1 md:py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg relative overflow-hidden'
          ]">
            <span :class="[
              `text-${theme.primary}-600`,
              'text-xs md:text-sm font-medium relative z-10'
            ]">
              {{ archetype.rarity_string }}
            </span>
            <div class="shine-effect"></div>
          </div>
        </div>
      </div>
      <p class="text-base md:text-xl text-gray-600 font-light leading-relaxed">
        {{ archetype.rationale }}
      </p>
    </div>

    <!-- Stats Panels -->
    <div class="space-y-4 md:space-y-6">
      <TopTraits 
        :traits="topTraits"
        :theme="theme"
      />
      <PersonalityTraits 
        :theme="theme"
      />
    </div>
  </div>
</template>

<script setup>
import TopTraits from './TopTraits.vue'
import PersonalityTraits from './PersonalityTraits.vue'

// Function to format archetype name for display
const formatArchetypeName = (slug) => {
  if (!slug) return ''
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

defineProps({
  archetype: {
    type: Object,
    required: true
  },
  topTraits: {
    type: Object,
    required: true
  },
  theme: {
    type: Object,
    required: true
  }
})
</script> 
<style scoped>
.rarity-badge {
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.show-badge {
  opacity: 1;
  transform: translateY(0);
}

.shine-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  20% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}
</style>
