// Theme types for the application

// Configuration for a specific theme mode (light or dark)
export interface ThemeModeConfig {
  base_gradient_from: string;
  base_gradient_via: string;
  base_gradient_to: string;
  button_bg: string;
  button_hover_bg: string;
  border_color: string;
  ring_color: string;
  background_light: string;
  background_medium: string;
  background_dark: string;
}

// Definition of a theme with both light and dark mode configurations
export interface ThemeDefinition {
  primary_color_name: string;
  accent_color_name: string;
  light_mode: ThemeModeConfig;
  dark_mode: ThemeModeConfig;
}

// Theme object for UI representation
export interface ThemeObject {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
}

// Complete theme configuration from JSON
export interface ThemeJsonConfig {
  theme_configurations: Record<string, ThemeDefinition>;
  archetype_to_theme_map: Record<string, string>;
  available_accent_themes: ThemeObject[];
}

// Legacy theme config interface for backward compatibility
export interface LegacyThemeConfig {
  primary: string;
  accent: string;
  base: {
    from: string;
    via: string;
    to: string;
  };
  button: string;
  hover: string;
  border: string;
  ring: string;
  background: {
    light: string;
    medium: string;
    dark: string;
  };
}
