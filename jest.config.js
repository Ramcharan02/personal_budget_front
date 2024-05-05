module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest'  // Ensure Babel is used for .js and .jsx files
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'  // Handles CSS imports in Jest
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)"  // Transform `axios` if it's using ES modules
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],  // Add other extensions as needed

};


module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',  // Ensure all JavaScript files are processed by Babel
    '^.+\\.jsx$': 'babel-jest',  // Ensure all JSX files (if using React) are processed by Babel
    '^.+\\.tsx?$': 'ts-jest',  // If using TypeScript, ensure TypeScript files are processed
  },
};
