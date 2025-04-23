import { type ClassValue } from 'clsx'
import { cn } from './utils'

// Available color options from components.json
const availableColors = ['gray', 'neutral', 'zinc']

/**
 * Utility function to apply color variants to components
 * @param color The color to apply (must be one of the available colors)
 * @param baseClasses Base classes to apply
 * @param colorVariants Object mapping colors to their respective classes
 * @returns Combined class string
 */
export function applyColorVariant(
  color: string | undefined,
  baseClasses: ClassValue,
  colorVariants: Record<string, ClassValue> = {}
): string {
  // Default to the first available color if none provided or invalid
  if (!color || !availableColors.includes(color)) {
    color = 'gray' // Default to gray as specified
  }

  // Get the classes for the specified color, or empty string if not defined
  const colorClasses = colorVariants[color] || ''

  // Combine base classes with color-specific classes
  return cn(baseClasses, colorClasses)
}

/**
 * Get all available color options
 * @returns Array of available colors
 */
export function getAvailableColors(): string[] {
  return [...availableColors]
}
