import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const LayoutGridCell = ({
  align,
  children,
  className,
  order,
  span,
  spanDesktop,
  spanPhone,
  spanTablet,
  ...otherProps
}) => {
  const classes = classnames('mdc-layout-grid__cell', className, {
    [`mdc-layout-grid__cell--align-${align}`]: align,
    [`mdc-layout-grid__cell--order-${order}`]: order,
    [`mdc-layout-grid__cell--span-${span}`]: span,
    [`mdc-layout-grid__cell--span-${spanDesktop}-desktop`]: spanDesktop,
    [`mdc-layout-grid__cell--span-${spanPhone}-phone`]: spanPhone,
    [`mdc-layout-grid__cell--span-${spanTablet}-tablet`]: spanTablet
  });

  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
};

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

LayoutGridCell.propTypes = {
  align: PropTypes.oneOf(['top', 'middle', 'bottom']),
  children: PropTypes.node,
  className: PropTypes.string,
  order: PropTypes.oneOf(numbers),
  span: PropTypes.oneOf(numbers),
  spanDesktop: PropTypes.oneOf(numbers),
  spanTablet: PropTypes.oneOf(numbers),
  spanPhone: PropTypes.oneOf(numbers)
};

LayoutGridCell.defaultProps = {
  align: null,
  children: null,
  className: null,
  order: null,
  span: null,
  spanDesktop: null,
  spanTablet: null,
  spanPhone: null
};

export default LayoutGridCell;
