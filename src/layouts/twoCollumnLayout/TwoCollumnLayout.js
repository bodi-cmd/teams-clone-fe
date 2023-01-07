import React from "react";
import styles from './TwoCollumnLayout.module.scss'

const TwoCollumnLayout = ({ leftCollumn, rightCollumn, displayFirstCollumn = true }) => {
  return (
    <>
      {displayFirstCollumn &&<div className={styles.left}>{leftCollumn}</div>}
      <div className={styles.right}>{rightCollumn}</div>
    </>
  );
};

export default TwoCollumnLayout;
