import { Navigate } from "react-router-dom";

const ClientRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || user.role !== "client" || !token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ClientRoute;
