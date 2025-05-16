<template>
  <div 
    class="container"
    :class="[
      `max-w-${maxWidth}`,
      className || '',
      fullWidth ? 'w-full' : '',
      center ? 'mx-auto' : '',
      fluid ? 'px-0' : 'px-4 md:px-6 lg:px-8'
    ]"
    :style="customStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'screen';
  fullWidth?: boolean;
  center?: boolean;
  fluid?: boolean;
  px?: number | string;
  py?: number | string;
  className?: string;
}

const props = withDefaults(defineProps<ContainerProps>(), {
  maxWidth: 'xl',
  fullWidth: false,
  center: true,
  fluid: false,
  px: undefined,
  py: undefined,
  className: ''
});

const customStyle = computed(() => {
  const style: Record<string, string> = {};
  
  if (props.px !== undefined) {
    style.paddingLeft = typeof props.px === 'number' ? `${props.px}px` : props.px;
    style.paddingRight = typeof props.px === 'number' ? `${props.px}px` : props.px;
  }
  
  if (props.py !== undefined) {
    style.paddingTop = typeof props.py === 'number' ? `${props.py}px` : props.py;
    style.paddingBottom = typeof props.py === 'number' ? `${props.py}px` : props.py;
  }
  
  return style;
});
</script>

<style scoped>
.container {
  width: 100%;
}

/* Max width classes for container */
.max-w-sm {
  max-width: 640px;
}

.max-w-md {
  max-width: 768px;
}

.max-w-lg {
  max-width: 1024px;
}

.max-w-xl {
  max-width: 1280px;
}

.max-w-2xl {
  max-width: 1536px;
}

.max-w-screen {
  max-width: 100vw;
}

.max-w-full {
  max-width: 100%;
}
</style>