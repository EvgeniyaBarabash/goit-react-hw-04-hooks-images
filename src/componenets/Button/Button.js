import React from 'react';
import s from './Button.module.css';
import PropTypes from 'prop-types';
const Button = ({ children, onClick }) => {
  return (
    <button type="button" className={s.Button} onClick={onClick}>
      {children}
    </button>
  );
};
Button.defaultProps = {
  onClick: () => null,
  children: null,
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};
export default Button;
