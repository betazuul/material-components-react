// Build all modules in the packages/ folder
const { rollup } = require('rollup');
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

const dashedToCamel = name => name.replace(/-(\w)/g, (_, v) => v.toUpperCase());

const getMaterialExternals = () => {
  const external = [];
  [
    'animation',
    'base',
    'button',
    'card',
    'checkbox',
    'chips',
    'dialog',
    'drawer',
    'dom',
    'fab',
    'floating-label',
    'form-field',
    'icon-button',
    'linear-progress',
    'line-ripple',
    'list',
    'menu-surface',
    'notched-outline',
    'radio',
    'ripple',
    'select',
    'snackbar',
    'tab',
    'tab-indicator',
    'tab-scroller',
    'textfield',
    'theme',
    'top-app-bar',
    'typography'
  ].forEach(name => {
    // const fileName = `@material/${name}`;
    const fileName = `@material/${name}/dist/mdc.${dashedToCamel(name)}`;
    external.push(fileName);
  });
  return external;
};

const buildPackage = filepath =>
  Promise.resolve()
    .then(() => rimraf(path.resolve(filepath, 'dist')))
    .then(() => mkdirp(path.resolve(filepath, 'dist')))
    .then(() =>
      rollup({
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
        const formats = ['cjs', 'es'];
        return all(
          formats.map(format => {
            const file = `dist/index${format === 'es' ? '.es.js' : '.js'}`;
            return bundle
              .write({
                file: path.resolve(filepath, file),
                format
              })
              .then(() => {
                console.log(
                  `  \u2713 wrote ${path.basename(filepath)}/${file}`
                );
              });
          })
        );
      })
    );

const buildPackages = pkg =>
  stat(path.resolve('packages', pkg)).then(st => {
    if (!st.isDirectory()) {
      // skip e.g. 'npm-debug.log'
      return;
    }
    console.log(`Building ${pkg}...`);
    buildPackage(path.resolve('./packages', pkg));
  });

const build = () => {
  readDir('packages').then(pkgs =>
    Promise.all(pkgs.map(buildPackages)).catch(err => {
      console.error('Build error');
      console.error(err.stack);
      process.exit(1);
    })
  );
};

build();
