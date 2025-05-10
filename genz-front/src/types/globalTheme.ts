// Global Theme Types

// Theme aspect with description and value
export interface ThemeAspect {
  description: string;
  value: string;
  backdrop_filter_blur?: string;
}

// Theme mode definition with all key aspects
export interface ThemeModeDefinition {
  name: string;
  key_aspects: {
    page_background: ThemeAspect;
    content_surface_primary: ThemeAspect;
    content_surface_frosted: ThemeAspect;
    text_primary: ThemeAspect;
    text_secondary: ThemeAspect;
    text_on_accent_bg: ThemeAspect;
    border_subtle: ThemeAspect;
    shadow_default: ThemeAspect;
    interactive_element_bg_primary: ThemeAspect;
    interactive_element_text_primary: ThemeAspect;
    decorative_line_swoosh: ThemeAspect;
    [key: string]: ThemeAspect; // Allow for additional aspects
  };
}

// Complete global theme definition
export interface GlobalThemeDefinition {
  theme_definitions: {
    lightMode: ThemeModeDefinition;
    darkMode: ThemeModeDefinition;
  };
  general_style_hints: {
    font_family_primary: string;
    card_corner_radius_default: string;
    button_corner_radius_pill: string;
    button_corner_radius_standard: string;
    [key: string]: string; // Allow for additional style hints
  };
}

// Scale configuration for theme values
export interface ThemeScale {
  [key: string]: string;
}
