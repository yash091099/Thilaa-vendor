/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        PlusJakartaSans: ["PlusJakartaSans"],
        PlusJakartaSansItalic: ["PlusJakartaSans-Italic"]
      },
      colors: {
        'primary-brand': '#BCE8B1',
        'light-brand': '#CAEEC2',
        'light-background': '#E5F6DF',
        'dark': '#6E9A63',
        'success': '#33B977',
        'text': '#121212',
        'subtle-text': '#D5D5D5',
        'error': '#EE5A66'
      },
    },
  },
  plugins: [],
}

