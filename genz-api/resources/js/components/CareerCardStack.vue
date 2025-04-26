<script setup>
import { ref, computed } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';

// --- Props Definition ---
const props = defineProps({
    // Title for the stack (optional)
    title: { type: String, default: '' },

    // Whether to show the description panel
    showDescription: { type: Boolean, default: true },
    // Array of career card objects. Each object should have:
    // id: unique string
    // title: string (e.g., 'Artistic', 'Investigative', 'Social')
    // category: string ('holland', 'personality', 'skill', 'career')
    // icon: string (icon name from lucide-vue-next)
    // color: string (hex color code or tailwind class)
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
    containerWidth: { type: String, default: '300px' }, // Width of the card stack area
    containerHeight: { type: String, default: '400px' }, // Height of the card stack area

    // Animation Customization (via CSS Variables)
    layerHoverLift: { type: String, default: '40px' },
    layerScaleHover: { type: Number, default: 1.05 },
    shadowInitialTranslate: { type: String, default: '8px' },
    shadowHoverTranslate: { type: String, default: '20px' },
    shadowBlur: { type: String, default: '15px' },
    shadowOpacity: { type: Number, default: 0.5 },
    shadowZOffset: { type: String, default: '-10px' },

    // Language options
    locale: { type: String, default: 'en' }, // 'en' or 'fr'
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

// Get category-specific styling
const getCategoryStyle = (category) => {
    switch (category) {
        case 'holland':
            return 'holland-card';
        case 'personality':
            return 'personality-card';
        case 'skill':
            return 'skill-card';
        case 'career':
            return 'career-card';
        default:
            return '';
    }
};

// --- Event Handlers ---
const handleMouseEnter = (cardId) => {
    activeCardId.value = cardId;
};

const handleMouseLeave = () => {
    activeCardId.value = null;
};

// --- Emits ---
const emit = defineEmits(['card-click', 'card-hover']);

const handleCardClick = (card) => {
    emit('card-click', card);
};

const handleCardHover = (card) => {
    emit('card-hover', card);
};

// Get localized text based on locale prop
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
                        :class="['iso-card', getCategoryStyle(card.category)]"
                        :style="[card.style, { backgroundColor: card.color || '#ffffff' }]"
                        @mouseenter="handleMouseEnter(card.id); handleCardHover(card)"
                        @mouseleave="handleMouseLeave"
                        @click="handleCardClick(card)"
                    >
                        <div class="card-content">
                            <div class="card-header">
                                <span class="card-title">{{ card.title }}</span>
                                <span v-if="card.icon" class="card-icon">
                                    <SvgIcon :name="card.icon" />
                                </span>
                            </div>
                            <div class="card-body">
                                <!-- Card body content can be added here -->
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- Description Panel Area (Right) -->
        <div v-if="showDescription" class="description-panel">
            <div class="description-inner">
                <div
                    v-for="card in cards"
                    :key="card.id + '-desc'"
                    :class="['description-section', { active: activeCardId === card.id }]"
                >
                    <h3>{{ getLocalizedText(card).title }}</h3>
                    <p>{{ getLocalizedText(card).text }}</p>
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
    min-height: 450px; /* Ensure enough height */
    overflow: hidden; /* Prevent unwanted overflow */
}

/* --- Isometric Stack Area --- */
.iso-stack-wrapper {
    position: relative; /* Needed for absolute children */
    flex-shrink: 0; /* Prevent shrinking */
}

.iso-perspective-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.iso-transform-container {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
}

/* --- Card Styling --- */
.iso-card {
    position: absolute;
    width: 75%; /* Example relative width */
    height: 80%; /* Example relative height */
    background-color: white;
    border-radius: 12px; /* Slightly more rounded for modern look */
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    cursor: pointer;
    transform-origin: center center;
    transform-style: preserve-3d;
    transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1),
                z-index 0s 0.35s; /* Delay z-index reset */
    transform: translateZ(1px); /* Initial slight lift */
    overflow: hidden;
    font-family: 'Inter', 'Roboto', sans-serif; /* Modern font */
}

.card-content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1.25rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    z-index: 1;
    background-image: linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(0,0,0,0.05));
    border-radius: inherit;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.card-title {
    font-weight: 600;
    font-size: 1.25rem;
    color: #333;
}

.card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background-color: rgba(255,255,255,0.3);
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: transform 0.2s ease;
}

.iso-card:hover .card-icon {
    transform: scale(1.1);
}

.card-body {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Category-specific styling */
.holland-card {
    border-bottom: 4px solid #4F46E5; /* Indigo */
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
}

.personality-card {
    border-bottom: 4px solid #10B981; /* Emerald */
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
}

.skill-card {
    border-bottom: 4px solid #F59E0B; /* Amber */
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);
}

.career-card {
    border-bottom: 4px solid #EC4899; /* Pink */
    box-shadow: 0 4px 12px rgba(236, 72, 153, 0.15);
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
    width: 350px; /* Slightly wider for more content */
    height: 400px; /* Match container height or adjust */
    flex-shrink: 0; /* Prevent shrinking */
    position: relative; /* For absolute positioning of sections */
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
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
    padding: 1.75rem;
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
    margin-bottom: 1rem;
    color: #111827;
    font-size: 1.5rem;
    font-weight: 600;
    position: relative;
    padding-bottom: 0.75rem;
}

.description-section h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 3rem;
    height: 3px;
    background: linear-gradient(to right, #4F46E5, #10B981);
    border-radius: 3px;
}

.description-section p {
    margin: 0;
    color: #4B5563;
    font-size: 1rem;
    line-height: 1.7;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .stack-layout {
        flex-direction: column;
        gap: 3rem;
    }

    .description-panel {
        width: 100%;
    }
}
</style>
