import React from 'react';
import './Video.css';

const Video = ({ title, id, noq }) => {
  return (
    <div className="video">
      <img src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={title} />
      <p>{title}</p>
      <div className="qmeta">
        <p>
          {noq} {noq > 1 ? "Questions" : "Question"}
        </p>
        <p>Score : {noq} / {noq}</p>
      </div>
    </div>
  );
}

export default Video