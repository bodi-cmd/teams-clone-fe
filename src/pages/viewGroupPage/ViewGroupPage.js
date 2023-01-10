import React, { useState } from "react";
import { useEffect } from "react";
import GenericMiniNavbar from "../../components/genericMiniNavbar/GenericMiniNavbar";
import styles from "./ViewGroupPage.module.scss";

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

const ViewGroupPage = () => {
  const [errors, setErrors] = useState(null);
  const HTTP = RequestHelper(CONFIG.SERVER_ADRESS);
  const navigate = useNavigate();
  const token = TokenProvider();
  const deauthHandler = DeauthHandler();
  const { id } = useParams();
  const sessionStorage = SessionStorage();

  const [groupMetaData, setGroupMetaData] = useState({
    name: "loading...",
    key: "loading...",
  });
  const [posts, setPosts] = useState([]);
  const [files, setFiles] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [isUserOwner, setIsUserOwner] = useState(false);

  const [typingMessage, setTypingMessage] = useState("");
  const [selectedPage, setSelectedPage] = useState("POSTS");

  const navbarButtons = [
    {
      text: "Posts",
      onClick: () => {
        setSelectedPage("POSTS");
      },
      selected: selectedPage === "POSTS",
    },
    {
      text: "Files",
      onClick: () => {
        setSelectedPage("FILES");
      },
      selected: selectedPage === "FILES",
    },
    {
      text: "Assignments",
      onClick: () => {
        setSelectedPage("ASSIGNMENTS");
      },
      selected: selectedPage === "ASSIGNMENTS",
    },
  ];

  const fetchGroupMetaData = () => {
    HTTP.GET("/group/get-group/" + id, { token }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        setGroupMetaData(data.data);
        checkIfUserIsOwner(data.data);
      }
    });
  };

  const fetchGroupPosts = () => {
    HTTP.GET("/group/posts/" + id, { token }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        setPosts(data.data);
      }
    });
  };

  const fetchGroupFiles = () => {
    HTTP.GET("/group/files/" + id, { token }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        setFiles(data.data);
      }
    });
  };

  const fetchGroupAssignments = () => {
    HTTP.GET("/group/assignments/" + id, { token }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        setAssignments(data.data);
      }
    });
  };

  const handleNewPostClick = (content) => {
    HTTP.POST("/group/upload-post/" + id, { token }, { content }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        fetchGroupPosts();
      }
    });
  };

  const handleUpload = (file) => {
    HTTP.formDataPOST("/group/upload-file/" + id, { token }, { file }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        fetchGroupFiles();
      }
    });
  };

  useEffect(() => {
    if (selectedPage === "POSTS") {
      fetchGroupPosts();
    } else if (selectedPage === "FILES") {
      fetchGroupFiles();
    } else if (selectedPage === "ASSIGNMENTS") {
      fetchGroupAssignments();
    }
  }, [selectedPage]);

  const handleSubmit = (inputFields) => {
    const body = {
      title: inputFields.title,
      description: inputFields.description,
    };
    HTTP.POST("/group/create-assignment/" + id, { token }, body, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        fetchGroupAssignments();
      }
    });
  };

  const checkIfUserIsOwner = (fetchedData) => {
    const userData = sessionStorage.getItemJSON("user");
    const isOwner = userData.id === fetchedData.owner.id;
    setIsUserOwner(isOwner);
  };

  useEffect(() => {
    fetchGroupMetaData();
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
      <GenericMiniNavbar
        title={groupMetaData.name}
        buttons={[
          ...navbarButtons,
          {
            text: `Enroll Key`,
            onClick: () => {
              setErrors({
                title:"Enroll Key",
                message:["Give the following key to people so they can join your group",`KEY: ${groupMetaData.enrollKey}`],
                buttons:[],
              })
            },
            selected: false,
          },
        ]}
      />
      <div className={styles.container}>
        {selectedPage === "POSTS" && (
          <ChatWindow
            inputValue={typingMessage}
            setInputValue={setTypingMessage}
            handleSend={() => {
              if (typingMessage.length) {
                handleNewPostClick(typingMessage);
                setTypingMessage("");
              }
            }}
            messages={posts.map((post) => {
              const name = post.user.name;
              const image = post.user.profilePicture;
              return {
                name,
                image,
                message: post.content,
                fromMe: false,
                date: post.date,
              };
            })}
          />
        )}
        {selectedPage === "FILES" && <FilesWindow files={files} onUpload={handleUpload} />}
        {selectedPage === "ASSIGNMENTS" && (
          <AssignmentsWindow
            assignments={assignments}
            onSubmit={handleSubmit}
            isOwner={isUserOwner}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default ViewGroupPage;
