import React from "react";
import styles from "./VideoBackground.module.scss"
import videoData from "../../assets/liquid-gradient.mp4"

const VideoBackground = ({videoSrc = videoData}) => {
  return (
    <video autoPlay muted loop className={styles.video}>
      <source src={videoSrc} type="video/mp4" />
        Your browser does not support HTML5 video.
    </video>
  );
};

export default VideoBackground;
