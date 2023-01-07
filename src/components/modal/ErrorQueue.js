import React, { useState } from "react";
import Modal from "./Modal";

const ErrorQueue = () => {
  const [queue, setQueue] = useState([]);

  const push = (error) => {
    setQueue([...queue, ...error]);
  };

  const pop = () => {
    setQueue([...queue.splice(1)]);
  };

  const returnedModals = queue.length ? (
    <Modal
      title={queue[0].title}
      message={queue[0].message}
      buttons={queue[0].buttons}
      onExit={() => {
        setQueue([...queue.splice(1)]);
      }}
    />
  ) : null;

  return [returnedModals, push, pop];
};

export default ErrorQueue;
