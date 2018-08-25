import React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from '../../button';
import { Shape } from '..';
import '../shape.scss';

storiesOf('Shape', module)
  .add('All', () => (
    <Shape
      className="bmc-shape-container"
      topLeft
      topRight
      bottomRight
      bottomLeft
    >
      <Button unelevated>My Button</Button>
    </Shape>
  ))
  .add('Top Left', () => (
    <Shape className="bmc-shape-container" topLeft>
      <Button unelevated>My Button</Button>
    </Shape>
  ))
  .add('Top Right', () => (
    <Shape className="bmc-shape-container" topRight>
      <Button unelevated>My Button</Button>
    </Shape>
  ))
  .add('Bottom Right', () => (
    <Shape className="bmc-shape-container" bottomRight>
      <Button unelevated>My Button</Button>
    </Shape>
  ))
  .add('Bottom Left', () => (
    <Shape className="bmc-shape-container" bottomLeft>
      <Button unelevated>My Button</Button>
    </Shape>
  ))
  .add('All Outlined', () => (
    <Shape
      className="bmc-shape-container--outlined"
      topLeft
      topRight
      bottomRight
      bottomLeft
    >
      <Button outlined>My Button</Button>
    </Shape>
  ));
