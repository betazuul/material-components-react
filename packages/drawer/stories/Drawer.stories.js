import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import {
  DrawerContent,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerHeaderSubtitle,
  DrawerList,
  DrawerListItem,
  DrawerListItemGraphic,
  DrawerListDivider,
  DismissableDrawer,
  ModalDrawer,
  PermanentDrawer,
  strings
} from '..';
import '../drawer.scss';
import './drawer.stories.scss';

import { IconButton } from '../../icon-button';

const list = [
  { graphic: 'inbox', text: 'Inbox' },
  { graphic: 'star', text: 'Star' },
  { graphic: 'send', text: 'Sent Mail' },
  { graphic: 'drafts', text: 'Drafts' },
  { divider: true },
  { graphic: 'email', text: 'All Mail' },
  { graphic: 'delete', text: 'Trash' },
  { graphic: 'report', text: 'Spam' }
];

class DrawerDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleMenuClick = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleListItemClick = () => {
    const { type } = this.props;
    if (type === strings.MODAL) {
      this.setState({ open: false });
    }
  };

  handleClose = () => {
    console.log('stories -- handleClose');
    this.setState({ open: false });
  };

  renderDrawerBody() {
    return (
      <React.Fragment>
        <DrawerHeader>
          <DrawerHeaderTitle>Header Title</DrawerHeaderTitle>
          <DrawerHeaderSubtitle>Header Subtitle</DrawerHeaderSubtitle>
        </DrawerHeader>
        <DrawerContent>
          <DrawerList>
            {list.map(
              item =>
                item.divider ? (
                  <DrawerListDivider key={`divider-${item.text}`} />
                ) : (
                  <DrawerListItem
                    onClick={this.handleListItemClick}
                    key={item.text}
                  >
                    {item.graphic && (
                      <DrawerListItemGraphic icon>
                        {item.graphic}
                      </DrawerListItemGraphic>
                    )}
                    {item.text}
                  </DrawerListItem>
                )
            )}
          </DrawerList>
        </DrawerContent>
      </React.Fragment>
    );
  }

  render() {
    const { open } = this.state;
    const { type } = this.props;
    const MenuIcon = () => (
      <div className="mdc-drawer-app-content">
        <IconButton material icon="menu" onClick={this.handleMenuClick} />
      </div>
    );
    switch (type) {
      case strings.DISMISSABLE:
        return (
          <React.Fragment>
            <DismissableDrawer open={open} onClose={this.handleClose}>
              {this.renderDrawerBody()}
            </DismissableDrawer>
            <MenuIcon />
          </React.Fragment>
        );
      case strings.MODAL:
        return (
          <React.Fragment>
            <ModalDrawer open={open} onClose={this.handleClose}>
              {this.renderDrawerBody()}
            </ModalDrawer>
            <MenuIcon />
          </React.Fragment>
        );
      case strings.PERMANENT:
        return <PermanentDrawer>{this.renderDrawerBody()}</PermanentDrawer>;
      default:
        return null;
    }
  }
}

DrawerDemo.propTypes = {
  type: PropTypes.oneOf([strings.PERMANENT, strings.DISMISSABLE, strings.MODAL])
};

DrawerDemo.defaultProps = {
  type: strings.PERMANENT
};

storiesOf('Drawer', module)
  .add('Permanent', () => <DrawerDemo />)
  .add('Dismissable', () => <DrawerDemo type={strings.DISMISSABLE} />)
  .add('Modal', () => <DrawerDemo type={strings.MODAL} />);
