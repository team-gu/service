const path = require('path');

module.exports = {
  stories: [
    // '../stories/**/*.stories.mdx',
    // '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: (config) => {
    config.resolve.alias['next/router'] = require.resolve(
      '../__mocks__/next/router.js',
    );
    config.resolve.alias['next/link'] = require.resolve(
      '../__mocks__/next/link.js',
    );
    config.resolve.alias['next/image'] = require.resolve(
      '../__mocks__/next/image.js',
    );
    config.resolve.alias = {
      '@atoms': path.resolve(__dirname, '../components/atoms'),
      '@molecules': path.resolve(__dirname, '../components/molecules'),
      '@organisms': path.resolve(__dirname, '../components/organisms'),
      // '@components': path.resolve(__dirname, '../components'),
      // '@templates': path.resolve(__dirname, 'src/pages/template'),
      '@pages': path.resolve(__dirname, '../pages'),
      '@assets': path.resolve(__dirname, '../assets'),
      '@hooks': path.resolve(__dirname, '../hooks'),
      '@mocks': path.resolve(__dirname, '../mocks'),
      '@repository': path.resolve(__dirname, '../repository'),
      '@routes': path.resolve(__dirname, '../routes'),
      '@store': path.resolve(__dirname, '../store'),
      '@styles': path.resolve(__dirname, '../styles'),
      '@utils': path.resolve(__dirname, '../utils'),
      '@context': path.resolve(__dirname, '../context'),
    };
    return config;
  },
};
