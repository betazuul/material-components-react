import React from 'react';
import { storiesOf } from '@storybook/react';

import { IconButton } from '..';
import '../icon-button.scss';

storiesOf('Icon Button', module)
  .add('Material', () => <IconButton material icon="favorite_border" />)
  .add('Material Toggle', () => (
    <IconButton
      material
      icon="favorite_border"
      iconOn="favorite"
      iconLabel="Add to favorites"
    />
  ))
  .add('Material Toggled', () => (
    <IconButton
      material
      icon="favorite_border"
      iconOn="favorite"
      iconLabel="Add to favorites"
      on
    />
  ))
  .add('Font Awesome', () => (
    <IconButton icon={<i className="far fa-star" />} />
  ))
  .add('Font Awesome Toggle', () => (
    <IconButton
      icon={<i className="far fa-star" />}
      iconOn={<i className="fas fa-star" />}
      iconLabel="Star this item"
    />
  ))
  .add('Font Awesome Toggled', () => (
    <IconButton
      icon={<i className="far fa-star" />}
      iconOn={<i className="fas fa-star" />}
      iconLabel="Star this item"
      on
    />
  ));
