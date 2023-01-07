import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import ChatMessage from "./ChatMessage";
import styles from "./ChatWindow.module.scss";

const ChatWindow = ({ messages = [], inputValue, setInputValue, handleSend }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <ChatMessage
            key={`${msg.name}-${msg.date}`}
            message={msg.message}
            image={msg.image}
            date={msg.date}
            name={msg.name}
            fromMe={msg.fromMe}
          />
        ))}
        <span ref={messagesEndRef} />
      </div>
      <div className={styles.typingBox}>
        <textarea
          type="text"
          placeholder="Enter your message here..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleSend();
              e.preventDefault();
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
