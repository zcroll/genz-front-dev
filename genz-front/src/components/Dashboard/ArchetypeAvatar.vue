<template>
  <div class="relative w-full h-full">
    <!-- Lottie Animation Container -->
    <DotLottieVue
        v-if="!showFallback"
        ref="lottieContainer"
        :autoplay="true"
        :loop="true"
        :source="animationPath"
        class="w-full h-full"
        @load="handleLoad"
        @error="handleError"
    />

    <!-- Fallback Avatar if animation fails -->
    <div v-if="showFallback" class="absolute inset-0 flex items-center justify-center">
      <div
          class="w-32 h-32 rounded-full flex items-center justify-center fallback-avatar"
          :class="{ 'dark-mode': props.theme.isDarkMode }"
          :style="{
            background: `linear-gradient(to bottom right, var(--${props.theme.primary}-500), var(--${props.theme.primary}-700))`
          }">
        <span class="text-4xl font-bold text-white">{{ getInitials(archetype) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch, computed} from 'vue'
import {DotLottieVue} from '@lottiefiles/dotlottie-vue'
import {useToast} from 'vue-toastification'

const props = defineProps({
  archetype: {
    type: String,
    required: true
  },
  theme: {
    type: Object,
    default: () => ({
      primary: 'indigo',
      isDarkMode: false
    })
  }
})

const emit = defineEmits(['loaded'])
const toast = useToast()
const lottieContainer = ref(null)
const showFallback = ref(false)
const animationPath = ref('')

const animationMapping = {
  // Analysts
  'caregiver': 'defender',
  'designer': 'executive',
  'guardian': 'consul',
  'mentor': 'consul',
  'producer': 'logistician',
  'protector': 'defender',
  'scholar': 'logistician',

  // Diplomats
  'advocate': 'advocate',
  'anchor': 'protagonist',
  'captain': 'protagonist',
  'composer': 'advocate',
  'humanitarian': 'mediator',
  'kingpin': 'protagonist',
  'philosopher': 'advocate',
  'supporter': 'campaigner',

  // Sentinels
  'architect': 'architect',
  'builder': 'virtuoso',
  'explorer': 'campaigner',
  'groundbreaker': 'commander',
  'researcher': 'logician',
  'strategist': 'architect',

  // Explorers
  'creator': 'adventurer',
  'enthusiast': 'entrepreneur',
  'innovator': 'entrepreneur',
  'inventor': 'logistician',
  'luminary': 'entertainer',
  'mastermind': 'architect',
  'maverick': 'debater',
  'technician': 'virtuoso',
  'visionary': 'debater'
}

const getInitials = (str) => {
  return str
      .split(/[\s-_]+/)
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
}

const getAnimationPath = (archetype) => {
  const mappedType = animationMapping[archetype.toLowerCase()]
  return mappedType ? `/personality_animations/${mappedType}_animation.json` : null
}

const handleLoad = () => {
  showFallback.value = false
  emit('loaded')
}

const handleError = () => {
  console.error('Error loading animation')
  showFallback.value = true
  emit('loaded')

  toast.info("Using fallback avatar display", {
    timeout: 2000,
    position: "bottom-right"
  })
}

// Watch for archetype changes
watch(() => props.archetype, () => {
  const path = getAnimationPath(props.archetype)
  if (!path) {
    showFallback.value = true
    return
  }
  animationPath.value = path
}, {immediate: true})

</script>

<style scoped>
.fallback-avatar {
  animation: fadeIn 0.3s ease-in-out;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.dark-mode {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
