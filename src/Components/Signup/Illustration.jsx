import React from 'react';
import './Illustration.css';

const Illustration = ({img, altText}) => {
  return (
    <div className="illustration">
      <img src={img} alt={altText} />
    </div>
  );
}

export default Illustration