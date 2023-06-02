import React from 'react';
import PropTypes from 'prop-types';
import { ButtonLoad } from './Button.styled';
const Button = ({ onClick }) => {
  return (
    <div>
      <ButtonLoad type="button" onClick={onClick}>
        Load more
      </ButtonLoad>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
