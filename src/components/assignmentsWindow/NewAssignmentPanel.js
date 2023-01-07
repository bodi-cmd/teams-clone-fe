import React from "react";
import styles from "./AssignmentsWindow.module.scss";
import { BiTask } from "react-icons/bi";
import { useState } from "react";

const NewAssignmentPanel = ({ className, onSubmit }) => {
  const [inputs, setInputs] = useState({ title: "", description: "" });

  return (
    <div className={`${styles.newAssignmentContainer} ${className}`}>
      <h1>Title</h1>
      <input
        value={inputs.title}
        onChange={(e) => {
          setInputs({ ...inputs, title: e.target.value });
        }}
        className={styles.inputField}
        type="text"
      />
      <h1>Description</h1>
      <textarea
        value={inputs.description}
        onChange={(e) => {
          setInputs({ ...inputs, description: e.target.value });
        }}
        className={styles.inputField}
        type="text"
      />
      <button
        onClick={() => {
          onSubmit(inputs);
        }}
      >
        <BiTask className={styles.icon} />
        Done
      </button>
    </div>
  );
};

export default NewAssignmentPanel;
