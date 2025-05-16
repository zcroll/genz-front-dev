<template>
  <div 
    :class="[
      'spacing',
      x ? `spacing-x-${x}` : '',
      y ? `spacing-y-${y}` : '',
      className || ''
    ]"
    :style="customStyle"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface SpacingProps {
  x?: number | string;
  y?: number | string;
  size?: number | string;
  className?: string;
}

const props = withDefaults(defineProps<SpacingProps>(), {
  x: undefined,
  y: undefined,
  size: undefined,
  className: ''
});

const customStyle = computed(() => {
  const style: Record<string, string> = {};
  
  if (props.size !== undefined) {
    if (props.x !== undefined) {
      style.width = typeof props.size === 'number' ? `${props.size}px` : props.size;
    }
    if (props.y !== undefined) {
      style.height = typeof props.size === 'number' ? `${props.size}px` : props.size;
    }
  }
  
  return style;
});
</script>

<style scoped>
/* Standard spacing classes */
.spacing {
  display: block;
}

/* Horizontal spacing */
.spacing-x-1 { width: 0.25rem; } /* 4px */
.spacing-x-2 { width: 0.5rem; } /* 8px */
.spacing-x-3 { width: 0.75rem; } /* 12px */
.spacing-x-4 { width: 1rem; } /* 16px */
.spacing-x-5 { width: 1.25rem; } /* 20px */
.spacing-x-6 { width: 1.5rem; } /* 24px */
.spacing-x-8 { width: 2rem; } /* 32px */
.spacing-x-10 { width: 2.5rem; } /* 40px */
.spacing-x-12 { width: 3rem; } /* 48px */
.spacing-x-16 { width: 4rem; } /* 64px */
.spacing-x-20 { width: 5rem; } /* 80px */
.spacing-x-24 { width: 6rem; } /* 96px */

/* Vertical spacing */
.spacing-y-1 { height: 0.25rem; } /* 4px */
.spacing-y-2 { height: 0.5rem; } /* 8px */
.spacing-y-3 { height: 0.75rem; } /* 12px */
.spacing-y-4 { height: 1rem; } /* 16px */
.spacing-y-5 { height: 1.25rem; } /* 20px */
.spacing-y-6 { height: 1.5rem; } /* 24px */
.spacing-y-8 { height: 2rem; } /* 32px */
.spacing-y-10 { height: 2.5rem; } /* 40px */
.spacing-y-12 { height: 3rem; } /* 48px */
.spacing-y-16 { height: 4rem; } /* 64px */
.spacing-y-20 { height: 5rem; } /* 80px */
.spacing-y-24 { height: 6rem; } /* 96px */
</style>