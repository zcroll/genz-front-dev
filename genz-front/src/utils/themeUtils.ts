/**
 * Theme utility functions for accessing global theme variables
 */

import { useThemeStore } from '../stores/theme/themeStore';

/**
 * Get a CSS variable value from the global theme
 * @param variableName The CSS variable name without the -- prefix
 * @returns The CSS variable with var() syntax
 */
export function getThemeVar(variableName: string): string {
  return `var(--${variableName})`;
}

/**
 * Get a theme-specific CSS variable based on the current theme color and dark mode
 * @param baseVariableName The base variable name
 * @param themeColor Optional theme color (defaults to current theme)
 * @returns The theme-specific CSS variable with var() syntax
 */
export function getThemeColorVar(baseVariableName: string, themeColor?: string): string {
  const store = useThemeStore();
  const color = themeColor || store.currentThemeId.replace('-theme', '');
  const mode = store.isDarkMode ? 'dark' : 'light';
  
  return `var(--${color}-${baseVariableName}-${mode})`;
}

/**
 * Get a CSS variable for text color based on importance
 * @param importance 'primary' for main text, 'secondary' for less important text
 * @returns The CSS variable with var() syntax
 */
export function getTextColor(importance: 'primary' | 'secondary' = 'primary'): string {
  return `var(--text-${importance})`;
}

/**
 * Get a CSS variable for background color
 * @param surface 'page' for main background, 'primary' for content surfaces, 'frosted' for glass effect
 * @returns The CSS variable with var() syntax
 */
export function getBackgroundColor(surface: 'page' | 'primary' | 'frosted' = 'page'): string {
  if (surface === 'page') {
    return 'var(--page-background)';
  } else if (surface === 'primary') {
    return 'var(--content-surface-primary)';
  } else {
    return 'var(--content-surface-frosted)';
  }
}

/**
 * Get a style object with common theme properties
 * @param options Configuration options
 * @returns Style object for v-bind:style
 */
export function getThemeStyles(options: {
  textColor?: 'primary' | 'secondary';
  backgroundColor?: 'page' | 'primary' | 'frosted';
  useBorder?: boolean;
  useShadow?: boolean;
} = {}): Record<string, string> {
  const styles: Record<string, string> = {};
  
  if (options.textColor) {
    styles.color = getTextColor(options.textColor);
  }
  
  if (options.backgroundColor) {
    styles.backgroundColor = getBackgroundColor(options.backgroundColor);
  }
  
  if (options.useBorder) {
    styles.borderColor = 'var(--border-subtle)';
  }
  
  if (options.useShadow) {
    styles.boxShadow = 'var(--shadow-default)';
  }
  
  return styles;
}

/**
 * Apply global theme CSS variables to an element
 * This is useful for dynamically setting CSS variables on specific elements
 */
export function applyThemeVars(element: HTMLElement): void {
  const store = useThemeStore();
  const mode = store.isDarkMode ? 'darkMode' : 'lightMode';
  
  // Get all theme aspects
  const aspects = store.allGlobalThemeAspects;
  
  // Apply each aspect as a CSS variable
  for (const [key, value] of Object.entries(aspects)) {
    element.style.setProperty(`--${key}`, value);
  }
}
