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

const DemoCard = props => {
  const { actions, media, primaryAction, square, wide } = props;
  return (
    <Card>
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
  );
};

DemoCard.propTypes = {
  actions: PropTypes.bool,
  media: PropTypes.bool,
  primaryAction: PropTypes.bool,
  square: PropTypes.bool,
  wide: PropTypes.bool
};

DemoCard.defaultProps = {
  actions: false,
  media: false,
  primaryAction: false,
  square: false,
  wide: false
};

storiesOf('Card', module)
  .add('Simple', () => <Card className="demo-card--simple">Simple</Card>)
  .add('Simple Outlined', () => (
    <Card className="demo-card--simple" outlined>
      Simple
    </Card>
  ))
  .add('Content', () => <DemoCard />)
  .add('Content with Square Media', () => <DemoCard media square />)
  .add('Content with Wide Media', () => <DemoCard media wide />)
  .add('Content and Actions', () => <DemoCard actions />)
  .add('Content with Media and Actions', () => <DemoCard media wide actions />)
  .add('Primary Action Content', () => <DemoCard primaryAction />)
  .add('Primary Action Content with Square Media', () => (
    <DemoCard primaryAction media square />
  ))
  .add('Primary Action Content with Wide Media', () => (
    <DemoCard primaryAction media wide />
  ))
  .add('Primary Action Content and Actions', () => (
    <DemoCard primaryAction actions />
  ))
  .add('Primary Action Content with Media and Actions', () => (
    <DemoCard primaryAction media wide actions />
  ));
