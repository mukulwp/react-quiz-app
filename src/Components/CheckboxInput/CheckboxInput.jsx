import React from 'react';

const CheckboxInput = ({text, className, ...rest}) => {
  return (
    <label className={className}>
      <input type="checkbox" {...rest} />
      <span>{text}</span>
    </label>
  );
}

export default CheckboxInput