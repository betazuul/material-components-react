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
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogHeaderTitle
} from '../../dialog';
import { FormField } from '../../form-field';
import { IconButton } from '../../icon-button';
import '../list.scss';
import './List.stories.css';

class ListDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogBody: 'This is the body',
      dialogHeaderTitle: 'This is the title',
      dialogOpen: false
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

  renderListItems() {
    const { count } = this.props;
    const listItems = [];
    for (let i = 0; i < count; i += 1) {
      const text = `Item ${i}`;
      listItems.push(text);
    }

    return listItems.map((listItem, index) => (
      <ListItem disabled key={listItem}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '50%'
          }}
        >
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
          <div>
            <Button raised onClick={() => this.openDialog(listItem)}>
              Default
            </Button>
          </div>
          <div>
            <IconButton
              material
              icon="favorite_border"
              iconOn="favorite"
              iconLabel="Add to favorites"
            />
          </div>
        </div>
      </ListItem>
    ));
  }

  render() {
    const { dialogBody, dialogHeaderTitle, dialogOpen } = this.state;

    return (
      <React.Fragment>
        <List>{this.renderListItems()}</List>
        <Dialog
          open={dialogOpen}
          onAccept={this.closeDialog}
          onCancel={this.closeDialog}
        >
          <DialogHeader>
            <DialogHeaderTitle>{dialogHeaderTitle}</DialogHeaderTitle>
          </DialogHeader>
          <DialogBody>{dialogBody}</DialogBody>
          <DialogFooter />
        </Dialog>
      </React.Fragment>
    );
  }
}

ListDemo.propTypes = {
  count: PropTypes.number
};

ListDemo.defaultProps = {
  count: 1
};

storiesOf('List', module)
  .add('Test', () => <ListDemo count={100} />)
  .add('Basic', () => (
    <List>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
      <ListItem>Item 4</ListItem>
    </List>
  ))
  .add('Selected', () => (
    <List singleSelection>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem selected>Selected Item</ListItem>
      <ListItem>Item 4</ListItem>
      <ListItem>Item 5</ListItem>
    </List>
  ))
  .add('Two-Line', () => (
    <List twoLine>
      <ListItem>
        <ListItemText>
          <ListItemPrimaryText>Primary Text</ListItemPrimaryText>
          <ListItemSecondaryText>Secondary Text</ListItemSecondaryText>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          <ListItemPrimaryText>Primary Text</ListItemPrimaryText>
          <ListItemSecondaryText>Secondary Text</ListItemSecondaryText>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          <ListItemPrimaryText>Primary Text</ListItemPrimaryText>
          <ListItemSecondaryText>Secondary Text</ListItemSecondaryText>
        </ListItemText>
      </ListItem>
    </List>
  ))
  .add('Groups', () => (
    <ListGroup>
      <ListGroupSubheader>List 1</ListGroupSubheader>
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
      <ListGroupSubheader>List 2</ListGroupSubheader>
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
    </ListGroup>
  ))
  .add('Dividers', () => (
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
      <ListGroupSubheader>List with padded dividesr</ListGroupSubheader>
      <List>
        <ListItem>Item 1</ListItem>
        <ListDivider padded />
        <ListItem>Item 2</ListItem>
        <ListDivider padded />
        <ListItem>Item 3</ListItem>
      </List>
    </ListGroup>
  ))
  .add('Graphics and Meta', () => (
    <List>
      <ListItem>
        <ListItemGraphic icon>power_settings_new</ListItemGraphic>
        Item with graphic
      </ListItem>
      <ListItem>
        Item with meta
        <ListItemMeta icon>info</ListItemMeta>
      </ListItem>
      <ListItem>
        <ListItemGraphic icon>menu</ListItemGraphic>
        Item with graphic and meta
        <ListItemMeta icon>more_vert</ListItemMeta>
      </ListItem>
    </List>
  ));
