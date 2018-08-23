import React from 'react';
import { storiesOf } from '@storybook/react';
import { LinearProgress } from '..';
import '../linear-progress.scss';

storiesOf('Linear Progress', module)
  .add('Basic', () => <LinearProgress progress={0.5} />)
  .add('Buffered', () => <LinearProgress buffer={0.75} progress={0.5} />)
  .add('Indeterminate', () => <LinearProgress indeterminate />)
  .add('Reversed', () => <LinearProgress reversed progress={0.5} />)
  .add('Reversed Buffered', () => (
    <LinearProgress buffer={0.75} progress={0.5} reversed />
  ));
