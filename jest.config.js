module.exports = {
    setupFiles: ['<rootDir>/jest.setup.js'],
    preset: 'react-native',
    roots: ["./src"],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
      "node_modules/(?!(react-native"
        + "|react-navigation-tabs"
        + "|react-native-splash-screen"
        + "|react-native-screens"
        + "|react-native-reanimated"
      + ")/)",
    ],
  }