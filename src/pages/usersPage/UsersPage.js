import React, { useState } from "react";
import { useEffect } from "react";
import GenericMiniNavbar from "../../components/genericMiniNavbar/GenericMiniNavbar";
import styles from "./UsersPage.module.scss";
import { ImCross } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
import { CONFIG } from "../../config/app.config";
import RequestHelper from "../../components/requestHelper/RequestHelper";
import ErrorHandler from "../../components/errorHandler/ErrorHandler";
import DeauthHandler from "../../components/deauthHandler/DeauthHandler";
import TokenProvider from "../../components/tokenProvider/TokenProvider";
import Modal from "../../components/modal/Modal";

const UsersPage = () => {
  const [errors, setErrors] = useState(null);
  const HTTP = RequestHelper(CONFIG.SERVER_ADRESS);
  const token = TokenProvider();
  const deauthHandler = DeauthHandler();
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    HTTP.GET("/admin/get-all-users", { token }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        setUsers(data.data);
      }
    });
  };

  const activateUser = (userId) => {
    HTTP.PUT("/admin/activate/" + userId, { token }, {}, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        fetchUsers();
      }
    });
  };

  const deactivateUser = (userId) => {
    HTTP.PUT("/admin/deactivate/" + userId, { token }, {}, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        fetchUsers();
      }
    });
  };

  useEffect(() => {
    fetchUsers();
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
      <GenericMiniNavbar title={"Users"} buttons={[]} />
      <div className={styles.container}>
        {users.map((user) => {
          return (
            <div className={styles.row} key={user.id}>
              <div className={styles.left}>
                <span className={styles.username}>{user.username}</span>
                <span className={styles.username}>{user.name}</span>
                <span className={styles.username}>{user.email}</span>
                <span className={styles.username}>{user.role}</span>
              </div>
              <div className={styles.right}>
                {user.active ? (
                  <ImCross className={styles.icon} onClick={() => {deactivateUser(user.id)}} />
                ) : (
                  <BsCheckLg className={styles.icon} onClick={() => {activateUser(user.id)}} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default UsersPage;
