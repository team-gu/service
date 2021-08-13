const path = require('path');

module.exports = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['i5a202.p.ssafy.io'],
  },
  webpack(config, options) {
    config.resolve = {
      alias: {
        '@atoms': path.resolve(__dirname, 'components/atoms'),
        '@molecules': path.resolve(__dirname, 'components/molecules'),
        '@organisms': path.resolve(__dirname, 'components/organisms'),
        '@templates': path.resolve(__dirname, 'pages/template'),
        '@pages': path.resolve(__dirname, 'pages'),
        '@assets': path.resolve(__dirname, 'assets'),
        '@hooks': path.resolve(__dirname, 'hooks'),
        '@mocks': path.resolve(__dirname, 'mocks'),
        '@repository': path.resolve(__dirname, 'repository'),
        '@routes': path.resolve(__dirname, 'routes'),
        '@store': path.resolve(__dirname, 'store'),
        '@styles': path.resolve(__dirname, 'styles'),
        '@types': path.resolve(__dirname, 'types'),
        '@utils': path.resolve(__dirname, 'utils'),
        '@context': path.resolve(__dirname, 'context'),
        '@parse': path.resolve(__dirname, 'test'),
      },
      ...config.resolve,
    };

    // config.resolve.alias['@src'] = path.join(__dirname, 'src')
    // config.resolve.alias['@components'] = path.join(__dirname, 'src', 'components')
    // config.resolve.alias['@interface'] = path.join(__dirname, 'src', '@types/interface.ts')
    // config.resolve.extensions = ['js', 'ts', 'tsx']
    return config;
  },
};
