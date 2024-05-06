/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: { min: '350px', max: '819px' },
      md: { min: '820px', max: '1023px' },
      lg: { min: '1080px' },
    },
    extend: {},
  },
  plugins: [],
}
