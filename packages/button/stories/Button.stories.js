import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '..';
import '../button.scss';
import './button.stories.css';

const heartIcon = <i className="material-icons">whatshot</i>;
storiesOf('Button', module)
  .add('Text', () => (
    <div className="demo-button">
      <Button>Text</Button>
      <Button dense>Dense</Button>
      <Button icon={heartIcon}>Icon</Button>
    </div>
  ))
  .add('Raised', () => (
    <div className="demo-button">
      <Button raised>Text</Button>
      <Button raised dense>
        Dense
      </Button>
      <Button raised icon={heartIcon}>
        Icon
      </Button>
    </div>
  ))
  .add('Unelevated', () => (
    <div className="demo-button">
      <Button unelevated>Text</Button>
      <Button unelevated dense>
        Dense
      </Button>
      <Button unelevated icon={heartIcon}>
        Icon
      </Button>
    </div>
  ))
  .add('Outlined', () => (
    <div className="demo-button">
      <Button outlined>Text</Button>
      <Button outlined dense>
        Dense
      </Button>
      <Button outlined icon={heartIcon}>
        Icon
      </Button>
    </div>
  ));
