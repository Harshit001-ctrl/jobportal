import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || user.role !== "admin" || !token) {
    return <Navigate to="/login" />;
  }

  return children; // Allow access to the admin page if user is admin
};

export default AdminRoute;