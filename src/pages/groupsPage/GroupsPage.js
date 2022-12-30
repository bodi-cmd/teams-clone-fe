import React, { useState } from "react";
import { useEffect } from "react";
import GenericMiniNavbar from "../../components/genericMiniNavbar/GenericMiniNavbar";
import TeamCard from "../../components/teamCard/TeamCard";
import styles from "./GroupsPage.module.scss";

import { CONFIG } from "../../config/app.config";
import RequestHelper from "../../components/requestHelper/RequestHelper";
import ErrorHandler from "../../components/errorHandler/ErrorHandler";
import DeauthHandler from "../../components/deauthHandler/DeauthHandler";
import { useNavigate } from "react-router-dom";
import TokenProvider from "../../components/tokenProvider/TokenProvider";
import SessionStorage from "../../components/sessionStorage/SessionStorage.ts";
import Dialog from "../../components/dialog/Dialog";
import Modal from "../../components/modal/Modal";

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [dialog, setDialog] = useState(null);

  const [errors, setErrors] = useState(null);
  const HTTP = RequestHelper(CONFIG.SERVER_ADRESS);
  const navigate = useNavigate();
  const token = TokenProvider();
  const deauthHandler = DeauthHandler();
  const sessionStorage = SessionStorage();

  const initialNavbarButtons = [
    {
      text: "Join group",
      onClick: () => {
        setDialog(joinGroupDialog);
      },
      selected: false,
    },
  ];

  const [navbarButtons, setNavbarButtons] = useState(initialNavbarButtons);

  const fetchGroups = () => {
    HTTP.GET("/user/groups", { token }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        setGroups(data.data);
      }
    });
  };

  useEffect(() => {
    fetchGroups();
    const userRole = sessionStorage.getItemJSON("user").role;
    if (userRole === "PROFESSOR") {
      setNavbarButtons([
        ...initialNavbarButtons,
        {
          text: "Create group",
          onClick: () => {
            setDialog(newGroupDialog);
          },
          selected: false,
        },
      ]);
    }
  }, []);

  const handleJoinGroupClick = (key) => {
    setDialog(null);
    HTTP.POST("/group/join?enrollKey=" + key, { token }, {}, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        fetchGroups();
      }
    });
  };

  const handleNewGroupClick = (name) => {
    setDialog(null);
    HTTP.POST("/group/new-group", { token }, { name }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        fetchGroups();
      }
    });
  };

  const joinGroupDialog = (
    <Dialog
      onSubmit={handleJoinGroupClick}
      onCancel={() => {
        setDialog(null);
      }}
      headerText={"Enter the group's key"}
      buttonText={"Join"}
    />
  );

  const newGroupDialog = (
    <Dialog
      onSubmit={handleNewGroupClick}
      onCancel={() => {
        setDialog(null);
      }}
      headerText={"Enter the name for the new group"}
      buttonText={"Create"}
    />
  );

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
      {dialog}
      <GenericMiniNavbar title={"My Groups"} buttons={navbarButtons} />
      <div className={styles.container}>
        {groups.map((group) => (
          <TeamCard key={`group-${group.id}`} name={group.name} id={group.id} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default GroupsPage;
