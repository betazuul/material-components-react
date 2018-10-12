import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import '../packages/button/node_modules/@material/typography/mdc-typography.scss';
// automatically import all files ending in ../packages/*/src/*.stories.js
const loadStories = () => {
  require('glob-loader!./stories.pattern');
};

addDecorator(story => <div className="mdc-typography">{story()}</div>);
configure(loadStories, module);
