import React from "react";
import styles from "./authStyle.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionStorage from "../../components/sessionStorage/SessionStorage.ts";
import { CONFIG } from "../../config/app.config";
import RequestHelper from "../../components/requestHelper/RequestHelper";
import ErrorHandler from "../../components/errorHandler/ErrorHandler";
import DeauthHandler from "../../components/deauthHandler/DeauthHandler";
import Modal from "../../components/modal/Modal";
import Logo from "../../assets/logo.png"

export function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState(null);

  const HTTP = RequestHelper(CONFIG.SERVER_ADRESS);
  const navigate = useNavigate();
  const storage = SessionStorage();
  const deauthHandler = DeauthHandler();

  const submitCredentials = () => {
    const body = {
      ...credentials,
    };

    HTTP.POST("/user/login", null, body, (data, error) => {
      if (error) {
          ErrorHandler(error, setErrors, deauthHandler);
          return;
      } else {
        storage.setItem("auth", data.data.token);
        storage.setItemJSON("user", data.data.user);
        navigate("/groups");
      }
    });
  };

  return (
    <>
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
      <div className={styles.screen}>
        <div className={styles.container}>
          <img className={styles.logo} src={Logo}/>
          <h1>Megasoft Groups</h1>
          <div className={styles.form}>
            <input
              value={credentials.username}
              onChange={(e) => {
                setCredentials({ ...credentials, username: e.target.value });
              }}
              placeholder="username"
              type="text"
              name="username"
              className={styles.username}
            />
            <input
              value={credentials.password}
              onChange={(e) => {
                setCredentials({ ...credentials, password: e.target.value });
              }}
              placeholder="password"
              type="password"
              name="password"
              className={styles.password}
            />
            <button onClick={submitCredentials}>Log in</button>
          </div>
          <a href="./register">I don't have an account...</a>
        </div>
      </div>
    </>
  );
}
export default Login;
