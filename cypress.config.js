
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Add plugins or event listeners here
    },
    baseUrl: 'https://dolphin-app-njrav.ondigitalocean.app/', // Ensure this is the correct URL for your app
    supportFile: false,
    projectId: "z6c1kg", // Replace with your actual project ID
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  }
});

