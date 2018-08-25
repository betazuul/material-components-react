import React from 'react';
import { storiesOf } from '@storybook/react';

import { IconButton } from '..';
import '../icon-button.scss';

storiesOf('Icon Button', module)
  .add('Material', () => <IconButton material>favorite_border</IconButton>)
  .add('Material Toggle', () => (
    <IconButton
      material
      toggle
      toggleOnContent="favorite"
      toggleOffContent="favorite_border"
      toggleOnLabel="Remove from favorites"
      toggleOffLabel="Add to favorites"
    >
      favorite_border
    </IconButton>
  ))
  .add('Material Toggled', () => (
    <IconButton
      material
      toggle
      toggled
      toggleOnContent="favorite"
      toggleOffContent="favorite_border"
      toggleOnLabel="Remove from favorites"
      toggleOffLabel="Add to favorites"
    >
      favorite_border
    </IconButton>
  ))
  .add('Font Awesome', () => (
    <IconButton>
      <i className="far fa-star" />
    </IconButton>
  ))
  .add('Font Awesome Toggle', () => (
    <IconButton
      toggle
      toggleOnClass="fas"
      toggleOffClass="far"
      toggleOnLabel="Unstar this item"
      toggleOffLabel="Star this item"
    >
      <i className="far fa-star" />
    </IconButton>
  ))
  .add('Font Awesome Toggled', () => (
    <IconButton
      toggle
      toggled
      toggleOnClass="fas"
      toggleOffClass="far"
      toggleOnLabel="Unstar this item"
      toggleOffLabel="Star this item"
    >
      <i className="far fa-star" />
    </IconButton>
  ));
