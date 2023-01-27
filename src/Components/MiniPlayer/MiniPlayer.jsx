import React, { useRef, useState } from 'react';
import './MiniPlayer.css'
import ReactPlayer from "react-player";

const MiniPlayer = ({ videoID, videoTitle }) => {
  const buttonRef = useRef();
  const [toggle, setToggle] = useState(false);
  const videoURL = `https://www.youtube.com/watch?v=${videoID}`;

  const toggleMiniplayer = () => {
    if (!toggle) {
      buttonRef.current.classList.remove("floatingBtn");
      setToggle(true);
    } else {
      buttonRef.current.classList.add("floatingBtn");
      setToggle(false);
    }
  };

  return (
    <div
      className="miniPlayer floatingBtn"
      ref={buttonRef}
      onClick={toggleMiniplayer}
    >
      <span className="material-icons-outlined open"> play_circle_filled </span>
      <span
        className="material-icons-outlined close"
        onClick={toggleMiniplayer}
      >
        {" "}
        close{" "}
      </span>
      <ReactPlayer
        url={videoURL}
        width="300px"
        height="168px"
        controls={true}
        playing={toggle}
      />
      <p>{videoTitle}</p>
    </div>
  );
};

export default MiniPlayer