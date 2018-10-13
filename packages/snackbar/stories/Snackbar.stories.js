import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import { Snackbar } from '..';
import { Button } from '../../button';
import '../snackbar.scss';

class SnackbarDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  hideSnackbar = () => {
    this.setState({ show: false });
  };

  showSnackbar = () => {
    this.setState({ show: true });
  };

  render() {
    const { show } = this.state;
    const { actionHandler, message, multiline, startAligned } = this.props;
    return (
      <React.Fragment>
        <Button raised onClick={this.showSnackbar}>Show Snackbar</Button>
        <Snackbar
          show={show}
          message={message}
          actionHandler={actionHandler}
          actionText="Undo"
          multiline={multiline}
          startAligned={startAligned}
          onHide={this.hideSnackbar}
        />
      </React.Fragment>
    );
  }
}

SnackbarDemo.propTypes = {
  actionHandler: PropTypes.bool,
  message: PropTypes.string,
  multiline: PropTypes.bool,
  startAligned: PropTypes.bool
};

SnackbarDemo.defaultProps = {
  actionHandler: null,
  message: 'Message Sent',
  multiline: false,
  startAligned: false
};

storiesOf('Snackbar', module)
  .add('Simple', () => <SnackbarDemo />)
  .add('Action button', () => <SnackbarDemo actionHandler={() => {}} />)
  .add('Start aligned', () => (
    <SnackbarDemo actionHandler={() => {}} startAligned />
  ))
  .add('Multiline', () => (
    <SnackbarDemo
      actionHandler={() => {}}
      message="This is a super long message letting you know that your message was sent!"
      multiline
    />
  ));
