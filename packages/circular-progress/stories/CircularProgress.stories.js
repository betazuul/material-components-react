import React from 'react';
import { storiesOf } from '@storybook/react';
import { CircularProgress } from '..';
import '../circular-progress.scss';

storiesOf('Circular Progress', module).add('Basic', () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      height: '100vh'
    }}
  >
    <CircularProgress size="25" />
    <CircularProgress size="50" />
    <CircularProgress size="75" />
    <CircularProgress />
  </div>
));
