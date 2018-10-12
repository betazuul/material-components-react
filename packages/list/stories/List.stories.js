import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import {
  List,
  ListDivider,
  ListGroup,
  ListGroupSubheader,
  ListItem,
  ListItemGraphic,
  ListItemMeta,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemText
} from '..';
import { Button } from '../../button';
import { Checkbox } from '../../checkbox';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '../../dialog';
import { FormField } from '../../form-field';
import { IconButton } from '../../icon-button';
import '../list.scss';

class ListDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogBody: 'This is the body',
      dialogHeaderTitle: 'This is the title',
      dialogOpen: false,
      selectedIndex: -1
    };
  }

  get styles() {
    const { twoLine } = this.props;
    if (twoLine) return {};
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '50%'
    };
  }

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  openDialog = dialogBody => {
    this.setState({
      dialogBody,
      dialogHeaderTitle: `Dialog for ${dialogBody}`,
      dialogOpen: true
    });
  };

  selectItem = selectedIndex => {
    const { singleSelection } = this.props;
    if (!singleSelection) return;
    console.log('index:', selectedIndex);
    this.setState({ selectedIndex });
  };

  renderListItems() {
    const { selectedIndex } = this.state;
    const {
      checkbox,
      count,
      dialog,
      disabled,
      iconButton,
      text,
      twoLine
    } = this.props;

    const listItems = [];
    for (let i = 0; i < count; i += 1) {
      const item = `Item ${i}`;
      listItems.push(item);
    }

    return listItems.map((listItem, index) => (
      <ListItem
        disabled={disabled}
        selected={selectedIndex === index}
        onClick={() => this.selectItem(index)}
        key={listItem}
      >
        <div style={this.styles}>
          {checkbox && (
            <div>
              <FormField>
                <Checkbox
                  id={`checkbox-${index}-id`}
                  label={listItem}
                  name={`checkbox-${index}-name`}
                  value={`checkbox-${index}-value`}
                />
              </FormField>
            </div>
          )}
          {dialog && (
            <div>
              <Button raised onClick={() => this.openDialog(listItem)}>
                Default
              </Button>
            </div>
          )}
          {iconButton && (
            <div>
              <IconButton
                material
                icon="favorite_border"
                iconOn="favorite"
                iconLabel="Add to favorites"
              />
            </div>
          )}
          {text && `Item ${index}`}
        </div>
        {twoLine && (
          <ListItemText>
            <ListItemPrimaryText>{`Primary Text ${index}`}</ListItemPrimaryText>
            <ListItemSecondaryText>Secondary Text</ListItemSecondaryText>
          </ListItemText>
        )}
      </ListItem>
    ));
  }

  renderGroups() {
    const { groups } = this.props;
    const listGroups = [];
    for (let i = 0; i < groups; i += 1) {
      listGroups.push(this.renderListItems());
    }

    return listGroups.map((group, index) => {
      const groupSubheader = `List Group ${index}`;
      return (
        <React.Fragment key={groupSubheader}>
          <ListGroupSubheader>{groupSubheader}</ListGroupSubheader>
          <List>{group}</List>
        </React.Fragment>
      );
    });
  }

  render() {
    const { dialogBody, dialogHeaderTitle, dialogOpen } = this.state;
    const { dialog, dividers, graphics, groups, twoLine } = this.props;

    if (dividers) {
      return (
        <ListGroup>
          <ListGroupSubheader>List with basic dividers</ListGroupSubheader>
          <List>
            <ListItem>Item 1</ListItem>
            <ListDivider />
            <ListItem>Item 2</ListItem>
            <ListDivider />
            <ListItem>Item 3</ListItem>
          </List>
          <ListDivider hr />
          <ListGroupSubheader>List with inset dividers</ListGroupSubheader>
          <List>
            <ListItem>Item 1</ListItem>
            <ListDivider inset />
            <ListItem>Item 2</ListItem>
            <ListDivider inset />
            <ListItem>Item 3</ListItem>
          </List>
          <ListDivider hr />
          <ListGroupSubheader>List with padded dividers</ListGroupSubheader>
          <List>
            <ListItem>Item 1</ListItem>
            <ListDivider padded />
            <ListItem>Item 2</ListItem>
            <ListDivider padded />
            <ListItem>Item 3</ListItem>
          </List>
        </ListGroup>
      );
    }

    if (graphics) {
      return (
        <List>
          <ListItem>
            <ListItemGraphic>power_settings_new</ListItemGraphic>
            Item with graphic
          </ListItem>
          <ListItem>
            Item with meta
            <ListItemMeta>info</ListItemMeta>
          </ListItem>
          <ListItem>
            <ListItemGraphic>menu</ListItemGraphic>
            Item with graphic and meta
            <ListItemMeta>more_vert</ListItemMeta>
          </ListItem>
        </List>
      );
    }
    if (groups && groups > 0) {
      return this.renderGroups();
    }

    return (
      <React.Fragment>
        <List twoLine={twoLine}>{this.renderListItems()}</List>
        {dialog && (
          <Dialog open={dialogOpen} onClose={this.closeDialog}>
            <DialogTitle>{dialogHeaderTitle}</DialogTitle>
            <DialogContent>{dialogBody}</DialogContent>
            <DialogActions
              acceptButton
              closeButton
              onClose={this.closeDialog}
            />
          </Dialog>
        )}
      </React.Fragment>
    );
  }
}

ListDemo.propTypes = {
  checkbox: PropTypes.bool,
  count: PropTypes.number,
  dialog: PropTypes.bool,
  disabled: PropTypes.bool,
  dividers: PropTypes.bool,
  graphics: PropTypes.bool,
  groups: PropTypes.number,
  iconButton: PropTypes.bool,
  singleSelection: PropTypes.bool,
  text: PropTypes.bool,
  twoLine: PropTypes.bool
};

ListDemo.defaultProps = {
  checkbox: false,
  count: 1,
  dialog: false,
  disabled: false,
  dividers: false,
  graphics: false,
  groups: 0,
  iconButton: false,
  singleSelection: false,
  text: false,
  twoLine: false
};

storiesOf('List', module)
  .add('Test', () => (
    <ListDemo count={100} checkbox dialog disabled iconButton />
  ))
  .add('Basic', () => <ListDemo count={5} text />)
  .add('Selected', () => <ListDemo count={5} singleSelection text />)
  .add('Two-Line', () => <ListDemo count={5} twoLine />)
  .add('Groups', () => <ListDemo groups={2} count={5} text />)
  .add('Dividers', () => <ListDemo dividers />)
  .add('Graphics and Meta', () => <ListDemo graphics />);
