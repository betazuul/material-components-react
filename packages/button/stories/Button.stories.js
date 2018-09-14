import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '..';
import '../button.scss';
import './button.stories.scss';

const icon = <i className="material-icons">whatshot</i>;
storiesOf('Button', module)
  .add('Text', () => (
    <div className="demo-button">
      <Button>Default</Button>
      <Button dense>Dense</Button>
      <Button icon={icon}>Icon</Button>
    </div>
  ))
  .add('Raised', () => (
    <div className="demo-button">
      <Button raised>Default</Button>
      <Button raised dense>
        Dense
      </Button>
      <Button raised icon={icon}>
        Icon
      </Button>
    </div>
  ))
  .add('Unelevated', () => (
    <div className="demo-button">
      <Button unelevated>Default</Button>
      <Button unelevated dense>
        Dense
      </Button>
      <Button unelevated icon={icon}>
        Icon
      </Button>
    </div>
  ))
  .add('Outlined', () => (
    <div className="demo-button">
      <Button outlined>Default</Button>
      <Button outlined dense>
        Dense
      </Button>
      <Button outlined icon={icon}>
        Icon
      </Button>
    </div>
  ));
