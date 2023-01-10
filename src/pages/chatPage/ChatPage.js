import React from "react";
import TwoCollumnLayout from "../../layouts/twoCollumnLayout/TwoCollumnLayout";
import styles from "./ChatPage.module.scss";
import GenericMiniNavbar from "../../components/genericMiniNavbar/GenericMiniNavbar";
import GenericRow from "../../components/genericRow/GenericRow";
import ChatWindow from "../../components/chatWindow/ChatWindow";

import { CONFIG } from "../../config/app.config";
import RequestHelper from "../../components/requestHelper/RequestHelper";
import ErrorHandler from "../../components/errorHandler/ErrorHandler";
import DeauthHandler from "../../components/deauthHandler/DeauthHandler";
import TokenProvider from "../../components/tokenProvider/TokenProvider";
import Modal from "../../components/modal/Modal";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const ChatPage = () => {
  const ref = useRef(null);
  const [contacts, setContacts] = useState([]);
  const [messagesData, setMessagesData] = useState({ sender: null, receiver: null, messages: [] });
  const [typingMessage, setTypingMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    name: "",
    email: "",
    username: "",
    profilePicture: null,
  });
  const [getMessagesWrapper, setGetMessagesWrapper] = useState({f:()=>{}});

  const [errors, setErrors] = useState(null);
  const HTTP = RequestHelper(CONFIG.SERVER_ADRESS);
  const token = TokenProvider();
  const deauthHandler = DeauthHandler();

  useEffect(() => {
    if (selectedUser.id) {
      getMessagesById(selectedUser.id);
    }
  }, [selectedUser]);

  const fetchContacts = () => {
    HTTP.GET("/chat/contacts", { token }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        setContacts(data.data);
        if (data.data.length) setSelectedUser(data.data[0]);
      }
    });
  };

  const getMessagesById = (id) => {
    HTTP.GET(`/chat/messages/${id}`, { token }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        setMessagesData(data.data);
      }
    });
  };

  const sendMessageToUser = (userId, content) => {
    HTTP.POST(`/chat/messages/${userId}`, { token }, { content }, (data, error) => {
      if (error) {
        ErrorHandler(error, setErrors, deauthHandler);
        return;
      } else {
        fetchContacts();
      }
    });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      getMessagesById(selectedUser.id);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [selectedUser]);

  const leftCollumn = (
    <React.Fragment>
      <GenericMiniNavbar title={"Chat"} />
      <div className={styles.contacts}>
        {contacts.map((contact) => (
          <GenericRow
            key={`contact-${contact.id}`}
            showImage={true}
            image={contact.profilePicture}
            title={contact.name}
            subtitle={contact.email}
            onClick={() => {
              setSelectedUser(contact);
            }}
          />
        ))}
      </div>
    </React.Fragment>
  );

  const rightCollumn = (
    <React.Fragment>
      <GenericMiniNavbar
        showImage={selectedUser.id}
        image={selectedUser.profilePicture}
        title={selectedUser.name}
        buttons={
          contacts.length
            ? [
                {
                  text: "Chat",
                  onClick: () => {},
                  selected: true,
                },
                // {
                //   text: "Info",
                //   onClick: () => {},
                //   selected: false,
                // },
              ]
            : []
        }
      />
      <div className={styles.chatContainer}>
        <ChatWindow
          inputValue={typingMessage}
          setInputValue={setTypingMessage}
          handleSend={() => {
            if (typingMessage.length) {
              sendMessageToUser(selectedUser.id, typingMessage);
              setTypingMessage("");
            }
          }}
          messages={messagesData.messages.map((msg) => {
            const name = msg.fromMe ? messagesData.sender.name : messagesData.receiver.name;
            const image = msg.fromMe
              ? messagesData.sender.profilePicture
              : messagesData.receiver.profilePicture;
            return {
              name,
              image,
              message: msg.content,
              fromMe: msg.fromMe,
              date: msg.date,
            };
          })}
        />
      </div>
    </React.Fragment>
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
      <TwoCollumnLayout leftCollumn={leftCollumn} rightCollumn={rightCollumn}></TwoCollumnLayout>
    </React.Fragment>
  );
};

export default ChatPage;
