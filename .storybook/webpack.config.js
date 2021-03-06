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
            path.resolve(__dirname, '../packages/card/node_modules'),
            path.resolve(__dirname, '../packages/checkbox/node_modules'),
            path.resolve(__dirname, '../packages/dialog/node_modules'),
            path.resolve(__dirname, '../packages/drawer/node_modules'),
            path.resolve(__dirname, '../packages/expansion-panel/node_modules'),
            path.resolve(__dirname, '../packages/form-field/node_modules'),
            path.resolve(__dirname, '../packages/icon-button/node_modules'),
            path.resolve(__dirname, '../packages/layout-grid/node_modules'),
            path.resolve(__dirname, '../packages/linear-progress/node_modules'),
            path.resolve(__dirname, '../packages/list/node_modules'),
            path.resolve(__dirname, '../packages/menu/node_modules'),
            path.resolve(__dirname, '../packages/menu-surface/node_modules'),
            path.resolve(__dirname, '../packages/radio/node_modules'),
            path.resolve(__dirname, '../packages/ripple/node_modules'),
            path.resolve(__dirname, '../packages/shape/node_modules'),
            path.resolve(__dirname, '../packages/snackbar/node_modules')
          ]
        }
      }
    ]
  });
  defaultConfig.resolve.extensions.push('.scss');

  return defaultConfig;
};
