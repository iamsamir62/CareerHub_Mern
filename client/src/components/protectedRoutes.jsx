import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // Redirect to home if the role is not "recruiter"
  if (user.role !== "recruiter") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoutes;
