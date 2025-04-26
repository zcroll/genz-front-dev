/**
 * Motion utilities for animations
 */

/**
 * Check if the user prefers reduced motion
 * @returns {boolean} True if the user prefers reduced motion
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get animation duration based on user preferences
 * @param {number} duration - The default duration in milliseconds
 * @returns {number} The adjusted duration based on user preferences
 */
export function getAnimationDuration(duration) {
  return prefersReducedMotion() ? 0 : duration;
}

/**
 * Common animation presets
 */
export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }
  },
  
  rotate: {
    initial: { rotate: -5, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

/**
 * Generate staggered animation variants for children
 * @param {number} staggerAmount - The stagger amount in seconds
 * @returns {Object} Animation variants with staggered children
 */
export function createStaggeredAnimations(staggerAmount = 0.05) {
  return {
    container: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: { 
          staggerChildren: staggerAmount,
          delayChildren: 0.1
        }
      }
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' }
      }
    }
  };
}
