import React from "react";
import styles from "./ModalStyle.module.scss";
import { ReactComponent as XIcon } from "../../assets/Icons/x.svg";

const Modal = ({ title, message, buttons, onExit }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h1>{title}</h1>
          {onExit && <XIcon onClick={onExit} className={styles.xIcon} />}
        </div>
        <div className={styles.body}>
          {message instanceof Array ? (
            message.map((msg, index) => <p key={"mesage" + index}>{msg}</p>)
          ) : (
            <p>{message}</p>
          )}
        </div>
        {buttons && <div className={styles.footer}>{buttons}</div>}
      </div>
    </div>
  );
};

export default Modal;
