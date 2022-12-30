import React from "react";
import { CONFIG } from "../../config/app.config";
import styles from "./GenericRow.module.scss";

const GenericRow = ({
  showImage,
  image,
  title,
  subtitle,
  showInitialsAsImage = false,
  ...props
}) => {
  const default_image = CONFIG.DEFAULT_AVATAR;
  const img_src = image ? `data:${image.type};base64,${image.content}` : default_image;
  return (
    <div className={styles.row} {...props}>
      {showImage && <img src={img_src} alt="profile_picture" />}
      {showInitialsAsImage && <div className={styles.initials}>{title.substr(0, 2).toUpperCase()}</div>}
      <span className={styles.collumn}>
        {title && <h1>{title}</h1>}
        {subtitle && <h2>{subtitle}</h2>}
      </span>
    </div>
  );
};

export default GenericRow;
