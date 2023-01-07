import React from "react";
import styles from "./WaveBackground.module.scss"

const WaveBackground = () => {
  return (
    <div class={styles.ocean}>
      <div class={styles.wave}></div>
      <div class={styles.wave}></div>
    </div>
  );
};

export default WaveBackground;
