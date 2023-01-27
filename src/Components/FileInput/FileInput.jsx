import React from 'react';
import './FileInput.css';

const FileInput = ({...rest}) => {
  return (
      <div>
          <input {...rest} />
    </div>
  )
}

export default FileInput