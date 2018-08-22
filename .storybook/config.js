import React from 'react';
import { configure, addDecorator } from '@storybook/react';

// automatically import all files ending in ../packages/*/src/*.stories.js
const loadStories = () => {
  require('glob-loader!./stories.pattern');
};

addDecorator(story => <div className="demo mdc-typography">{story()}</div>);
configure(loadStories, module);
