<script setup>
const props = defineProps({
  opacity: {
    type: Number,
    default: 0.1
  },
  color: {
    type: String,
    default: '#000'
  }
});
</script>

<template>
  <div class="card-pattern" :style="{ opacity: opacity }">
    <svg width="100%" height="100%" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <g :fill="color">
        <!-- Stylized paisley/floral pattern -->
        <path d="M50,30 C60,10 80,20 70,40 C90,30 100,50 80,60 C100,70 90,90 70,80 C80,100 60,110 50,90 C40,110 20,100 30,80 C10,90 0,70 20,60 C0,50 10,30 30,40 C20,20 40,10 50,30 Z" transform="scale(0.2) translate(100, 100)" />
        <path d="M50,30 C60,10 80,20 70,40 C90,30 100,50 80,60 C100,70 90,90 70,80 C80,100 60,110 50,90 C40,110 20,100 30,80 C10,90 0,70 20,60 C0,50 10,30 30,40 C20,20 40,10 50,30 Z" transform="scale(0.15) translate(500, 200)" />
        <path d="M50,30 C60,10 80,20 70,40 C90,30 100,50 80,60 C100,70 90,90 70,80 C80,100 60,110 50,90 C40,110 20,100 30,80 C10,90 0,70 20,60 C0,50 10,30 30,40 C20,20 40,10 50,30 Z" transform="scale(0.25) translate(300, 500)" />
        
        <!-- Additional decorative elements -->
        <circle cx="50" cy="50" r="5" transform="scale(0.5) translate(100, 100)" />
        <circle cx="150" cy="150" r="3" transform="scale(0.5) translate(100, 100)" />
        <circle cx="250" cy="50" r="4" transform="scale(0.5) translate(100, 100)" />
        
        <!-- Swirls and curves -->
        <path d="M10,50 Q50,0 90,50 T170,50" stroke-width="2" fill="none" :stroke="color" transform="scale(0.5) translate(150, 250)" />
        <path d="M10,50 Q50,100 90,50 T170,50" stroke-width="2" fill="none" :stroke="color" transform="scale(0.5) translate(150, 50)" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.card-pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
</style>
