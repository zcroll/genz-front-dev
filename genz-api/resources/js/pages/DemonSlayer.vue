<template>
    <div class="demon-slayer-backdrop">
        <div class="glass-orbs">
            <div class="orb orb-1"></div>
            <div class="orb orb-2"></div>
            <div class="orb orb-3"></div>
        </div>
        <div class="demon-slayer-container">
            <CharacterCarousel />
        </div>
    </div>
</template>

<script setup lang="ts">
import CharacterCarousel from '../components/DemonSlayer/CharacterCarousel.vue';
</script>

<style scoped>
.demon-slayer-backdrop {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f8faff, #eef1f8);
    position: relative;
    overflow: hidden;
}

.glass-orbs {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
}

.orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0.5;
}

.orb-1 {
    background: radial-gradient(circle, rgba(186, 200, 255, 0.7), rgba(168, 191, 255, 0.3));
    width: 50vw;
    height: 50vw;
    top: -15%;
    left: -15%;
    animation: float-1 30s infinite ease-in-out;
}

.orb-2 {
    background: radial-gradient(circle, rgba(145, 234, 228, 0.7), rgba(145, 234, 228, 0.2));
    width: 40vw;
    height: 40vw;
    bottom: -10%;
    right: -10%;
    animation: float-2 25s infinite ease-in-out;
}

.orb-3 {
    background: radial-gradient(circle, rgba(127, 127, 213, 0.4), rgba(134, 168, 231, 0.2));
    width: 35vw;
    height: 35vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: float-3 40s infinite ease-in-out;
}

@keyframes float-1 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(5%, 5%); }
}

@keyframes float-2 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-7%, -3%); }
}

@keyframes float-3 {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-50%, -50%) scale(1.2); }
}

.demon-slayer-container {
    max-width: 98%;
    width: 1600px;
    position: relative;
    z-index: 1;
    padding: 1.5rem;
    box-sizing: border-box;
}

@media (max-width: 768px) {
    .orb-1, .orb-2, .orb-3 {
        opacity: 0.4;
    }
    .demon-slayer-container {
        padding: 1rem;
        max-width: 100%;
    }
}
</style>
