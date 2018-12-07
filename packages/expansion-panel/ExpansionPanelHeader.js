import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class ExpansionPanelHeader extends React.Component {
  get classes() {
    const { className } = this.props;
    return classnames('mdc-expansion-panel__header', className);
  }

  render() {
    const {
      children,
      className,
      hideExpansionIcon,
      ...otherProps
    } = this.props;

    return (
      <div className={this.classes} {...otherProps}>
        <ExpansionIcon show={!hideExpansionIcon} />
        {children}
      </div>
    );
  }
}

const ExpansionIcon = ({ show }) =>
  show && <i className="material-icons mdc-expansion-panel__expansion-icon" />;

ExpansionPanelHeader.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  details: PropTypes.bool,
  summary: PropTypes.bool
};

ExpansionPanelHeader.defaultProps = {
  children: null,
  className: null,
  details: false,
  summary: false
};

export default ExpansionPanelHeader;
