import themeData from '@/config/themes.json';
import { ThemeJsonConfig } from '@/stores/theme/jsonTypes';

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
  }
};
