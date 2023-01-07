import React, { useState } from "react";
import { useEffect } from "react";
import GenericMiniNavbar from "../../components/genericMiniNavbar/GenericMiniNavbar";
import styles from "./ViewProfile.module.scss";

import { CONFIG } from "../../config/app.config";
import RequestHelper from "../../components/requestHelper/RequestHelper";
import ErrorHandler from "../../components/errorHandler/ErrorHandler";
import DeauthHandler from "../../components/deauthHandler/DeauthHandler";
import TokenProvider from "../../components/tokenProvider/TokenProvider";
import Modal from "../../components/modal/Modal";
import { useRef } from "react";

const ViewProfile = () => {
  const [errors, setErrors] = useState(null);
  const HTTP = RequestHelper(CONFIG.SERVER_ADRESS);
  const token = TokenProvider();
  const deauthHandler = DeauthHandler();
  const inputFileRef = useRef(null);
  

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      changeProfilePicture(e.target.files[0]);
    }
  };

  const [personalInfo, setPersonalInfo] = useState({
    username: "loading...",
    name: "loading...",
    email: "loading...",
    role: "loading...",
    profilePicture: null,
  });

  const img_src = personalInfo.profilePicture
          ? `data:${personalInfo.profilePicture.type};base64,${personalInfo.profilePicture.content}`
          : CONFIG.DEFAULT_AVATAR;

  const fetchProfile = () => {
    HTTP.GET("/user/profile", { token }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        setPersonalInfo(data.data);
      }
    });
  };

  const updatePersonalData = () => {
    const body = {
      username: personalInfo.username,
      name: personalInfo.name,
      email: personalInfo.email,
      oldPassword: personalInfo.oldPassword,
      newPassword: personalInfo.newPassword,
    };

    HTTP.PUT("/user/profile", { token }, body, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        setPersonalInfo(data.data);
        setErrors({
          title: "Success",
          message: "Your profile has been updated successfully",
          onExit: () => {
            setErrors(null);
          },
        });
      }
    });
  };

  const changeProfilePicture = (file) => {
    HTTP.formDataPOST("/user/profile-picture/save", { token }, { image:file }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        setPersonalInfo(data.data);
        setErrors({
          title: "Success",
          message: "Your profile has been updated successfully",
          onExit: () => {
            setErrors(null);
          },
        });
      }
    });
  };

  useEffect(() => {
    fetchProfile();
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
      <GenericMiniNavbar title={"My profile"} buttons={[]} />
      <div className={styles.container}>
        <div className={styles.col}>
          <img src={img_src} alt="profile_picture" />
          <input
            ref={inputFileRef}
            style={{ display: "none" }}
            type="file"
            onChange={handleImageChange}
          />
          <button
            onClick={() => {
              inputFileRef.current.click();
            }}
          >
            Change picture
          </button>
        </div>
        <div className={styles.col}>
          <h1>Role:</h1>
          <input value={personalInfo.role} className={styles.inputField} type="text" readOnly />
          <h1>Name:</h1>
          <input
            value={personalInfo.name}
            onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
            className={styles.inputField}
            type="text"
          />
          <h1>Username:</h1>
          <input
            value={personalInfo.username}
            onChange={(e) => setPersonalInfo({ ...personalInfo, username: e.target.value })}
            className={styles.inputField}
            type="text"
          />
          <h1>Email:</h1>
          <input
            value={personalInfo.email}
            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
            className={styles.inputField}
            type="text"
          />
          <h1>Old password:</h1>
          <input
            value={personalInfo.oldPassword}
            onChange={(e) => setPersonalInfo({ ...personalInfo, oldPassword: e.target.value })}
            className={styles.inputField}
            type="password"
          />
          <h1>New password:</h1>
          <input
            value={personalInfo.newPassword}
            onChange={(e) => setPersonalInfo({ ...personalInfo, newPassword: e.target.value })}
            className={styles.inputField}
            type="password"
          />
          <button onClick={() => updatePersonalData()}>Update personal info</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewProfile;
