// prettier.config.js
/**
 * @type {import("prettier").Config}
 */
const config = {
  tailwindStylesheet: './src/app/globals.css',
  experimentalTernaries: true,
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
