const isDevelopment = process.env.NODE_ENV === 'development' || false;

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      [
        '@babel/preset-react',
        {
          importSource: '@welldone-software/why-did-you-render',
          runtime: 'automatic',
          development: isDevelopment,
        },
      ],
    ],
    plugins: [
      // https://github.com/repeaterjs/repeater/issues/68#issuecomment-782762102
      '@babel/plugin-proposal-async-generator-functions',
      'react-native-reanimated/plugin',
    ],
    env: {
      production: {
        plugins: ['transform-remove-console'],
      },
    },
  };
};
