import React, { useState } from "react";
import { useEffect } from "react";
import GenericMiniNavbar from "../../components/genericMiniNavbar/GenericMiniNavbar";
import styles from "./ViewNotifications.module.scss";
import { ImCross } from "react-icons/im";
import { CONFIG } from "../../config/app.config";
import RequestHelper from "../../components/requestHelper/RequestHelper";
import ErrorHandler from "../../components/errorHandler/ErrorHandler";
import DeauthHandler from "../../components/deauthHandler/DeauthHandler";
import { useNavigate, useParams } from "react-router-dom";
import TokenProvider from "../../components/tokenProvider/TokenProvider";
import Modal from "../../components/modal/Modal";
import SessionStorage from "../../components/sessionStorage/SessionStorage.ts";

const ViewNotifications = () => {
  const [errors, setErrors] = useState(null);
  const HTTP = RequestHelper(CONFIG.SERVER_ADRESS);
  const navigate = useNavigate();
  const token = TokenProvider();
  const deauthHandler = DeauthHandler();
  const { id } = useParams();
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    HTTP.GET("/notifications", { token }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        setNotifications(data.data);
      }
    });
  };

  const handleNotificationSeen = (notificationId) => {
    HTTP.PUT("/notifications/seen/" + notificationId, { token }, {}, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        fetchNotifications();
      }
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <React.Fragment>
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
      <GenericMiniNavbar title={"Notifications"} buttons={[]} />
      <div className={styles.container}>
        {notifications.map((notification) => {
          const dateObj = new Date(notification.date);
          const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          };

          return (
            <div className={styles.row} key={notification.id}>
              <span className={styles.username}>{notification.message}</span>
              <div className={styles.right}>
                <span className={styles.date}>
                  {dateObj.toLocaleDateString(undefined, options)}
                </span>
                <ImCross
                  className={styles.icon}
                  onClick={() => {
                    handleNotificationSeen(notification.id);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ViewNotifications;
