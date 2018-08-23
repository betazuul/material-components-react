const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.

  defaultConfig.module.rules.push({
    test: /\.scss$/,
    include: path.resolve(__dirname, '../'),
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: () => [require('autoprefixer')]
        }
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [
            path.resolve(__dirname, '../packages/button/node_modules'),
            path.resolve(__dirname, '../packages/linear-progress/node_modules'),
            path.resolve(__dirname, '../packages/ripple/node_modules')
          ]
        }
      }
    ]
  });
  defaultConfig.resolve.extensions.push('.scss');

  return defaultConfig;
};
