import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class FormField extends React.Component {
  get classes() {
    const { alignEnd, className } = this.props;

    return classnames('mdc-form-field', className, {
      'mdc-form-field--align-end': alignEnd
    });
  }

  render() {
    const { alignEnd, children, className, ...otherProps } = this.props;

    return (
      <div className={this.classes} {...otherProps}>
        {children}
      </div>
    );
  }
}

FormField.propTypes = {
  alignEnd: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
};

FormField.defaultProps = {
  alignEnd: false,
  children: null,
  className: null
};

export default FormField;
