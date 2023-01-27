import React from 'react';
import './TextInput.css';

const TextInput = ({icon, title, ...rest}) => {
  return (
    <div className="textInput">
      <input {...rest} />
      <span title={title} className="material-icons-outlined"> {icon} </span>
    </div>
  );
}

export default TextInput