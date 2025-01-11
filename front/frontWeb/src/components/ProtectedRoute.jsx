import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("userId");

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
    children:PropTypes.node.isRequired
};

