import React from 'react';
import './Button.css'

const Button = ({text, ...rest}) => {
  return (
    <button {...rest}>
          <span>{text}</span>
    </button>
  );
}

export default Button