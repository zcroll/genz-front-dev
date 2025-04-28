/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
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
