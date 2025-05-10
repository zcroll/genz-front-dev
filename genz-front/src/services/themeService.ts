import themeData from '../config/themes.json';
import globalThemeData from '../config/globalTheme.json';
import type { ThemeJsonConfig } from '../types/theme';
import type { GlobalThemeDefinition } from '../types/globalTheme';

/**
 * Service for loading and managing theme configuration
 */
export const themeService = {
  /**
   * Loads the theme configuration data
   * @returns The theme configuration data
   */
  async loadThemeConfig(): Promise<ThemeJsonConfig> {
    try {
      // In a real application, this might be an API call
      // For now, we're just returning the imported JSON
      return themeData as ThemeJsonConfig;
    } catch (error) {
      console.error('Error loading theme configuration:', error);
      throw error;
    }
  },

  /**
   * Loads the global theme configuration data
   * @returns The global theme configuration data
   */
  async loadGlobalThemeConfig(): Promise<GlobalThemeDefinition> {
    try {
      // Return the imported global theme JSON
      return globalThemeData as GlobalThemeDefinition;
    } catch (error) {
      console.error('Error loading global theme configuration:', error);
      throw error;
    }
  },

  /**
   * Gets a specific theme aspect value
   * @param aspectKey The key of the aspect to get
   * @param isDarkMode Whether to use dark mode values
   * @returns The value of the aspect
   */
  getThemeAspectValue(aspectKey: string, isDarkMode: boolean): string {
    const mode = isDarkMode ? 'darkMode' : 'lightMode';
    const aspect = globalThemeData.theme_definitions[mode].key_aspects[aspectKey];
    return aspect ? aspect.value : '';
  },

  /**
   * Gets all theme aspects for the current mode
   * @param isDarkMode Whether to use dark mode values
   * @returns Object with all theme aspect values
   */
  getAllThemeAspects(isDarkMode: boolean): Record<string, string> {
    const mode = isDarkMode ? 'darkMode' : 'lightMode';
    const aspects = globalThemeData.theme_definitions[mode].key_aspects;

    const result: Record<string, string> = {};
    for (const key in aspects) {
      result[key] = aspects[key].value;
    }

    return result;
  },

  /**
   * Gets a style hint value
   * @param hintKey The key of the style hint to get
   * @returns The value of the style hint
   */
  getStyleHint(hintKey: string): string {
    return globalThemeData.general_style_hints[hintKey] || '';
  }
};
