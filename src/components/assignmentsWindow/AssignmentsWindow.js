import React from "react";
import styles from "./AssignmentsWindow.module.scss";
import { IoMdCreate } from "react-icons/io";
import { useState } from "react";
import NewAssignmentPanel from "./NewAssignmentPanel";
import SessionStorage from "../sessionStorage/SessionStorage.ts";
import ViewAssignmentPanel from "./ViewAssignmentPanel";

const AssignmentsWindow = ({ assignments = [], onSubmit, onSolutionUpload, isOwner, ...props }) => {
  const [dualWindow, setDualWindow] = useState(false);
  const [secondWindow, setSecondWindow] = useState(null);

  const newAssignmentPanel = (
    <NewAssignmentPanel
      className={`${styles.rightPanel} ${styles.dualWindow}`}
      onSubmit={onSubmit}
    />
  );

  const viewAssignmentPanel = (assignment) => (
    <ViewAssignmentPanel
      className={`${styles.rightPanel} ${styles.dualWindow}`}
      title={assignment.title}
      description={assignment.description}
      id={assignment.id}
      isOwner={isOwner}
    />
  );

  return (
    <div className={styles.flexPanel}>
      <div
        className={`${styles.filesContainer} ${secondWindow !== null ? styles.dualWindow : null}`}
      >
        {assignments.map((assignment) => {
          const dateObj = new Date(assignment.date);
          const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          };
          return (
            <div
              className={styles.fileRow}
              key={assignment.id}
              onClick={() => {
                setSecondWindow(viewAssignmentPanel(assignment));
              }}
            >
              <span className={styles.title}>{assignment.title}</span>
              <span className={styles.date}>{dateObj.toLocaleDateString(undefined, options)}</span>
            </div>
          );
        })}
        {isOwner && (
          <button
            onClick={() => {
              setSecondWindow(newAssignmentPanel);
            }}
          >
            <IoMdCreate className={styles.icon} />
            Create assignment
          </button>
        )}
      </div>
      {secondWindow}
    </div>
  );
};

export default AssignmentsWindow;
