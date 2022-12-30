import React from "react";
import { useLocation,Navigate } from "react-router-dom";
import SessionStorage from "../../components/sessionStorage/SessionStorage.ts";

const RequireAuth = ({ children }) => {
  let location = useLocation();

  if (!SessionStorage().getItem("auth")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
