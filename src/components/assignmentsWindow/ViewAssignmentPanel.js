import React from "react";
import styles from "./AssignmentsWindow.module.scss";
import { BiTask } from "react-icons/bi";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

import SessionStorage from "../../components/sessionStorage/SessionStorage.ts";
import { useNavigate } from "react-router-dom";
import DeauthHandler from "../deauthHandler/DeauthHandler";
import TokenProvider from "../tokenProvider/TokenProvider";
import RequestHelper from "../requestHelper/RequestHelper";
import { CONFIG } from "../../config/app.config";
import ErrorHandler from "../errorHandler/ErrorHandler";

import { BsExclamationOctagon, BsFillBookmarkCheckFill } from "react-icons/bs";
import GenericRow from "../genericRow/GenericRow";
import DateBeautifier from "../dateBeautifier/DateBeautifier";
import Dialog from "../dialog/Dialog";
import Modal from "../modal/Modal";

const ViewAssignmentPanel = ({ className, id, title = "", description = "", isOwner }) => {
  const [errors, setErrors] = useState(null);
  const HTTP = RequestHelper(CONFIG.SERVER_ADRESS);
  const navigate = useNavigate();
  const token = TokenProvider();
  const deauthHandler = DeauthHandler();
  const sessionStorage = SessionStorage();

  const inputFileRef = useRef(null);
  const [solution, setSolution] = useState({ id: null });
  const [studentSubmissions, setStudentSubmissions] = useState([]);
  const [dialogData, setDialogData] = useState(null);

  const handleSolutionChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleSolutionUpload(e.target.files[0]);
    }
  };

  const fetchSolution = () => {
    HTTP.GET("/assignment/get-solution/" + id, { token }, (data, error) => {
      if (error) {
        ErrorHandler(error, () => {}, deauthHandler);
        return;
      } else {
        setSolution(data.data);
      }
    });
  };

  const fetchStudentsSubmissions = () => {
    HTTP.GET("/assignment/get-all-solutions/" + id, { token }, (data, error) => {
      if (error) {
        ErrorHandler(error, () => {}, deauthHandler);
        return;
      } else {
        setStudentSubmissions(data.data);
      }
    });
  };

  const handleSolutionUpload = (file) => {
    HTTP.formDataPOST("/group/upload-solution/" + id, { token }, { file }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        fetchSolution();
      }
    });
  };

  const gradeSolution = (id, value) => {
    HTTP.POST("/group/create-grade/" + id, { token }, { value }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        fetchStudentsSubmissions();
      }
    });
  };

  useEffect(() => {
    if (isOwner) {
      fetchStudentsSubmissions();
    } else {
      fetchSolution();
    }
  }, [id]);

  return (
    <div className={`${styles.newAssignmentContainer} ${className}`}>
      {!isOwner && (
        <div className={`${styles.status} ${solution.id ? styles.success : styles.warning}`}>
          {solution.id ? (
            <>
              Complete <BsFillBookmarkCheckFill className={styles.icon} />
            </>
          ) : (
            <>
              Undone <BsExclamationOctagon className={styles.icon} />
            </>
          )}
        </div>
      )}
      <h1>Title</h1>
      <div className={styles.title}>{title}</div>
      <h1>Description</h1>
      <div className={styles.description}>{description}</div>
      {!isOwner && <h1>Your Solution:</h1>}
      {!isOwner &&
        (solution.id ? (
          <>
            <div className={styles.description}>Completed</div>
            <a href={`data:${solution.type};base64,${solution.content}`} download={"Solution"}>
              <button>
                <BiTask className={styles.icon} />
                Download your solution
              </button>
            </a>
          </>
        ) : (
          <div className={styles.description}>You haven't uploaded any solution!</div>
        ))}
      {!isOwner && !solution.id && (
        <React.Fragment>
          <button
            onClick={() => {
              inputFileRef.current.click();
            }}
          >
            <BiTask className={styles.icon} />
            Upload Solution
          </button>
          <input
            ref={inputFileRef}
            style={{ display: "none" }}
            type="file"
            onChange={handleSolutionChange}
          />
        </React.Fragment>
      )}
      {isOwner && (
        <>
          <h1>Submissions:</h1>
          <div className={styles.submissionsContainer}>
            {studentSubmissions.map((submisison) => (
              <div className={styles.submisisonRow} key={`submission-id-${submisison.solution.id}`}>
                <GenericRow
                  showImage={true}
                  image={submisison.user.profilePicture}
                  title={submisison.user.name}
                  subtitle={
                    <>
                      <span>{DateBeautifier().beautifyDate(submisison.solution.date)}</span>
                      <a
                        className={styles.download}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        href={`data:${submisison.solution.type};base64,${submisison.solution.content}`}
                        download={"Solution"}
                      >
                        Download
                      </a>
                      {submisison.grade >= 0 && <span>Graded {submisison.grade} / 100</span>}
                    </>
                  }
                  onClick={() => {
                    if (submisison.grade !== -1) return;
                    setDialogData({
                      onSubmit: (value) => {
                        gradeSolution(submisison.solution.id, value);
                        setDialogData(null);
                      },
                      onCancel: () => {
                        setDialogData(null);
                      },
                      headerText: `Give grade to ${submisison.user.name}`,
                      buttonText: "Grade",
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
      {dialogData && <Dialog {...dialogData} />}
      {errors && (
        <Modal
          title={errors.title}
          message={errors.message}
          buttons={errors.buttons}
          onExit={
            errors.onExit
              ? errors.onExit
              : () => {
                  setErrors(null);
                }
          }
        />
      )}
    </div>
  );
};

export default ViewAssignmentPanel;
