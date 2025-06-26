<template>
  <div class="info-graphic transition-all duration-300 ease-in-out border"
       :class="[themeStyles.containerBg, themeStyles.textColor, themeStyles.borderColor]"
       :style="styles.container">
    <!-- Question Header -->
    <div class="question-container" :style="styles.questionContainer">
      <span v-if="questionId" class="question-number flex items-center justify-center rounded-full w-6 h-6 text-white text-sm font-medium mr-2.5 transition-colors duration-300" :class="themeStyles.questionNumberBg">{{ questionId }}</span>
      <span class="question" :style="styles.question">{{ question }}</span>
    </div>

    <!-- Data Values Display -->
    <div class="values-container flex justify-between mb-1.5">
      <div v-for="(item, index) in data" :key="index" class="value-display flex flex-col items-center"
           :style="{ width: `${item.value}%` }">
        <span class="value-number text-2xl font-bold">{{ item.value }}</span>
        <span class="value-percent text-sm transition-colors duration-300" :class="themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-500'">%</span>
      </div>
    </div>

    <!-- Bar Graph -->
    <div class="bar-container h-9 rounded overflow-hidden mt-4 mb-4 flex transition-colors duration-300" :class="themeStyles.barBg" :style="styles.barContainer">
      <div v-for="(segment, index) in barSegments" :key="index"
           class="bar-segment"
           :style="{
             width: segment.width,
             backgroundColor: segment.backgroundColor,
             height: '100%',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             color: 'white',
             fontWeight: 'bold',
             fontSize: '14px'
           }">
        <span v-if="parseFloat(segment.width) > 20">{{ data[index].label }}</span>
      </div>
    </div>

    <!-- Legend -->
    <div class="legend-container" :style="styles.legendContainer">
      <div v-for="(item, index) in data" :key="index" class="legend-item" :style="styles.legendItem">
        <div class="legend-dot" :style="{ ...styles.legendDot, backgroundColor: item.color }"></div>
        <span>{{ item.label }} ({{ item.value }}%)</span>
      </div>
    </div>

    <!-- Caption -->
    <div class="caption text-sm mt-2.5 leading-relaxed transition-colors duration-300" :class="themeStyles.captionColor" :style="styles.caption">
      {{ caption }}
    </div>
  </div>
</template>

<script>
// Define default styles in a separate script block
export const defaultStyles = {
  container: {
    width: '100%'
  },
  questionContainer: {
    marginBottom: '15px'
  },
  questionNumber: {},
  question: {
    fontSize: '18px',
    fontWeight: 'bold'
  },
  barContainer: {
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
  },
  legendContainer: {},
  legendItem: {},
  legendDot: {},
  caption: {}
};
</script>

<script setup>
import { computed } from 'vue';
import { useThemeStore } from '@/stores/theme/themeStore.js';

// Helper function to get hex colors for themes when CSS variables aren't available
function getHexColorForTheme(colorName, shade, isDark) {
  // Default color map for common themes
  const colorMap = {
    blue: {
      '500': isDark ? '3b82f6' : '3b82f6',
      '600': isDark ? '2563eb' : '2563eb',
      '700': isDark ? '1d4ed8' : '1d4ed8',
      '800': isDark ? '1e40af' : '1e40af'
    },
    green: {
      '500': isDark ? '10b981' : '10b981',
      '600': isDark ? '059669' : '059669',
      '700': isDark ? '047857' : '047857',
      '800': isDark ? '065f46' : '065f46'
    },
    purple: {
      '500': isDark ? '8b5cf6' : '8b5cf6',
      '600': isDark ? '7c3aed' : '7c3aed',
      '700': isDark ? '6d28d9' : '6d28d9',
      '800': isDark ? '5b21b6' : '5b21b6'
    },
    amber: {
      '500': isDark ? 'f59e0b' : 'f59e0b',
      '600': isDark ? 'd97706' : 'd97706',
      '700': isDark ? 'b45309' : 'b45309',
      '800': isDark ? '92400e' : '92400e'
    },
    gray: {
      '500': isDark ? '6b7280' : '6b7280',
      '600': isDark ? '4b5563' : '4b5563',
      '700': isDark ? '374151' : '374151',
      '800': isDark ? '1f2937' : '1f2937'
    }
  };

  // Return the color from the map or a default color
  return colorMap[colorName]?.[shade] || (isDark ? '6b7280' : '6b7280'); // Default to gray-500
}

// Initialize theme store
const themeStore = useThemeStore();

// Get current theme colors
const themeColor = computed(() => {
  // Check if currentTheme exists and has primary property
  if (themeStore.currentTheme && themeStore.currentTheme.primary) {
    return themeStore.currentTheme.primary;
  }

  // Fallback to currentThemeId which should be 'blue-theme', 'green-theme', etc.
  const themeId = themeStore.currentThemeId || 'blue-theme';
  return themeId.replace('-theme', '');
});

// Get theme-based styles
const themeStyles = computed(() => {
  // Safely access isDarkMode with fallback
  const isDark = typeof themeStore.isDarkMode === 'boolean' ? themeStore.isDarkMode : false;
  const color = themeColor.value || 'blue';

  return {
    questionNumberBg: isDark ? `bg-${color}-700` : `bg-${color}-500`,
    barBg: isDark ? 'bg-gray-700' : 'bg-gray-200',
    containerBg: isDark ? 'bg-gray-800/30' : 'bg-white',
    textColor: isDark ? 'text-gray-200' : 'text-gray-800',
    captionColor: isDark ? 'text-gray-300' : 'text-gray-600',
    borderColor: isDark ? `border-gray-700` : `border-gray-200`
  };
});

const props = defineProps({
  questionId: {
    type: Number,
    required: false
  },
  question: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  styles: {
    type: Object,
    default: () => defaultStyles
  }
});

// Compute bar segments based on data
const barSegments = computed(() => {
  // If custom colors are provided in data, use them, otherwise use theme colors
  return props.data.map((item, index) => {
    // Use provided color or fallback to theme colors with different shades
    // Make sure item.color exists and themeColor.value is defined
    const useCustomColor = item.color && themeColor.value && !item.color.includes(`${themeColor.value}`);

    // For theme colors, use Tailwind classes based on the current theme
    let bgColor;
    if (useCustomColor) {
      bgColor = item.color; // Use the custom color directly
    } else {
      // Use theme colors with different shades for visual distinction
      const colorName = themeColor.value || 'blue';
      // Use different shades for visual distinction between segments
      const shades = ['500', '600', '700', '800'];
      const shade = shades[index % shades.length];

      // Use the theme color with appropriate shade
      // Check if we're using CSS variables or direct Tailwind classes
      // Use try-catch to handle SSR where document might not be available
      try {
        if (typeof document !== 'undefined' && document.documentElement.style.getPropertyValue(`--${colorName}-${shade}`)) {
          // Use CSS variable if available
          bgColor = `rgb(var(--${colorName}-${shade}))`;
        } else {
          // Fallback to direct color classes
          const isDark = typeof themeStore.isDarkMode === 'boolean' ? themeStore.isDarkMode : false;
          bgColor = isDark
            ? `#${getHexColorForTheme(colorName, shade, true)}`
            : `#${getHexColorForTheme(colorName, shade, false)}`;
        }
      } catch (e) {
        // Fallback for SSR or if any error occurs
        const isDark = typeof themeStore.isDarkMode === 'boolean' ? themeStore.isDarkMode : false;
        bgColor = isDark
          ? `#${getHexColorForTheme(colorName, shade, true)}`
          : `#${getHexColorForTheme(colorName, shade, false)}`;
      };
    }

    return {
      width: `${item.value}%`,
      backgroundColor: bgColor
    };
  });
});
</script>

<style scoped>
.info-graphic {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 100%;
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.info-graphic:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.bar-segment {
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
}

.bar-segment:hover {
  filter: brightness(1.1);
}

.legend-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
}

.legend-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}

/* Animation for content */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-graphic {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
