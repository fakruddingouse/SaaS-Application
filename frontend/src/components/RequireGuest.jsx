// components/RequireGuest.jsx
import { Navigate } from "react-router-dom";

const RequireGuest = ({ user, children }) => {
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RequireGuest;