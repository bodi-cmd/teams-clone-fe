import React from "react";
import { useState } from "react";
import styles from "./Dialog.module.scss";

const Dialog = ({onSubmit, onCancel, headerText="Put your text here",buttonText="text here" }) => {
    const [input, setInput] = useState("")
  return (
    <div className={styles.overlay} onClick={(e)=>{e.stopPropagation(); onCancel()}}>
      <div className={styles.window} onClick={(e)=>{e.stopPropagation();}}>
        <h1>{headerText}</h1>
        <span className={styles.inputGroup}>
          <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" />
          <button onClick={()=>{onSubmit(input)}}>{buttonText}</button>
        </span>
      </div>
    </div>
  );
};

export default Dialog;
