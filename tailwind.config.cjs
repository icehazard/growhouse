const config = {
  content: ["./src/**/*.{html,js,svelte,ts}",
    // "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"
  ],

  theme: {
    extend: {},
  },

  plugins: [
    //require('flowbite/plugin')
  ],
  darkMode: 'media',
  mode: 'jit',
};

module.exports = config;
