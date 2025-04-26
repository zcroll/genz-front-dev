/**
 * Custom Tailwind CSS plugin for animations
 */
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addUtilities, theme, variants }) {
  const animationUtilities = {
    // Fan-out animation
    '.animate-fan-out': {
      animation: 'fan-out 0.6s ease-out forwards',
    },
    '.animate-fan-in': {
      animation: 'fan-in 0.5s ease-in forwards',
    },
    
    // Card flip animations
    '.animate-flip': {
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    '.animate-flip-front': {
      backfaceVisibility: 'hidden',
      transform: 'rotateY(0deg)',
    },
    '.animate-flip-back': {
      backfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)',
    },
    '.flipped .animate-flip-front': {
      transform: 'rotateY(-180deg)',
    },
    '.flipped .animate-flip-back': {
      transform: 'rotateY(0deg)',
    },
    
    // Float animations
    '.animate-float': {
      animation: 'float 3s ease-in-out infinite',
    },
    '.animate-float-slow': {
      animation: 'float 5s ease-in-out infinite',
    },
    
    // Pulse animations
    '.animate-pulse-subtle': {
      animation: 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
    
    // Fade animations
    '.animate-fade-in': {
      animation: 'fade-in 0.5s ease-out forwards',
    },
    '.animate-fade-out': {
      animation: 'fade-out 0.5s ease-in forwards',
    },
    
    // Scale animations
    '.animate-scale-in': {
      animation: 'scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
    },
    '.animate-scale-out': {
      animation: 'scale-out 0.2s ease-in forwards',
    },
    
    // Motion-safe variants
    '.motion-safe\\:animate-fan-out': {
      '@media (prefers-reduced-motion: no-preference)': {
        animation: 'fan-out 0.6s ease-out forwards',
      },
    },
    '.motion-safe\\:animate-fan-in': {
      '@media (prefers-reduced-motion: no-preference)': {
        animation: 'fan-in 0.5s ease-in forwards',
      },
    },
    '.motion-safe\\:animate-float': {
      '@media (prefers-reduced-motion: no-preference)': {
        animation: 'float 3s ease-in-out infinite',
      },
    },
  };
  
  const keyframes = {
    '@keyframes fan-out': {
      '0%': {
        transform: 'translateY(0) rotate(0) scale(0.95)',
        opacity: '0.5',
      },
      '100%': {
        transform: 'translateY(0) rotate(var(--fan-angle, 0deg)) translateX(var(--fan-distance, 0px)) scale(1)',
        opacity: '1',
      },
    },
    '@keyframes fan-in': {
      '0%': {
        transform: 'translateY(0) rotate(var(--fan-angle, 0deg)) translateX(var(--fan-distance, 0px)) scale(1)',
        opacity: '1',
      },
      '100%': {
        transform: 'translateY(0) rotate(0) scale(0.95)',
        opacity: '0.5',
      },
    },
    '@keyframes float': {
      '0%, 100%': {
        transform: 'translateY(0)',
      },
      '50%': {
        transform: 'translateY(-10px)',
      },
    },
    '@keyframes pulse-subtle': {
      '0%, 100%': {
        opacity: '1',
      },
      '50%': {
        opacity: '0.8',
      },
    },
    '@keyframes fade-in': {
      '0%': {
        opacity: '0',
      },
      '100%': {
        opacity: '1',
      },
    },
    '@keyframes fade-out': {
      '0%': {
        opacity: '1',
      },
      '100%': {
        opacity: '0',
      },
    },
    '@keyframes scale-in': {
      '0%': {
        transform: 'scale(0.9)',
        opacity: '0',
      },
      '100%': {
        transform: 'scale(1)',
        opacity: '1',
      },
    },
    '@keyframes scale-out': {
      '0%': {
        transform: 'scale(1)',
        opacity: '1',
      },
      '100%': {
        transform: 'scale(0.9)',
        opacity: '0',
      },
    },
  };
  
  addUtilities(animationUtilities);
  addUtilities(keyframes);
});
