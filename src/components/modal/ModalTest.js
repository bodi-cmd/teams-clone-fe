import React, { useRef, useState } from "react";
import ErrorQueue from "./ErrorQueue";
import Modal from "./Modal";

const ModalTest = () => {
  const [errorModals, push, pop] = ErrorQueue();

  const acasaButtonHandler = () => {
    pop();
    push([
      {
        title: "Ai apasat Acasa...",
        message: "Salut!",
      },
    ]);
  };

  const okButtonHandler = () => {
    pop();
    push([
      {
        title: "Ai apasat Acasa...",
        message: "Salut!",
      },
    ]);
  };

  const generateErrorButton = () => {
    push([
      {
        title: "Eroare mare rau :(",
        message: "Nu mai ai ce sa faci....",
      },
      {
        title: "Eroare mare rau 2 :(",
        message: ["Nu mai ai ce sa faci....1", "Nu mai ai ce sa faci....2"],
        buttons: (
          <>
            <button onClick={acasaButtonHandler}>Acasa</button>
            <button onClick={okButtonHandler}>Ok</button>
          </>
        ),
      },
    ]);
  };

  return (
    <>
      {errorModals}
      <button onClick={generateErrorButton}>click</button>
    </>
  );
};

export default ModalTest;
