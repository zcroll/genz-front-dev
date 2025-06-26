<template>
  <div class="relative h-full w-full flex justify-center items-center">
    <router-link
        to="/holland-codes"
        class="relative w-full h-full flex items-center justify-center"
    >
      <!-- Cube Container -->
      <div
          id="cube"
          class="relative h-60 w-60 flex justify-center items-center cursor-pointer"
          @mouseenter="openCube"
          @mouseleave="closeCube"
      >
        <!-- Animated Hexagon Glow -->
        <div class="hexagon absolute"></div>

        <!-- Box Base (Back) -->
        <div class="cube back h-60 w-60 absolute top-0 left-0"></div>

        <!-- Animated Flaps -->
        <div class="cube top h-60 w-60 absolute top-0 left-0"></div>
        <div class="cube left h-60 w-60 absolute top-0 left-0"></div>
        <div class="cube right h-60 w-60 absolute top-0 left-0"></div>

        <!-- Question Mark (Power-up) -->
        <div class="powerup absolute flex items-center justify-center">
          <svg
              class="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
          >
            <path
                d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"/>
            <path
                d="M12 14C11.4477 14 11 13.5523 11 13V12C11 11.4477 11.4477 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 9.55228 9.55228 10 9 10C8.44772 10 8 9.55228 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13V13C12 13.5523 11.5523 14 11 14H12ZM12 15C12.5523 15 13 15.4477 13 16V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V16C11 15.4477 11.4477 15 12 15Z"/>
          </svg>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'

const isOpen = ref(false)
const transitionTime = '750ms'

function openCube() {
  if (!isOpen.value) {
    const ctop = document.querySelector('.top') as HTMLElement
    const cleft = document.querySelector('.left') as HTMLElement
    const cright = document.querySelector('.right') as HTMLElement
    const cback = document.querySelector('.back') as HTMLElement
    const glow = document.querySelector('.hexagon') as HTMLElement
    const powerup = document.querySelector('.powerup') as HTMLElement
    const cube = document.querySelector('#cube') as HTMLElement

    ctop.style.transform = 'translateY(-3rem)'
    cleft.style.transform = 'translateX(-3rem)'
    cright.style.transform = 'translateX(3rem)'
    ctop.style.opacity = '0.1'
    cleft.style.opacity = '0.1'
    cright.style.opacity = '0.1'
    cback.style.opacity = '0.1'
    glow.style.opacity = '0.5'
    powerup.style.opacity = '1'
    isOpen.value = true
    cube.style.animationPlayState = 'paused'
    powerup.style.zIndex = '10'
    powerup.style.height = '80px'
    powerup.style.width = '80px'

    // Change glow color
    document.documentElement.style.setProperty('--glow', 'rgba(69,185,251,0.33)')
  }
}

function closeCube() {
  if (isOpen.value) {
    const ctop = document.querySelector('.top') as HTMLElement
    const cleft = document.querySelector('.left') as HTMLElement
    const cright = document.querySelector('.right') as HTMLElement
    const cback = document.querySelector('.back') as HTMLElement
    const glow = document.querySelector('.hexagon') as HTMLElement
    const powerup = document.querySelector('.powerup') as HTMLElement
    const cube = document.querySelector('#cube') as HTMLElement

    ctop.style.transform = 'translateY(0)'
    cleft.style.transform = 'translateX(0)'
    cright.style.transform = 'translateX(0)'
    cube.style.opacity = '1'
    ctop.style.opacity = '1'
    cleft.style.opacity = '1'
    cright.style.opacity = '1'
    cback.style.opacity = '1'
    glow.style.opacity = '1'
    powerup.style.opacity = '0'
    powerup.style.zIndex = '0'
    cube.style.animationPlayState = 'running'
    powerup.style.height = '48px'
    powerup.style.width = '48px'

    // Reset glow color
    document.documentElement.style.setProperty('--glow', 'rgba(255,195,26,0.4)')
    isOpen.value = false
  }
}

onMounted(() => {
  const ctop = document.querySelector('.top') as HTMLElement
  const cleft = document.querySelector('.left') as HTMLElement
  const cright = document.querySelector('.right') as HTMLElement
  const cback = document.querySelector('.back') as HTMLElement
  const glow = document.querySelector('.hexagon') as HTMLElement
  const powerup = document.querySelector('.powerup') as HTMLElement
  const cube = document.querySelector('#cube') as HTMLElement

  ctop.style.transition = `all ${transitionTime}`
  cleft.style.transition = `all ${transitionTime}`
  cright.style.transition = `all ${transitionTime}`
  cube.style.transition = `all ${transitionTime}`
  powerup.style.transition = `all ${transitionTime}`
  glow.style.transition = `all ${transitionTime}`
  cback.style.transition = `all ${transitionTime}`
})
</script>

<style scoped>
:root {
  --glow: rgba(255, 195, 26, 0.4);
}

.hexagon {
  z-index: -2;
  position: relative;
  width: 160px;
  height: 92.38px;
  background-color: var(--glow);
  margin: 46.19px 0;
  filter: blur(20px);
}

.hexagon:before,
.hexagon:after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 80px solid transparent;
  border-right: 80px solid transparent;
}

.hexagon:before {
  bottom: 100%;
  border-bottom: 46.19px solid var(--glow);
}

.hexagon:after {
  top: 100%;
  width: 0;
  border-top: 46.19px solid var(--glow);
}

.back {
  background-image: url("https://res.cloudinary.com/dbrwtwlwl/image/upload/v1580369339/cube/mysteryBoxBackground_2x_b2espr.png");
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.top {
  background-image: url("https://res.cloudinary.com/dbrwtwlwl/image/upload/v1580369339/cube/mysteryBoxTopFlap_2x_f9cb8g.png");
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.left {
  background-image: url("https://res.cloudinary.com/dbrwtwlwl/image/upload/v1580369339/cube/mysteryBoxLeftFlap_2x_y8u4gz.png");
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.right {
  background-image: url("https://res.cloudinary.com/dbrwtwlwl/image/upload/v1580369339/cube/mysteryBoxRightFlap_2x_abexhh.png");
  background-size: cover;
  background-position: center;
  z-index: 1;
}

#cube {
  animation: hover 1.5s ease-in-out infinite alternate;
  transition: transform 300ms;
  animation-play-state: running;
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
}

@keyframes hover {
  from {
    transform: translateY(-0.5rem);
  }
  to {
    transform: translateY(0.5rem);
  }
}

.powerup {
  background-size: cover;
  border-radius: 50%;
  overflow: hidden;
  height: 48px;
  width: 48px;
  z-index: -5;
  opacity: 0;
}

.cube {
  transform-style: preserve-3d;
  backface-visibility: hidden;
  perspective: 1000px;
  will-change: transform;
}

.top {
  transform-origin: top;
  transform: rotateX(0) translateZ(0);
}

.left {
  transform-origin: left;
  transform: rotateY(0) translateZ(0);
}

.right {
  transform-origin: right;
  transform: rotateY(0) translateZ(0);
}

.back {
  transform: translateZ(-10px);
}
</style>