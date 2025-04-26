<script setup>
import { computed } from 'vue';

// --- Props Definition ---
const props = defineProps({
    // Array of layer objects. Each object needs at least 'id' and 'style'.
    // 'content' is recommended.
    // Example layer object: { id: 1, content: 'Layer 1', style: { inset: '10px', backgroundColor: 'blue', zIndex: 2 } }
    layers: {
        type: Array,
        required: true,
        default: () => [] // Default to an empty array
    },

    // Container Props
    perspective: { type: String, default: '1000px' },
    rotateX: { type: String, default: '55deg' },
    rotateY: { type: String, default: '0deg' },
    rotateZ: { type: String, default: '-45deg' },
    containerWidth: { type: String, default: '300px' },
    containerHeight: { type: String, default: '200px' },

    // Layer/Hover Animation Props (apply to all layers via CSS vars)
    layerHoverLift: { type: String, default: '30px' },
    layerScaleHover: { type: Number, default: 1.03 },

    // Shadow Animation Props (apply to all layers via CSS vars)
    shadowInitialTranslate: { type: String, default: '5px' },
    shadowHoverTranslate: { type: String, default: '15px' },
    shadowBlur: { type: String, default: '10px' },
    shadowOpacity: { type: Number, default: 0.6 },
    shadowZOffset: { type: String, default: '-5px' },
});

// --- Computed Styles for Container ---
const wrapperStyle = computed(() => ({
    width: props.containerWidth,
    height: props.containerHeight,
}));

// Computed style object for the perspective container, includes CSS variables
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

// Computed transform string for the isometric view container
const transformStyle = computed(() => ({
    transform: `rotateX(${props.rotateX}) rotateY(${props.rotateY}) rotateZ(${props.rotateZ})`
}));

</script>

<template>
    <div class="iso-stack-wrapper" :style="wrapperStyle">
        <div class="iso-perspective-container" :style="perspectiveStyle">
            <div class="iso-transform-container" :style="transformStyle">

                <!-- Loop through the layers prop -->
                <div
                    v-for="layer in layers"
                    :key="layer.id"
                    class="iso-layer"
                    :style="layer.style"
                >
                    <!-- Render layer content (Use v-html cautiously if content includes HTML) -->
                    <div class="iso-layer-content" v-if="layer.content" v-html="layer.content"></div>
                    <!-- Or for plain text: -->
                    <!-- <div class="iso-layer-content" v-if="layer.content">{{ layer.content }}</div> -->
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
/* Scoped styles apply only to this component's elements */

/* --- Containers --- */
.iso-stack-wrapper {
    position: relative; /* Adjust as needed for layout */
    margin: 3em auto; /* Example margin */
    /* Width/Height set by :style binding */
}

.iso-perspective-container {
    position: relative;
    width: 100%;
    height: 100%;
    /* Perspective and CSS vars set by :style binding */
}

.iso-transform-container {
    position: absolute;
    inset: 0; /* Fill perspective container */
    transform-style: preserve-3d;
    /* Transform (rotation) set by :style binding */
}

/* --- Layer Base Styling --- */
.iso-layer {
    /* === Core Layer Positioning and 3D Setup === */
    position: absolute;
    /* Specific position/size/background/z-index MUST be provided via layer.style prop */
    /* Example defaults if not provided (though style prop is expected) */
    /* inset: 10px; */
    /* background-color: #eee; */
    /* z-index: 1; */

    box-sizing: border-box; /* Ensures padding/border are included in width/height */
    cursor: pointer;
    transform-origin: center center;
    transform-style: preserve-3d; /* Crucial for ::after positioning */
    transition: transform 0.3s ease-out, z-index 0s 0.3s; /* Delay z-index reset */
    /* A slight initial lift helps prevent z-fighting if layers are perfectly flat */
    transform: translateZ(1px);

    /* Default styles that can be overridden by layer.style */
    padding: 1em;
    border-radius: 8px;
    color: #333;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Subtle base shadow */
    overflow: hidden; /* Hide content overflow */
}

/* Container for layer content if needed for more complex layouts */
.iso-layer-content {
    position: relative; /* Allows z-index stacking within the layer if needed */
    z-index: 1; /* Ensure content is above the ::after pseudo-element */
}


/* === Layer Hover Effect === */
.iso-layer:hover {
    /* Use CSS variables defined in the perspective container */
    /* Applying scale separately to avoid overriding initial translateZ from style */
    transform: translateZ(var(--layer-hover-lift)) scale(var(--layer-scale-hover));
    /* Bring to front (ensure this value is higher than any initial z-index) */
    z-index: 100 !important; /* Use !important cautiously, or ensure initial z-indices are lower */
    transition: transform 0.3s ease-out, z-index 0s 0s; /* Apply z-index immediately on hover */
}

/* === Shadow Pseudo-Element (Common styling for all layers) === */
.iso-layer::after {
    content: '';
    position: absolute;
    inset: 0; /* Match the layer's boundary */
    background: rgba(0, 0, 0, 0.6); /* Base shadow color */
    border-radius: inherit; /* Match layer's border radius */
    filter: blur(var(--shadow-blur));
    opacity: 0; /* Hidden initially */
    transform-origin: center center;
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
    /* Position behind the layer's content - z-index: -1 might not work well with preserve-3d children */
    /* Instead, rely on translateZ and ensure content has z-index: 1 */
    /* Initial position using CSS vars */
    transform: translateZ(var(--shadow-z-offset)) translateX(var(--shadow-initial-translate)) translateY(var(--shadow-initial-translate));
    /* Ensure shadow is behind content */
    z-index: 0;
}

/* === Shadow Hover Effect === */
.iso-layer:hover::after {
    opacity: var(--shadow-opacity);
    /* Hover position using CSS vars */
    transform: translateZ(var(--shadow-z-offset)) translateX(var(--shadow-hover-translate)) translateY(var(--shadow-hover-translate));
}
</style>
