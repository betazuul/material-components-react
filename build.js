// Build all modules in the packages/ folder
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const localResolve = require('rollup-plugin-local-resolve');
const resolve = require('rollup-plugin-node-resolve');
const path = require('path');
const denodeify = require('denodeify');
const fs = require('fs');
const readDir = denodeify(fs.readdir);
const stat = denodeify(fs.stat);

const mkdirp = denodeify(require('mkdirp'));
const rimraf = denodeify(require('rimraf'));
const all = Promise.all.bind(Promise);

const commonExternals = ['react', 'prop-types', 'classnames'];

const getMaterialExternals = () => {
  const external = [];
  [
    'base',
    'button',
    'card',
    'chips',
    'fab',
    'floating-label',
    'line-ripple',
    'list',
    'notched-outline',
    'ripple',
    'select',
    'tab',
    'tab-indicator',
    'tab-scroller',
    'textfield',
    'theme',
    'top-app-bar',
    'typography'
  ].forEach(name => {
    const fileName = `@material/${name}`;
    external.push(fileName);
  });
  return external;
};

const buildPackage = (filepath, pkg) => {
  return Promise.resolve()
    .then(() => {
      console.log('pkg:', pkg);
      return rimraf(path.resolve(filepath, 'dist'));
    })
    .then(() => {
      return mkdirp(path.resolve(filepath, 'dist'));
    })
    .then(() => {
      return rollup({
        input: path.resolve(filepath, './index.js'),
        plugins: [
          babel({
            exclude: 'node_modules/**' // only transpile our source code
          }),
          localResolve(),
          resolve(),
          commonjs()
        ],
        external: commonExternals.concat(getMaterialExternals())
      }).then(bundle => {
        var formats = ['cjs', 'es'];
        return all(
          formats.map(format => {
            var file = `dist/index${format === 'es' ? '.es.js' : '.js'}`;
            return bundle
              .write({
                file: path.resolve(filepath, file),
                format: format
              })
              .then(() => {
                console.log(
                  `  \u2713 wrote ${path.basename(filepath)}/${file}`
                );
              });
          })
        );
      });
    });
};

const buildPackages = pkg => {
  return stat(path.resolve('packages', pkg)).then(stat => {
    if (!stat.isDirectory()) {
      // skip e.g. 'npm-debug.log'
      return;
    }
    console.log(`Building ${pkg}...`);
    return buildPackage(path.resolve('./packages', pkg), pkg);
  });
};

const build = () => {
  readDir('packages').then(pkgs => {
    return Promise.all(pkgs.map(buildPackages)).catch(err => {
      console.error('Build error');
      console.error(err.stack);
      process.exit(1);
    });
  });
};

build();
