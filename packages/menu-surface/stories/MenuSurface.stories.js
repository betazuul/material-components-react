import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import { MenuSurface, Corner } from '..';
import { Button } from '../../button';
import { List, ListItem } from '../../list';
import '../menu-surface.scss';
import './MenuSurface.stories.scss';

class MenuSurfaceDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorElement: null
    };
  }

  setAnchorElement = element => {
    const { anchorElement } = this.state;
    if (anchorElement) return;
    this.setState({ anchorElement: element });
  };

  renderMenuItems() {
    const { image } = this.props;
    if (image) {
      return (
        <img
          style={{ maxWidth: '20vw', maxHeight: '20vh' }}
          src="https://betazuul.com/assets/gears.jpg"
          alt="lots of gears"
        />
      );
    }
    return (
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
    );
  }

  render() {
    const { anchorElement, open } = this.state;
    return (
      <div className="demo">
        <div className="mdc-menu-surface--anchor" ref={this.setAnchorElement}>
          <Button raised onClick={() => this.setState({ open: true })}>
            Open Menu
          </Button>
          <MenuSurface
            open={open}
            anchorCorner={Corner.BOTTOM_START}
            onClick={() => this.setState({ open: false })}
            onClose={() => this.setState({ open: false })}
            anchorElement={anchorElement}
          >
            {this.renderMenuItems()}
          </MenuSurface>
        </div>
      </div>
    );
  }
}

MenuSurfaceDemo.propTypes = {
  image: PropTypes.bool
};

MenuSurfaceDemo.defaultProps = {
  image: false
};

storiesOf('Menu Surface', module)
  .add('Basic with list', () => <MenuSurfaceDemo />)
  .add('Basic with image', () => <MenuSurfaceDemo image />);
