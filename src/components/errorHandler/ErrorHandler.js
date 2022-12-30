const ErrorHandler = (error, setError, deauthHandler) => {
  if (error.handleable) {
    if (error.code === 401) {
      const errorObj = {
        title: "Server error!",
        message: error.message,
        onExit: () => {
          setError(null);
          deauthHandler.deauth();
        },
      };
      setError(errorObj);
      return errorObj;
    } else {
      const errorObj = {
        title: "Server error!",
        message: error.message,
      };
      setError(errorObj);
      return errorObj;
    }
  } else {
    const errorObj = {
      title: "Client error!",
      message: error.message,
    };
    return errorObj;
  }
};

export default ErrorHandler;
