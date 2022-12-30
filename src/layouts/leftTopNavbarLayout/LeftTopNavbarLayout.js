import React, { useEffect, useRef, useState } from "react";
import styles from "./LeftTopNavbarLayout.module.scss";

const LeftTopNavbarLayout = ({ leftNavbar, topNavbar, children }) => {
  return (
    <>
      <div className={styles.left}>{leftNavbar}</div>
      <div className={styles.top}>{topNavbar}</div>
      <div className={styles.content}>{children}</div>
    </>
  );
};

export default LeftTopNavbarLayout;
