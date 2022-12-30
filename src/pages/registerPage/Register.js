import React from "react";
import styles from "../loginPage/authStyle.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionStorage from "../../components/sessionStorage/SessionStorage.ts";
import { CONFIG } from "../../config/app.config";
import RequestHelper from "../../components/requestHelper/RequestHelper";
import ErrorHandler from "../../components/errorHandler/ErrorHandler";
import DeauthHandler from "../../components/deauthHandler/DeauthHandler";
import Modal from "../../components/modal/Modal";
import Logo from "../../assets/logo.png";

export function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    key: "",
    username: "",
    role: "",
  });
  const [errors, setErrors] = useState(null);

  const HTTP = RequestHelper(CONFIG.SERVER_ADRESS);
  const navigate = useNavigate();
  const storage = SessionStorage();
  const deauthHandler = DeauthHandler();

  const submitCredentials = () => {
    const body = {
      ...credentials,
    };

    delete body.key;

    HTTP.POST("/user/register", null, body, (data, error) => {
      console.log(body)
      if (error) {
        if (error) {
          ErrorHandler(error, setErrors, deauthHandler);
          return;
        }
      } else {
        navigate("/login");
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
          <img className={styles.logo} src={Logo} />
          <div className={styles.form}>
            <input
              value={credentials.username}
              onChange={(e) => {
                setCredentials({ ...credentials, username: e.target.value });
              }}
              placeholder="username"
              type="text"
              name="username"
            />
            <input
              value={credentials.email}
              onChange={(e) => {
                setCredentials({ ...credentials, email: e.target.value });
              }}
              placeholder="email"
              type="text"
              name="email"
            />
            <input
              value={credentials.password}
              onChange={(e) => {
                setCredentials({ ...credentials, password: e.target.value });
              }}
              placeholder="password"
              type="password"
              name="password"
            />
            <input
              value={credentials.name}
              onChange={(e) => {
                setCredentials({ ...credentials, name: e.target.value });
              }}
              placeholder="Full Name"
              type="text"
              name="name"
            />
            <select
              defaultValue={""}
              onChange={(e) => {
                setCredentials({ ...credentials, role: e.target.value });
              }}
            >
              <option value="" disabled>Professor or student?</option>
              <option value="PROFESSOR">Professor</option>
              <option value="STUDENT">Student</option>
            </select>
            <button onClick={submitCredentials}>Register</button>
          </div>
          <a href="./login">I already have an account...</a>
        </div>
      </div>
    </>
  );
}
export default Login;
