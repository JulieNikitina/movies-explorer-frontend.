import React from "react";
import { Navigate } from "react-router-dom";


function UnauthorizedUserProtectedRoute({ children, redirectTo, loggedIn }) {
  return loggedIn ? children : <Navigate to={redirectTo} />;
}

export default UnauthorizedUserProtectedRoute;
