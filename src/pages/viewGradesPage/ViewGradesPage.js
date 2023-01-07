import React, { useState } from "react";
import { useEffect } from "react";
import GenericMiniNavbar from "../../components/genericMiniNavbar/GenericMiniNavbar";
import styles from "./ViewGradesPage.module.scss";

import { CONFIG } from "../../config/app.config";
import RequestHelper from "../../components/requestHelper/RequestHelper";
import ErrorHandler from "../../components/errorHandler/ErrorHandler";
import DeauthHandler from "../../components/deauthHandler/DeauthHandler";
import TokenProvider from "../../components/tokenProvider/TokenProvider";
import GenericRow from "../../components/genericRow/GenericRow";

const ViewGradesPage = () => {
  const HTTP = RequestHelper(CONFIG.SERVER_ADRESS);
  const token = TokenProvider();
  const deauthHandler = DeauthHandler();
  const [grades, setGrades] = useState([]);

  const fetchGrades = () => {
    HTTP.GET("/user/grades", { token }, (response, error) => {
      if (error) {
        ErrorHandler(error, () => {}, deauthHandler);
        return;
      } else {
        setGrades(response.data);
      }
    });
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  return (
    <React.Fragment>
      <GenericMiniNavbar title={"Grades"} buttons={[]} />
      <div className={styles.container}>
        {grades.map((grade) => (
          <GenericRow
          key={`grade-id-${grade.grade.id}`}
            showImage={false}
            showInitialsAsImage={true}
            subtitle={
              <>
                <span>{grade.assignment.title}</span>
                <span className={grade.grade.value >= 50 ? styles.passed : styles.failed}>Graded {grade.grade.value} / 100</span>
              </>
            }
            title={grade.group.name}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default ViewGradesPage;
