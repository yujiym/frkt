import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Work Sans', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: '#AAEEC4',
      },
      boxShadow: {
        solid: '0.125rem 0.125rem rgba(0, 0, 0, 0.75)',
      },
    },
  },
  plugins: [],
} satisfies Config
