/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'on-open-chat': {
          from: { width: 0 },
          to: { width: '100vw' }
        },
        'on-close-chat': {
          from: { width: '100vw' },
          to: { width: 0 }
        }
      },
      animation: {
        'on-open-chat': 'on-open-chat 0.5s ease-in-out forwards',
        'on-close-chat': 'on-close-chat 0.5s ease-in-out forwards',
      }
    },
  },
  plugins: [],
};
