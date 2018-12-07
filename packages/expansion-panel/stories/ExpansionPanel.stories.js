import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import {
  ExpansionPanel,
  ExpansionPanelBody,
  ExpansionPanelHeader,
  ExpansionPanelHeaderSection,
  ExpansionPanelIcon,
  ExpansionPanelText
} from '..';
import { Button } from '../../button';
import { IconButton } from '../../icon-button';
import { MenuSurface, Corner } from '../../menu-surface';
import { List, ListItem } from '../../list';
import '../expansion-panel.scss';

class ExpansionPanelDemo extends React.Component {
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

  // expand = () => {
  //   // const { expanded } = this.state;
  //   // this.setState({ expanded: !expanded });
  // };

  render() {
    const { anchorElement, open } = this.state;
    const { button, hideExpansionIcon, menu } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelHeader hideExpansionIcon>
          <ExpansionPanelHeaderSection>
            <ExpansionPanelIcon summary>done</ExpansionPanelIcon>
            <ExpansionPanelIcon details>done_all</ExpansionPanelIcon>
          </ExpansionPanelHeaderSection>
          <ExpansionPanelHeaderSection>
            <ExpansionPanelText summary>Title</ExpansionPanelText>
            <ExpansionPanelText details>Expanded Title</ExpansionPanelText>
          </ExpansionPanelHeaderSection>
          {button && <Button raised>Button</Button>}
          {menu && (
            <div
              className="mdc-menu-surface--anchor"
              ref={this.setAnchorElement}
            >
              <IconButton
                icon="more_vert"
                onClick={() => this.setState({ open: true })}
              />
              <MenuSurface
                open={open}
                anchorCorner={Corner.BOTTOM_START}
                onClick={() => this.setState({ open: false })}
                onClose={() => this.setState({ open: false })}
                anchorElement={anchorElement}
              >
                <List>
                  <ListItem>Item 1 of awesomeness</ListItem>
                  <ListItem>Item 2</ListItem>
                  <ListItem>Item 3</ListItem>
                </List>
              </MenuSurface>
            </div>
          )}
        </ExpansionPanelHeader>
        <ExpansionPanelBody>
          <List>
            <ListItem>List Item 0</ListItem>
            <ListItem>List Item 1</ListItem>
            <ListItem>List Item 2</ListItem>
            <ListItem>List Item 3</ListItem>
            <ListItem>List Item 4</ListItem>
          </List>
        </ExpansionPanelBody>
      </ExpansionPanel>
    );
  }
}

storiesOf('Expansion Panel', module)
  .add('Basic', () => <ExpansionPanelDemo />)
  .add('Basic without expansion panel icon', () => (
    <ExpansionPanelDemo hideExpansionIcon />
  ))
  .add('Basic with buttons', () => (
    <ExpansionPanelDemo button menu hideExpansionIcon />
  ));
