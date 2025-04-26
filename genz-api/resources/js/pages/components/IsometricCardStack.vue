<script setup>
import { ref, computed } from 'vue';

// --- Props Definition ---
const props = defineProps({
    // Array of card objects. Each object should have:
    // id: unique string
    // rank: string (e.g., 'Q', 'K', '10', 'A')
    // suit: string ('hearts', 'diamonds', 'clubs', 'spades')
    // descriptionTitle: string
    // descriptionText: string
    // style: object (for initial zIndex, position like inset, etc.)
    cards: {
        type: Array,
        required: true,
        default: () => []
    },

    // Container Customization
    perspective: { type: String, default: '1200px' },
    rotateX: { type: String, default: '60deg' },
    rotateY: { type: String, default: '0deg' },
    rotateZ: { type: String, default: '-45deg' },
    containerWidth: { type: String, default: '250px' }, // Width of the card stack area
    containerHeight: { type: String, default: '350px' }, // Height of the card stack area

    // Animation Customization (via CSS Variables)
    layerHoverLift: { type: String, default: '40px' },
    layerScaleHover: { type: Number, default: 1.05 },
    shadowInitialTranslate: { type: String, default: '8px' },
    shadowHoverTranslate: { type: String, default: '20px' },
    shadowBlur: { type: String, default: '15px' },
    shadowOpacity: { type: Number, default: 0.5 },
    shadowZOffset: { type: String, default: '-10px' },
});

// --- State ---
const activeCardId = ref(null); // Track the ID of the currently hovered card

// --- Computed Properties ---

// Style for the main layout wrapper
const layoutStyle = computed(() => ({
    // Potentially add more layout-related styles if needed
}));

// Style for the isometric stack's immediate wrapper
const stackWrapperStyle = computed(() => ({
    width: props.containerWidth,
    height: props.containerHeight,
}));

// Style for the perspective container (sets CSS vars)
const perspectiveStyle = computed(() => ({
    perspective: props.perspective,
    '--layer-hover-lift': props.layerHoverLift,
    '--layer-scale-hover': props.layerScaleHover,
    '--shadow-initial-translate': props.shadowInitialTranslate,
    '--shadow-hover-translate': props.shadowHoverTranslate,
    '--shadow-blur': props.shadowBlur,
    '--shadow-opacity': props.shadowOpacity,
    '--shadow-z-offset': props.shadowZOffset,
}));

// Style for the element that applies the isometric rotation
const transformStyle = computed(() => ({
    transform: `rotateX(${props.rotateX}) rotateY(${props.rotateY}) rotateZ(${props.rotateZ})`
}));

// Determine card color based on suit
const getCardColor = (suit) => {
    return (suit === 'hearts' || suit === 'diamonds') ? 'red' : 'black';
};

// Get Unicode suit symbol
const getSuitSymbol = (suit) => {
    switch (suit) {
        case 'hearts': return '♥';
        case 'diamonds': return '♦';
        case 'clubs': return '♣';
        case 'spades': return '♠';
        default: return '?';
    }
};

// --- Event Handlers ---
const handleMouseEnter = (cardId) => {
    activeCardId.value = cardId;
};

const handleMouseLeave = () => {
    activeCardId.value = null;
};

</script>

<template>
    <div class="stack-layout" :style="layoutStyle">
        <!-- Card Stack Area (Left) -->
        <div class="iso-stack-wrapper" :style="stackWrapperStyle">
            <div class="iso-perspective-container" :style="perspectiveStyle">
                <div class="iso-transform-container" :style="transformStyle">

                    <!-- Render Cards -->
                    <div
                        v-for="card in cards"
                        :key="card.id"
                        :class="['iso-card', getCardColor(card.suit)]"
                        :style="card.style"
                        @mouseenter="handleMouseEnter(card.id)"
                        @mouseleave="handleMouseLeave"
                    >
                        <div class="card-content">
                            <span class="rank">{{ card.rank }}</span>
                            <span class="suit">{{ getSuitSymbol(card.suit) }}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- Description Panel Area (Right) -->
        <div class="description-panel">
            <div class="description-inner">
                <div
                    v-for="card in cards"
                    :key="card.id + '-desc'"
                    :class="['description-section', { active: activeCardId === card.id }]"
                >
                    <h3>{{ card.descriptionTitle }}</h3>
                    <p>{{ card.descriptionText }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* --- Main Layout --- */
.stack-layout {
    display: flex;
    gap: 2rem; /* Space between stack and description */
    align-items: center; /* Vertically align center */
    padding: 2rem;
    /* background-color: #f0f4f8; */ /* Optional background for context */
    min-height: 450px; /* Ensure enough height */
    overflow: hidden; /* Prevent unwanted overflow */
}

/* --- Isometric Stack Area --- */
.iso-stack-wrapper {
    position: relative; /* Needed for absolute children */
    /* width/height set by prop */
    flex-shrink: 0; /* Prevent shrinking */
}

.iso-perspective-container {
    position: relative;
    width: 100%;
    height: 100%;
    /* perspective and CSS vars set by prop */
}

.iso-transform-container {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
    /* transform (rotation) set by prop */
}

/* --- Card Styling --- */
.iso-card {
    position: absolute;
    /* Default size/position - MUST be overridden by card.style.inset or top/left/etc. */
    /* Example: inset: 10px; */
    width: 75%; /* Example relative width */
    height: 80%; /* Example relative height */
    background-color: white;
    border-radius: 8px; /* Rounded corners like playing cards */
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    cursor: pointer;
    transform-origin: center center;
    transform-style: preserve-3d;
    transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1),
    z-index 0s 0.35s; /* Delay z-index reset */
    transform: translateZ(1px); /* Initial slight lift */
    overflow: hidden;
    font-family: 'Georgia', serif; /* Font similar to cards */
    font-size: 1.8em; /* Base size for rank/suit */
    line-height: 1;
}

.card-content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0.3em 0.4em; /* Padding inside the card */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Pushes rank/suit to corners */
    z-index: 1; /* Ensure content is above pseudo elements */
}

/* Styling for Rank and Suit */
.card-content .rank,
.card-content .suit {
    display: block;
    font-weight: bold;
}
.card-content .suit {
    font-size: 1.1em; /* Make suit symbol slightly larger */
    text-align: center; /* Center the main large suit */
    margin-top: -0.2em; /* Adjust vertical spacing */
}

/* Add corner symbols using pseudo-elements */
.card-content::before,
.card-content::after {
    content: attr(data-rank) '\A' attr(data-suit); /* Content is rank + line break + suit */
    white-space: pre; /* Respect the line break */
    position: absolute;
    font-size: 0.4em; /* Smaller font for corners */
    line-height: 1.1;
    font-weight: normal;
}
.card-content::before {
    top: 0.5em;
    left: 0.5em;
    text-align: left;
}
.card-content::after {
    bottom: 0.5em;
    right: 0.5em;
    transform: rotate(180deg); /* Flip bottom right */
    text-align: left; /* Keep text aligned left relative to its rotated box */
}

/* Set the data attributes dynamically (this requires a bit of a trick or component logic) */
/* We'll apply color directly instead */
.iso-card.red .card-content .rank,
.iso-card.red .card-content .suit,
.iso-card.red .card-content::before,
.iso-card.red .card-content::after {
    color: #D63031; /* Red color */
}
.iso-card.black .card-content .rank,
.iso-card.black .card-content .suit,
.iso-card.black .card-content::before,
.iso-card.black .card-content::after {
    color: #2d3436; /* Dark gray/black */
}

/* --- Card Hover & Shadow --- */
.iso-card:hover {
    transform: translateZ(var(--layer-hover-lift)) scale(var(--layer-scale-hover));
    z-index: 100 !important; /* Ensure hovered card is always on top */
    transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1),
    z-index 0s 0s; /* Immediate z-index on hover */
}

.iso-card::after { /* The shadow */
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    border-radius: inherit;
    filter: blur(var(--shadow-blur));
    opacity: 0;
    transform-origin: center center;
    transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1),
    opacity 0.35s ease-out;
    transform: translateZ(var(--shadow-z-offset)) translateX(var(--shadow-initial-translate)) translateY(var(--shadow-initial-translate));
    z-index: 0; /* Behind card content */
}

.iso-card:hover::after {
    opacity: var(--shadow-opacity);
    transform: translateZ(var(--shadow-z-offset)) translateX(var(--shadow-hover-translate)) translateY(var(--shadow-hover-translate));
}


/* --- Description Panel (Right) --- */
.description-panel {
    width: 300px; /* Fixed width for description */
    height: 350px; /* Match container height or adjust */
    flex-shrink: 0; /* Prevent shrinking */
    position: relative; /* For absolute positioning of sections */
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    overflow: hidden; /* Clip content during transitions */
}
.description-inner {
    position: relative;
    width: 100%;
    height: 100%;
}

.description-section {
    position: absolute;
    inset: 0; /* Make all sections fill the panel */
    padding: 1.5rem;
    box-sizing: border-box;
    opacity: 0;
    transform: translateY(15px); /* Start slightly down */
    transition: opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    pointer-events: none; /* Prevent interaction when hidden */
    background-color: #ffffff; /* Ensure background covers others */
    z-index: 1; /* Base z-index */
}

.description-section.active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
    z-index: 2; /* Bring active section to the top */
}

.description-section h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: #333;
    font-size: 1.25rem;
}

.description-section p {
    margin: 0;
    color: #555;
    font-size: 0.95rem;
    line-height: 1.6;
}

</style>
