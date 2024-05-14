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
    extend: {
      colors: {
        mainBg: '#FFFCE3',
        semiBrown: '#9E725C',
        smallBento: {
          primary: '#B6C4B5',
          selected: '#377F64',
          hover: '#73A18A',
        },
      },
    },
    plugins: [],
  },
}
