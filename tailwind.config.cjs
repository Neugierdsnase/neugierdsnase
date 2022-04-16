module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        serif: '"Lora", serif',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
