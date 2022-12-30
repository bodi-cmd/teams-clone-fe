import React, { useEffect, useState } from "react";
import styles from "./LeftNavbar.module.scss";
import { buttons } from "./NavbarButtons";
import { useNavigate } from "react-router-dom";

const LeftNavbar = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(window.location.pathname);
  }, [window.location.pathname]);

  const renderButtonsByPosition = (position) => {
    return buttons
    .filter((button) => button.position === position)
    .map((button) => {
      const Icon = button.icon;
      return (
        <div
          key={button.url}
          className={`${styles.button} ${button.url === selected ? styles.selected : ""}`}
          onClick={() => navigate(button.url)}
        >
          <Icon className={styles.icon} />
          <span className={styles.label}>{button.text}</span>
        </div>
      );
    })
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.section}>
        {renderButtonsByPosition("UP")}
      </div>
      <div className={styles.section}>
        {renderButtonsByPosition("DOWN")}
      </div>
    </div>
  );
};

export default LeftNavbar;
