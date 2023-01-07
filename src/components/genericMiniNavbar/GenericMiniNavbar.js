import React from "react";
import { CONFIG } from "../../config/app.config";
import styles from "./GenericMiniNavbar.module.scss";

const GenericMiniNavbar = ({showImage, title, image, buttons = [] }) => {
  const default_image = CONFIG.DEFAULT_AVATAR;
  const img_src = image ? `data:${image.type};base64,${image.content}` : default_image;
  return (
    <div className={styles.miniNavbar}>
      {showImage && <img src={img_src} alt="icon" />}
      <h1>{title}</h1>
      {buttons.map((button) => (
        <button
          key={`navbar-btn-${button.text.replace(/\s/g, "")}`}
          onClick={button.onClick}
          className={`${styles.button} ${button.selected ? styles.selected : null}`}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default GenericMiniNavbar;
