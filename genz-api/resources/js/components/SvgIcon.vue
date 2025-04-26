<script setup>
import { computed } from 'vue';
import * as icons from 'lucide-vue-next';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    size: {
        type: [Number, String],
        default: 24
    },
    color: {
        type: String,
        default: 'currentColor'
    },
    strokeWidth: {
        type: [Number, String],
        default: 2
    }
});

const icon = computed(() => {
    // Convert kebab-case to PascalCase for Lucide icons
    const iconName = props.name
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
    
    return (icons)[iconName] || null;
});
</script>

<template>
    <component 
        v-if="icon" 
        :is="icon" 
        :size="size" 
        :color="color" 
        :stroke-width="strokeWidth" 
    />
    <span v-else class="missing-icon">?</span>
</template>

<style scoped>
.missing-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    font-weight: bold;
}
</style>
