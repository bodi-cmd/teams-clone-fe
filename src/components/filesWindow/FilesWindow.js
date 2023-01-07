import React from "react";
import { CONFIG } from "../../config/app.config";
import styles from "./FilesWindow.module.scss";
import { AiOutlineCloudUpload, AiOutlineCloudDownload } from "react-icons/ai";
import { useState } from "react";
import { useRef } from "react";

const FilesWindow = ({ files = [], onUpload, ...props }) => {
  const inputFileRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className={styles.filesContainer}>
      {files.map((file) => {
        const default_image = CONFIG.DEFAULT_AVATAR;
        const img_src = file.user.profilePicture
          ? `data:${file.user.profilePicture.type};base64,${file.user.profilePicture.content}`
          : default_image;
        const dateObj = new Date(file.date);
        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        };
        const size = (file.content.length * 6) / 8 / 1024;

        return (
          <div className={styles.fileRow} key={file.id}>
            <img src={img_src} alt="profile_picture" />
            <span className={styles.username}>{file.user.name}</span>
            <span className={styles.name}>{file.name}</span>
            <span className={styles.date}>{dateObj.toLocaleDateString(undefined, options)}</span>
            <span className={styles.size}>{size.toFixed(1)} KB</span>
            <a href={`data:${file.type};base64,${file.content}`} download={file.name}>
              <span>Download</span>
              <AiOutlineCloudDownload className={styles.icon} />
            </a>
          </div>
        );
      })}
      <button
        onClick={() => {
          inputFileRef.current.click();
        }}
      >
        <AiOutlineCloudUpload className={styles.icon} />
        Upload a file
      </button>
      <input
        ref={inputFileRef}
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FilesWindow;
