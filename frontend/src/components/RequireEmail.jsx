// components/RequireEmail.jsx
import { Navigate } from "react-router-dom";

const RequireEmail = ({ email, children }) => {
  if (!email) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RequireEmail;