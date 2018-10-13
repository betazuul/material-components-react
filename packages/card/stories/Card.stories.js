import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import { Button } from '../../button';
import { IconButton } from '../../icon-button';
import {
  Card,
  CardContent,
  CardMedia,
  CardMediaContent,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from '..';
import '../card.scss';
import './card.stories.scss';

const CardDemo = props => {
  const { actions, media, primaryAction, square, wide } = props;
  return (
    <div className="demo">
      <Card className="demo-card">
        <CardContent action={primaryAction}>
          {media && (
            <CardMedia
              imageUrl="https://betazuul.com/assets/gears.jpg"
              square={square}
              wide={wide}
            >
              <CardMediaContent style={{ color: 'white' }}>
                Media Content
              </CardMediaContent>
            </CardMedia>
          )}
          <div className="demo-card__primary">
            <h2 className="demo-card__title mdc-typography--headline6">
              Our Gears
            </h2>
            <h3 className="demo-card__subtitle mdc-typography--subtitle2">
              by Gearsy Gearson
            </h3>
          </div>
          <div className="demo-card__secondary mdc-typography--body2">
            Check it out. We have gears turning, wheels spinning, and clocks
            ticking.
          </div>
        </CardContent>
        {actions && (
          <CardActions>
            <CardActionButtons>
              <Button>Read</Button>
              <Button>Bookmark</Button>
            </CardActionButtons>
            <CardActionIcons>
              <IconButton
                material
                icon="favorite_border"
                iconOn="favorite"
                iconLabel="Add to favorites"
              />
              <IconButton material icon="share" />
              <IconButton material icon="more_vert" />
            </CardActionIcons>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

CardDemo.propTypes = {
  actions: PropTypes.bool,
  media: PropTypes.bool,
  primaryAction: PropTypes.bool,
  square: PropTypes.bool,
  wide: PropTypes.bool
};

CardDemo.defaultProps = {
  actions: false,
  media: false,
  primaryAction: false,
  square: false,
  wide: false
};

storiesOf('Card', module)
  .add('Simple', () => (
    <div className="demo">
      <Card className="demo-card demo-card--simple">Simple</Card>
    </div>
  ))
  .add('Simple Outlined', () => (
    <div className="demo">
      <Card className="demo-card demo-card--simple" outlined>
        Simple
      </Card>
    </div>
  ))
  .add('Content', () => <CardDemo />)
  .add('Content with Square Media', () => <CardDemo media square />)
  .add('Content with Wide Media', () => <CardDemo media wide />)
  .add('Content and Actions', () => <CardDemo actions />)
  .add('Content with Media and Actions', () => <CardDemo media wide actions />)
  .add('Primary Action Content', () => <CardDemo primaryAction />)
  .add('Primary Action Content with Square Media', () => (
    <CardDemo primaryAction media square />
  ))
  .add('Primary Action Content with Wide Media', () => (
    <CardDemo primaryAction media wide />
  ))
  .add('Primary Action Content and Actions', () => (
    <CardDemo primaryAction actions />
  ))
  .add('Primary Action Content with Media and Actions', () => (
    <CardDemo primaryAction media wide actions />
  ));
