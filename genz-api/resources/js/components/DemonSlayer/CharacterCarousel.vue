<template>
    <section class="characters-showcase">
        <!-- Banner -Start -->
        <div class="glass-banner">
            <div class="head-logo pulse-animation">
                <img src="https://www.yudiz.com/codepen/3d-card-hover/logo.png" class="img-fluid" alt="Logo" />
            </div>
            <div class="container">
                <div class="lottie-container">
                    <div class="lottie-item" ref="lottieItem1"></div>
                    <div class="lottie-item" ref="lottieItem2"></div>
                    <div class="lottie-item" ref="lottieItem3"></div>
                    <div class="lottie-item" ref="lottieItem4"></div>
                    <div class="lottie-item" ref="lottieItem5"></div>
                    <div class="lottie-item" ref="lottieItem6"></div>
                </div>
            </div>
        </div>
        <!-- Banner -End -->

        <!-- Characters -Start -->
        <div class="characters-section" id="charactersId">
            <div class="container">
                <h1 ref="titleElement" class="glass-text">Characters</h1>
                <div class="swiper-container position-relative">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(character, index) in characters" :key="index">
                            <div class="glass-card">
                                <div class="glass-effect"></div>
                                <div class="slide-img">
                                    <img :src="character.backgroundImage" class="img-fluid bg-img" alt="Characters" />
                                    <img :src="character.frontImage" class="img-fluid front-img" alt="Characters" />
                                    <h2>{{ character.name }}</h2>
                                </div>
                                <div class="slide-text">
                                    <p>{{ character.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Swiper -->
            </div>
        </div>
        <!-- Characters -End -->
    </section>

    <!-- Page Loader  -->
    <div id="pageLoader" v-if="isLoading">
        <div class="glass-loader">
            <span v-for="(letter, index) in 'Demon Slayer'" :key="index" class="loading-letter">{{ letter }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import SplitType from 'split-type';
import Swiper from 'swiper';
import 'swiper/css';
import { onMounted, ref } from 'vue';
import lottie from 'lottie-web';

const titleElement = ref<HTMLElement | null>(null);
const isLoading = ref(true);

// Lottie animation refs
const lottieItem1 = ref<HTMLElement | null>(null);
const lottieItem2 = ref<HTMLElement | null>(null);
const lottieItem3 = ref<HTMLElement | null>(null);
const lottieItem4 = ref<HTMLElement | null>(null);
const lottieItem5 = ref<HTMLElement | null>(null);
const lottieItem6 = ref<HTMLElement | null>(null);

// Selected Lottie animations
const lottieAnimations = [
    'protagonist_animation.json',
    'architect_animation.json',
    'mediator_animation.json',
    'entertainer_animation.json',
    'commander_animation.json',
    'defender_animation.json'
];

// Character data
const characters = [
    {
        name: 'Inosuke Hashibira',
        backgroundImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-10.png',
        frontImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-10-big.png',
        description: 'A young boy who was raised by his mother Kotoha for a short time until she was murdered by a demon.',
    },
    {
        name: 'Kanae Kocho',
        backgroundImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-09.png',
        frontImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-09-big.png',
        description: "The former Flower Hashira. Shinobu's late biological older sister and Kanao's late adoptive older sister.",
    },
    {
        name: 'Tanjiro Kamado',
        backgroundImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-06.png',
        frontImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-06-big.png',
        description: 'Tanjiro Kamado is the oldest son of charcoal sellers Tanjuro and Kie.',
    },
    {
        name: 'Akaza',
        backgroundImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-07.png',
        frontImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-07-big.png',
        description: 'He considers weak and offers those he considers strong enough to have his respect the chance to become demons.',
    },
    {
        name: 'Nezuko Kamado',
        backgroundImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-12.png',
        frontImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-12-big.png',
        description: "Nezuko Kamado is the oldest daughter of a charcoal-selling family and Tanjiro's younger sister.",
    },
    {
        name: 'Zenitsu Agatsuma',
        backgroundImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-11.png',
        frontImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-11-big.png',
        description: "His cowardly personality is also used to contrast with Tanjiro's determined character.",
    },
    {
        name: 'Tengen Uzui',
        backgroundImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-08.png',
        frontImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-08-big.png',
        description: 'Tengen always strives to do things "flashy". While he is somewhat arrogant and condescending.',
    },
    {
        name: 'Kyojuro Rengoku',
        backgroundImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-13.png',
        frontImage: 'https://www.yudiz.com/codepen/3d-card-hover/character-13-big.png',
        description: 'Kyojuro is pure-hearted and honorable due to his mother instilling in him a moral code of protecting the weak.',
    },
];

onMounted(() => {
    // Handle page loader
    document.documentElement.classList.add('overflow-hidden');
    document.body.classList.add('overflow-hidden');

    setTimeout(() => {
        isLoading.value = false;
        document.documentElement.classList.remove('overflow-hidden');
        document.body.classList.remove('overflow-hidden');

        // Initialize Lottie animations after loader is hidden
        initLottieAnimations();
    }, 3000);

    // Function to initialize Lottie animations
    const initLottieAnimations = () => {
        const lottieRefs = [lottieItem1, lottieItem2, lottieItem3, lottieItem4, lottieItem5, lottieItem6];

        lottieRefs.forEach((ref, index) => {
            if (ref.value && index < lottieAnimations.length) {
                lottie.loadAnimation({
                    container: ref.value,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: `/personality_animations/${lottieAnimations[index]}`,
                });
            }
        });
    };

    // Initialize Swiper only for non-mobile devices
    if (window.innerWidth >= 768) {
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 15,
            freeMode: true,
            grabCursor: true,
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 5,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            },
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1400: {
                    slidesPerView: 5,
                    spaceBetween: 25,
                },
            },
        });
    }

    // Animate title with SplitType
    if (titleElement.value) {
        const split = new SplitType(titleElement.value, { types: 'chars' });
        gsap.from(split.chars, {
            duration: 0.6,
            opacity: 0,
            x: 20,
            stagger: 0.1,
            ease: 'back',
        });
    }

    // Animate lottie elements with GSAP
    const lottieElements = gsap.utils.toArray('.lottie-item') as HTMLElement[];
    const tl = gsap.timeline({ repeat: 0, repeatDelay: 1 });

    // Staggered animation for Lottie elements
    setTimeout(() => {
        // Centre animation
        if (lottieElements[2]) {
            tl.from(lottieElements[2], {
                duration: 1,
                opacity: 0,
                y: -50,
                ease: 'power1.out',
            });
        }

        // Other animations with staggered timing
        if (lottieElements[1] && lottieElements[3]) {
            tl.from([lottieElements[1], lottieElements[3]], {
                duration: 1,
                opacity: 0,
                y: -50,
                stagger: 0.2,
                ease: 'power1.out',
            }, '-=0.7');
        }

        if (lottieElements[0] && lottieElements[4]) {
            tl.from([lottieElements[0], lottieElements[4]], {
                duration: 1,
                opacity: 0,
                y: -50,
                stagger: 0.2,
                ease: 'power1.out',
            }, '-=0.7');
        }
    }, 3200);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

/*===== Common CSS =====*/
* {
    padding: 0;
    margin: 0;
}

:root {
    /* Core color palette */
    --color-primary: #7F7FD5;
    --color-secondary: #91EAE4; 
    --color-tertiary: #86A8E7;
    --color-white: #ffffff;
    --color-slate: rgba(71, 85, 105, 0.9);
    --color-slate-light: rgba(71, 85, 105, 0.7);
    
    /* Glass effects */
    --glass-bg-light: rgba(255, 255, 255, 0.25);
    --glass-bg-medium: rgba(255, 255, 255, 0.35);
    --glass-border: rgba(255, 255, 255, 0.5);
    --glass-shadow: rgba(0, 0, 0, 0.05);
    
    /* Text colors */
    --glass-text: var(--color-slate);
    --glass-text-dim: var(--color-slate-light);
    
    /* Accent colors */
    --glass-accent: rgba(186, 200, 255, 0.7);
    --glass-accent-light: rgba(186, 200, 255, 0.3);
    
    /* Effects */
    --glass-blur-strong: 25px;
    --glass-blur-medium: 15px;
    --glass-blur-light: 10px;
    --neon-glow: 0 0 10px rgba(127, 127, 213, 0.6), 0 0 20px rgba(134, 168, 231, 0.3);
}

::selection {
    background: var(--glass-accent-light);
    color: var(--glass-text);
}

body {
    font-family: 'Orbitron', sans-serif;
    color: var(--glass-text);
    font-size: 16px;
    overflow-x: hidden;
    perspective: 1000px;
}

h1, h2, p {
    font-family: 'Orbitron', sans-serif;
    color: var(--glass-text);
}

img {
    user-select: none;
}

.characters-showcase {
    max-width: 98%;
    width: 1600px;
    margin: 0 auto;
    border-radius: 36px;
    background: var(--glass-bg-light);
    backdrop-filter: blur(var(--glass-blur-strong));
    -webkit-backdrop-filter: blur(var(--glass-blur-strong));
    border: 1px solid var(--glass-border);
    box-shadow: 0 8px 32px 0 var(--glass-shadow);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
}

.glass-text {
    margin-bottom: 48px;
    font-size: 30px;
    font-weight: 400;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-align: center;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary), var(--color-tertiary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: var(--neon-glow);
    position: relative;
}

.glass-text::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary), var(--color-tertiary));
    box-shadow: var(--neon-glow);
}

.container {
    max-width: 98%;
    margin: 0 auto;
    padding: 0 1.5rem;
}

/*===== Logo =====*/
.head-logo {
    position: relative;
    margin-bottom: 48px;
    transition: transform 0.5s ease;
}

.pulse-animation {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
        filter: drop-shadow(0 0 5px rgba(134, 168, 231, 0.7));
    }
    50% {
        transform: scale(1.05);
        filter: drop-shadow(0 0 15px rgba(127, 127, 213, 0.9));
    }
    100% {
        transform: scale(1);
        filter: drop-shadow(0 0 5px rgba(134, 168, 231, 0.7));
    }
}

.head-logo img {
    width: 100px;
    margin: 0 auto;
    display: block;
    filter: brightness(1.1) contrast(1.1);
}

/*===== Banner =====*/
.glass-banner {
    padding: 30px 16px 0;
    background: linear-gradient(180deg, rgba(127, 127, 213, 0.4), transparent);
    backdrop-filter: blur(var(--glass-blur-medium));
    -webkit-backdrop-filter: blur(var(--glass-blur-medium));
    border-bottom: 1px solid var(--glass-border);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 40vh;
    max-height: 50vh;
}

.glass-banner::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(186, 200, 255, 0.2) 100%);
    z-index: 0;
}

.glass-banner .lottie-container {
    width: 100%;
    height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    padding: 0;
    overflow: visible;
}

.glass-banner .lottie-container::after {
    content: '';
    position: absolute;
    inset: 80% 0 8px 30px;
    translate: 0;
    transform: translateZ(110px);
    background: rgba(127, 127, 213, 0.2);
    filter: blur(25px);
    z-index: -1;
    transition:
        rotate 400ms,
        translate 400ms;
    rotate: x calc(20deg * -1);
    border-radius: 100%;
}

.lottie-item {
    position: relative;
    z-index: 2;
    margin: 0 -25px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 0 15px rgba(134, 168, 231, 0.3));
    height: 250px;
    transition: transform 0.3s ease, z-index 0.3s ease;
}

.lottie-item:hover {
    transform: translateY(-8px) scale(1.05);
    z-index: 10;
}

.lottie-item:nth-child(1) { width: 220px; z-index: 2; }
.lottie-item:nth-child(2) { width: 220px; z-index: 3; }
.lottie-item:nth-child(3) { width: 260px; z-index: 4; }
.lottie-item:nth-child(4) { width: 220px; z-index: 3; }
.lottie-item:nth-child(5) { width: 220px; z-index: 2; }
.lottie-item:nth-child(6) { display: none; }

.lottie-item svg {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    filter: drop-shadow(0 0 10px rgba(127, 127, 213, 0.5));
}

/*===== Characters =====*/
.characters-section {
    padding: 45px 20px 30px;
    background: linear-gradient(to bottom, transparent, var(--glass-bg-medium));
    flex-grow: 1;
}

/* Swiper and Cards */
.swiper-container {
    padding: 20px 0;
    overflow: visible;
}

.swiper-slide {
    transition: transform 0.3s ease;
}

.glass-card {
    min-height: 300px;
    padding: 20px 0 0;
    position: relative;
    z-index: 1;
    background: transparent;
    transform-style: preserve-3d;
    perspective: 1000px;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    margin: 0 5px;
}

.glass-effect {
    border-radius: 20px;
    border: 1px solid var(--glass-border);
    background-color: var(--glass-bg-light);
    backdrop-filter: blur(var(--glass-blur-medium));
    -webkit-backdrop-filter: blur(var(--glass-blur-medium));
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 10px 30px 0 var(--glass-shadow);
    transform: translateZ(0);
}

.glass-card:hover .glass-effect {
    background-image: linear-gradient(to top, transparent 46%, rgba(127, 127, 213, 0.3) 68%, rgba(145, 234, 228, 0.3) 97%);
    transform: perspective(1200px) translateY(0) rotateX(20deg) translateZ(10px);
    box-shadow: 0 25px 40px -8px var(--glass-shadow), 0 0 20px rgba(134, 168, 231, 0.3);
    border-color: var(--glass-border);
}

.glass-card::before {
    content: '';
    position: absolute;
    top: 63%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(134, 168, 231, 0.3) 0%, transparent 70%);
    z-index: -2;
    border-radius: 100%;
    transform: translate(-50%, -50%) scaleY(-1);
    filter: blur(40px);
    opacity: 0;
    transition: opacity 0.5s ease;
}

.glass-card:hover::before {
    opacity: 1;
}

.glass-card::after {
    content: '';
    position: absolute;
    inset: 80% 8px 8px;
    translate: 0;
    transform: translateZ(-100px);
    background: rgba(127, 127, 213, 0.1);
    filter: blur(30px);
    z-index: -1;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.glass-card:hover::after {
    rotate: x calc(20deg * -1);
    filter: blur(40px);
}

.glass-card .slide-text {
    min-height: 72px;
    padding: 16px 10px;
    border-radius: 0 0 18px 18px;
    background: var(--glass-bg-medium);
    backdrop-filter: blur(var(--glass-blur-medium));
    -webkit-backdrop-filter: blur(var(--glass-blur-medium));
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    border: 1px solid var(--glass-border);
    border-top: none;
    box-shadow: 0 10px 30px 0 var(--glass-shadow);
    transform: translateZ(0);
}

.glass-card:hover .slide-text {
    opacity: 0;
    transform: translateY(20px);
}

.glass-card .slide-img {
    height: 180px;
    width: 100%;
    margin: 0 auto;
    display: block;
    position: relative;
}

.glass-card .slide-img .bg-img {
    height: 75%;
    width: 100%;
    object-fit: contain;
    object-position: center center;
    position: absolute;
    top: 10px;
    left: 0;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1));
}

.glass-card:hover .slide-img .bg-img {
    opacity: 0;
    transform: translateY(-30px);
}

.glass-card .front-img {
    transform-origin: top;
    opacity: 0;
    position: absolute;
    z-index: 100;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    pointer-events: none;
    transform: translateY(-80px) translateZ(0px);
    filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1));
}

.glass-card:hover .front-img {
    opacity: 1;
    transform: translate3d(0%, -65%, 80px) scale(1.1);
}

.glass-card h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    line-height: normal;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    transform: translateY(16px) translateZ(0px);
    opacity: 0;
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    bottom: 20px;
    color: var(--glass-text);
    text-shadow: 0 2px 5px var(--glass-shadow);
}

.glass-card:hover h2 {
    opacity: 1;
    transform: translate3d(0%, -30%, 60px);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.glass-card .slide-text p {
    margin: 0;
    font-size: 11px;
    font-weight: 300;
    line-height: 1.4;
    letter-spacing: 0.5px;
    color: var(--glass-text-dim);
}

/*===== Page Loader =====*/
#pageLoader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(var(--glass-blur-strong));
    -webkit-backdrop-filter: blur(var(--glass-blur-strong));
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.glass-loader {
    padding: 30px 50px;
    border-radius: 20px;
    background: var(--glass-bg-light);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--glass-border);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.loading-letter {
    display: inline-block;
    animation: letterFloat 2.5s ease-in-out infinite;
    -webkit-animation: letterFloat 2.5s ease-in-out infinite;
    font-size: 28px;
    font-weight: 500;
    color: var(--glass-text);
    text-shadow: 0 0 10px rgba(127, 127, 213, 0.8);
}

@keyframes letterFloat {
    0%, 100% {
        transform: translateY(0);
        text-shadow: 0 0 10px rgba(127, 127, 213, 0.8);
    }
    50% {
        transform: translateY(-15px);
        text-shadow: 0 0 20px rgba(145, 234, 228, 1), 0 0 30px rgba(134, 168, 231, 0.7);
    }
}

/* Add delay to each letter */
.loading-letter:nth-child(1) { animation-delay: 0.1s; }
.loading-letter:nth-child(2) { animation-delay: 0.2s; }
.loading-letter:nth-child(3) { animation-delay: 0.3s; }
.loading-letter:nth-child(4) { animation-delay: 0.4s; }
.loading-letter:nth-child(5) { animation-delay: 0.5s; }
.loading-letter:nth-child(6) { animation-delay: 0.6s; }
.loading-letter:nth-child(7) { animation-delay: 0.7s; }
.loading-letter:nth-child(8) { animation-delay: 0.8s; }
.loading-letter:nth-child(9) { animation-delay: 0.9s; }
.loading-letter:nth-child(10) { animation-delay: 1.0s; }
.loading-letter:nth-child(11) { animation-delay: 1.1s; }
.loading-letter:nth-child(12) { animation-delay: 1.2s; }

/*===== Responsive =====*/
@media (max-width: 767px) {
    .characters-showcase {
        width: 98%;
    }
    
    .container {
        padding: 0 0.75rem;
    }
    
    .glass-banner {
        min-height: 35vh;
    }
    
    .glass-banner .lottie-container {
        height: 220px;
        padding: 0;
        overflow-x: auto;
        justify-content: flex-start;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    
    .lottie-item {
        margin: 0 -15px;
        min-width: 160px;
        height: 160px;
    }
    
    .lottie-item:nth-child(1) { width: 160px; }
    .lottie-item:nth-child(2) { width: 160px; }
    .lottie-item:nth-child(3) { width: 180px; }
    .lottie-item:nth-child(4) { width: 160px; }
    .lottie-item:nth-child(5) { width: 160px; }

    /* Characters */
    .glass-card .front-img {
        scale: 0.85;
    }
    
    .glass-text {
        font-size: 22px;
        margin-bottom: 30px;
    }

    .glass-card .slide-text p {
        font-size: 9px;
        line-height: 1.2;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .glass-card h2 {
        font-size: 14px;
        bottom: 10px;
    }

    .characters-section {
        padding: 24px 8px 16px;
        max-height: 70vh;
        overflow-y: auto;
    }

    /* Swiper */
    .swiper-slide {
        width: 90% !important;
        margin: 0 auto;
    }

    .swiper-slide .glass-card {
        max-width: 280px;
        min-height: 220px;
        margin: 0 auto;
    }

    /* Page Loader */
    .glass-loader {
        padding: 20px 30px;
    }
    
    .loading-letter {
        font-size: 20px;
    }
}

@media (max-width: 575px) {
    .characters-showcase {
        width: 100%;
        border-radius: 24px;
    }

    .glass-text {
        font-size: 18px;
        margin-bottom: 20px;
    }

    .head-logo img {
        width: 70px;
    }

    .glass-banner .lottie-container {
        height: 180px;
    }
    
    .lottie-item {
        margin: 0 -10px;
        min-width: 130px;
        height: 130px;
    }
    
    .lottie-item:nth-child(1) { width: 130px; }
    .lottie-item:nth-child(2) { width: 130px; }
    .lottie-item:nth-child(3) { width: 150px; }
    .lottie-item:nth-child(4) { width: 130px; }
    .lottie-item:nth-child(5) { width: 130px; }

    /* Characters */
    .characters-section {
        padding: 15px 8px 10px;
        max-height: 60vh;
    }

    /* Convert swiper to grid for mobile */
    .swiper-wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 15px;
        padding: 0 10px;
    }

    .swiper-slide {
        width: 100% !important;
        margin-bottom: 0;
    }

    .glass-card {
        min-height: 180px;
        padding: 8px 0 0;
        margin: 0 auto;
        width: 100%;
    }
    
    .glass-effect {
        border-radius: 12px;
    }

    .glass-card .slide-img {
        height: 80px;
    }

    .glass-card .slide-text {
        min-height: 50px;
        padding: 8px 6px;
        border-radius: 0 0 12px 12px;
    }
    
    .glass-card .slide-text p {
        font-size: 8px;
        -webkit-line-clamp: 2;
    }
    
    /* Loader */
    .glass-loader {
        padding: 15px 20px;
    }
    
    .loading-letter {
        font-size: 16px;
    }
}
</style>
