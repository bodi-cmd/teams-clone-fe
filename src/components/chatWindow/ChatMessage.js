import React from 'react'
import { CONFIG } from '../../config/app.config';
import styles from './ChatWindow.module.scss'

const ChatMessage = ({image, message, name, date, fromMe, ...props}) => {
  const dateObj = new Date(date);
  const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour:"2-digit", minute:"2-digit" };

  const default_image = CONFIG.DEFAULT_AVATAR;
  const img_src = image ? `data:${image.type};base64,${image.content}` : default_image;
  return (
    <div className={`${styles.message} ${fromMe ? styles.reverse : null}`} {...props}>
        <img src={img_src} alt="profile_picture" />
        <div className={styles.messageBox}>
            <span className={styles.header}>
                <span className={styles.name}>{name}</span>
                <span className={styles.date}>{dateObj.toLocaleDateString(undefined, options)}</span>
            </span>
            <span className={styles.messageBody}>
                {message}
            </span>
        </div>
    </div>
  )
}

export default ChatMessage