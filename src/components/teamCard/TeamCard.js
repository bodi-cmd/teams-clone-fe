import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TeamCard.module.scss";

const TeamCard = ({ name, id }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.card}
      onClick={() => {
        navigate("/group/" + id);
      }}
    >
      <div className={styles.initials}>{name.substr(0, 2).toUpperCase()}</div>
      <span className={styles.title}>{name}</span>
    </div>
  );
};

export default TeamCard;
