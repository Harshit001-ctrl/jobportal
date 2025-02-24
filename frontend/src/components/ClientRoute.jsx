import { Navigate } from "react-router-dom";

const ClientRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Redirect if user is not logged in or doesn't have the 'client' role
  if (!user || user.role !== "client" || !token) {
    return <Navigate to="/login" />;
  }

  return children; // Allow access if user is a client
};

export default ClientRoute;
