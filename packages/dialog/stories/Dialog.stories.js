import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '..';
import '../dialog.scss';

class DialogDemo extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = action => {
    console.log('stories -- handleClose action:', action);
    this.setState({ open: false });
  };

  renderActions() {
    const {
      acceptButton,
      acceptButtonLabel,
      closeButton,
      closeButtonLabel
    } = this.props;

    if (!acceptButton && !closeButton) return null;

    return (
      <DialogActions
        acceptButton={acceptButton}
        acceptButtonLabel={acceptButtonLabel}
        closeButton={closeButton}
        closeButtonLabel={closeButtonLabel}
        onClose={this.handleClose}
      />
    );
  }

  renderBody() {
    const { scrollable } = this.props;
    const text = scrollable
      ? '<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis, repudiandae dignissimos et quam velit autem mollitia tenetur, eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.</p>' +
        '<p>Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel, consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium, excepturi!</p>' +
        '<p>Suscipit quam laboriosam animi quasi similique voluptatem molestiae voluptas sint itaque, labore eos, maiores harum qui totam libero amet nisi? Similique nihil veritatis aspernatur molestias accusantium, eius dolorum autem optio?</p>' +
        '<p>Cum eligendi consequuntur voluptas. Repellat nisi commodi numquam aliquam quasi tenetur obcaecati, animi cum eum. Facilis esse cupiditate fugiat, quod eveniet, inventore impedit nam ex tempore harum laudantium provident assumenda.</p>' +
        '<p>Ut iste aperiam excepturi rerum consectetur illo officiis quo sed sunt labore earum soluta tempore omnis a, enim maiores non? Facilis qui alias sunt veniam esse hic. Aut, ducimus aliquid!</p>' +
        '<p>Qui quaerat saepe sunt earum nihil porro, sint quibusdam, id eos vero asperiores dolorem iusto dolore illo, architecto fuga? Voluptates distinctio eligendi nihil provident accusantium. Maxime ullam ratione officia non.</p>' +
        '<p>Molestiae sapiente quae nulla. Voluptates quibusdam numquam earum vero deserunt in, cum tenetur accusamus ipsum minus veniam libero quasi fuga dolorem laudantium error quo et accusantium neque vitae aliquam tempore.</p>' +
        '<p>Optio asperiores quisquam odit eaque incidunt laboriosam repudiandae ex eum iure quia, id vero atque perspiciatis, officiis quaerat aut ut dolorem libero eos perferendis ducimus! Veritatis nam libero tempora maxime?</p>' +
        '<p>Sapiente reiciendis quis eveniet iure dicta perferendis quos consectetur, soluta sunt, labore ipsam inventore maiores laudantium recusandae deleniti autem animi consequatur, voluptatem sint. Dignissimos minima labore earum vitae ad non!</p>' +
        '<p>Cum ex totam dolore officiis maiores quidem necessitatibus consequatur molestias culpa, quas, aperiam tempora et! Dolorem, voluptates dignissimos? Voluptatem voluptatibus expedita, error ducimus distinctio necessitatibus laudantium officiis dolorum nam vitae?</p>'
      : 'Do you really want to do this?';
    return (
      <DialogContent
        scrollable={scrollable}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  render() {
    const { open } = this.state;
    const { alert, scrollable, simple } = this.props;
    return (
      <div className="dialog-container">
        <button type="button" className="mdc-button" onClick={this.handleClick}>
          Open Dialog
        </button>
        <Dialog
          open={open}
          scrollable={scrollable}
          simple={simple}
          onClose={this.handleClose}
        >
          {!alert && <DialogTitle>Are you sure?</DialogTitle>}
          {this.renderBody()}
          {this.renderActions()}
        </Dialog>
      </div>
    );
  }
}

DialogDemo.propTypes = {
  alert: PropTypes.bool,
  acceptButton: PropTypes.bool,
  acceptButtonLabel: PropTypes.string,
  closeButton: PropTypes.bool,
  closeButtonLabel: PropTypes.string,
  scrollable: PropTypes.bool,
  simple: PropTypes.bool
};

DialogDemo.defaultProps = {
  alert: false,
  acceptButton: true,
  acceptButtonLabel: 'Accept',
  closeButton: true,
  closeButtonLabel: 'Decline',
  scrollable: false,
  simple: false
};

storiesOf('Dialog', module)
  .add('Basic', () => <DialogDemo />)
  .add('Alert', () => (
    <DialogDemo alert acceptButton={false} closeButtonLabel="Ok" />
  ))
  .add('Simple', () => (
    <DialogDemo acceptButton={false} closeButton={false} simple />
  ))
  .add('Confirmation', () => (
    <DialogDemo acceptButtonLabel="Ok" closeButtonLabel="Cancel" />
  ))
  .add('Scrollable', () => <DialogDemo scrollable />);
