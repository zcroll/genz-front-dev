/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        secondary: ['var(--font-secondary)'],
      },
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
      },
      fontWeight: {
        light: 'var(--font-weight-light)',
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },
      lineHeight: {
        tight: 'var(--line-height-tight)',
        snug: 'var(--line-height-snug)',
        normal: 'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
        loose: 'var(--line-height-loose)',
      },
      letterSpacing: {
        tighter: 'var(--letter-spacing-tighter)',
        tight: 'var(--letter-spacing-tight)',
        normal: 'var(--letter-spacing-normal)',
        wide: 'var(--letter-spacing-wide)',
        wider: 'var(--letter-spacing-wider)',
        widest: 'var(--letter-spacing-widest)',
      },
      colors: {
        'primary-heading': 'var(--text-color-light)',
        'primary-content': 'var(--text-secondary-light)',
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
        // Theme colors for 16personalities.com-style themes
        blue: {
          50: "var(--blue-50)",
          100: "var(--blue-100)",
          200: "var(--blue-200)",
          300: "var(--blue-300)",
          400: "var(--blue-400)",
          500: "var(--blue-500)",
          600: "var(--blue-600)",
          700: "var(--blue-700)",
          800: "var(--blue-800)",
          900: "var(--blue-900)",
        },
        green: {
          50: "var(--green-50)",
          100: "var(--green-100)",
          200: "var(--green-200)",
          300: "var(--green-300)",
          400: "var(--green-400)",
          500: "var(--green-500)",
          600: "var(--green-600)",
          700: "var(--green-700)",
          800: "var(--green-800)",
          900: "var(--green-900)",
        },
        purple: {
          50: "var(--purple-50)",
          100: "var(--purple-100)",
          200: "var(--purple-200)",
          300: "var(--purple-300)",
          400: "var(--purple-400)",
          500: "var(--purple-500)",
          600: "var(--purple-600)",
          700: "var(--purple-700)",
          800: "var(--purple-800)",
          900: "var(--purple-900)",
        },
        amber: {
          50: "var(--amber-50)",
          100: "var(--amber-100)",
          200: "var(--amber-200)",
          300: "var(--amber-300)",
          400: "var(--amber-400)",
          500: "var(--amber-500)",
          600: "var(--amber-600)",
          700: "var(--amber-700)",
          800: "var(--amber-800)",
          900: "var(--amber-900)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss/plugin")(({ addVariant }) => {
      addVariant("data-[state=open]", '&[data-state="open"]')
      addVariant("data-[state=closed]", '&[data-state="closed"]')
      addVariant("data-[state=on]", '&[data-state="on"]')
      addVariant("data-[state=off]", '&[data-state="off"]')
      addVariant("data-[state=checked]", '&[data-state="checked"]')
      addVariant("data-[state=unchecked]", '&[data-state="unchecked"]')
      addVariant("data-[state=indeterminate]", '&[data-state="indeterminate"]')
      addVariant("data-[swipe=start]", '&[data-swipe="start"]')
      addVariant("data-[swipe=end]", '&[data-swipe="end"]')
      addVariant("data-[swipe=move]", '&[data-swipe="move"]')
      addVariant("data-[swipe=cancel]", '&[data-swipe="cancel"]')
      addVariant("data-[orientation=horizontal]", '&[data-orientation="horizontal"]')
      addVariant("data-[orientation=vertical]", '&[data-orientation="vertical"]')
      addVariant("data-[side=top]", '&[data-side="top"]')
      addVariant("data-[side=right]", '&[data-side="right"]')
      addVariant("data-[side=bottom]", '&[data-side="bottom"]')
      addVariant("data-[side=left]", '&[data-side="left"]')
      addVariant("data-[placement]", "&[data-placement]")
      addVariant("data-[placement=top]", '&[data-placement="top"]')
      addVariant("data-[placement=top-start]", '&[data-placement="top-start"]')
      addVariant("data-[placement=top-end]", '&[data-placement="top-end"]')
      addVariant("data-[placement=bottom]", '&[data-placement="bottom"]')
      addVariant("data-[placement=bottom-start]", '&[data-placement="bottom-start"]')
      addVariant("data-[placement=bottom-end]", '&[data-placement="bottom-end"]')
      addVariant("data-[placement=left]", '&[data-placement="left"]')
      addVariant("data-[placement=left-start]", '&[data-placement="left-start"]')
      addVariant("data-[placement=left-end]", '&[data-placement="left-end"]')
      addVariant("data-[placement=right]", '&[data-placement="right"]')
      addVariant("data-[placement=right-start]", '&[data-placement="right-start"]')
      addVariant("data-[placement=right-end]", '&[data-placement="right-end"]')
    }),
  ],
}
