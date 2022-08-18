module.exports = {
  extends: 'universe/native',
  env: {
    'react-native/react-native': true,
  },
  plugins: ['react-native', 'i18next'],
  rules: {
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 1,
    // 'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
    'i18next/no-literal-string': 2,
  },
};
