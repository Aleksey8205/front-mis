import React from 'react';
import "../shared/preloader.css"
import chickenGif from "../public/images/image-index/chicken-gif.gif";

const Preloader = () => {
  return (
    <div className="preloader">
      <img className="logo-gif-pre" src={chickenGif} alt="" />
      <div className="animated-progress-bar-container">
        <div className="animated-progress-bar"></div>
      </div>
    </div>
  );
};

export default Preloader;