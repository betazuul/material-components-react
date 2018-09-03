import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerHeaderSubtitle,
  DrawerList,
  DrawerListItem,
  DrawerListItemGraphic,
  DrawerListDivider,
  strings,
} from '..';
import '../drawer.scss';
import './drawer.stories.css';

import { IconButton } from '../../icon-button';

const list = [
  { graphic: 'inbox', text: 'Inbox' },
  { graphic: 'star', text: 'Star' },
  { graphic: 'send', text: 'Sent Mail' },
  { graphic: 'drafts', text: 'Drafts' },
  { divider: true },
  { graphic: 'email', text: 'All Mail' },
  { graphic: 'delete', text: 'Trash' },
  { graphic: 'report', text: 'Spam' },
];

class DemoDrawer extends React.Component {
  state = {
    open: false,
  };

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
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { type } = this.props;
    return (
      <React.Fragment>
        <Drawer type={type} open={open} onClose={this.handleClose}>
          <DrawerHeader>
            <DrawerHeaderTitle>Header Title</DrawerHeaderTitle>
            <DrawerHeaderSubtitle>Header Subtitle</DrawerHeaderSubtitle>
          </DrawerHeader>
          <DrawerContent>
            <DrawerList>
              {list.map(
                item => (item.divider ? (
                  <DrawerListDivider key={item.text} />
                ) : (
                  <DrawerListItem onClick={this.handleListItemClick} key={item.text}>
                    {item.graphic && (
                    <DrawerListItemGraphic icon>{item.graphic}</DrawerListItemGraphic>
                    )}
                    {item.text}
                  </DrawerListItem>
                )),
              )}
            </DrawerList>
          </DrawerContent>
        </Drawer>
        {type !== strings.PERMANENT && (
          <div className="mdc-drawer-app-content">
            <IconButton material onClick={this.handleMenuClick}>
              menu
            </IconButton>
          </div>
        )}
      </React.Fragment>
    );
  }
}
DemoDrawer.propTypes = {
  type: PropTypes.oneOf([strings.PERMANENT, strings.DISMISSABLE, strings.MODAL]),
};
DemoDrawer.defaultProps = {
  type: strings.PERMANENT,
};

storiesOf('Drawer', module)
  .add('Permanent', () => <DemoDrawer />)
  .add('Dismissable', () => <DemoDrawer type={strings.DISMISSABLE} />)
  .add('Modal', () => <DemoDrawer type={strings.MODAL} />);
