module.exports = {
  plugins: [
    require('@tailwindcss/postcss')({
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    }),
  ],
}
