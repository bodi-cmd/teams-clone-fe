import React, { useState } from "react";
import { useEffect } from "react";
import GenericMiniNavbar from "../../components/genericMiniNavbar/GenericMiniNavbar";
import styles from "./ViewAssignmentsPage.module.scss";

import { CONFIG } from "../../config/app.config";
import RequestHelper from "../../components/requestHelper/RequestHelper";
import ErrorHandler from "../../components/errorHandler/ErrorHandler";
import DeauthHandler from "../../components/deauthHandler/DeauthHandler";
import { useNavigate, useParams } from "react-router-dom";
import TokenProvider from "../../components/tokenProvider/TokenProvider";
import Modal from "../../components/modal/Modal";
import ChatWindow from "../../components/chatWindow/ChatWindow";
import FilesWindow from "../../components/filesWindow/FilesWindow";
import AssignmentsWindow from "../../components/assignmentsWindow/AssignmentsWindow";
import SessionStorage from "../../components/sessionStorage/SessionStorage.ts";

const ViewAssignmentsPage = () => {
  const [errors, setErrors] = useState(null);
  const HTTP = RequestHelper(CONFIG.SERVER_ADRESS);
  const navigate = useNavigate();
  const token = TokenProvider();
  const deauthHandler = DeauthHandler();
  const { id } = useParams();
  const sessionStorage = SessionStorage();
  const [assignments, setAssignments] = useState([]);






  const fetchAssignments = () => {
    HTTP.GET("/user/assignments", { token }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        setAssignments(data.data);
      }
    });
  };

  useEffect(() => {
    fetchAssignments();
  }, []);


  return (
    <React.Fragment>
      <GenericMiniNavbar title={"My Tasks"} buttons={[]} />
      <div className={styles.container}>
        <AssignmentsWindow assignments={assignments} onSubmit={() => {}} isOwner={false} />
      </div>
    </React.Fragment>
  );
};

export default ViewAssignmentsPage;
