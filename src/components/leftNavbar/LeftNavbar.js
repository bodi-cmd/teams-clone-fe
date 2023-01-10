import React, { useEffect, useState } from "react";
import styles from "./LeftNavbar.module.scss";
import { buttons } from "./NavbarButtons";
import { useNavigate } from "react-router-dom";
import SessionStorage from '../sessionStorage/SessionStorage.ts';

const LeftNavbar = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState();
  const sessionStorage = SessionStorage();

  useEffect(() => {
    const userRole = sessionStorage.getItemJSON("user").role;
    
  }, []);

  useEffect(() => {
    setSelected(window.location.pathname);
  }, [window.location.pathname]);

  const renderButtonsByPosition = (position) => {
    return buttons
    .filter((button) => button.position === position)
    .filter((button) => button.role ? button.role === sessionStorage.getItemJSON("user").role : true)
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
