import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  let parsedUser = null;

  try {
    parsedUser = user ? JSON.parse(user) : null;
  } catch (error) {
    localStorage.removeItem("user");
  }

  if (!parsedUser || parsedUser.role !== "admin" || !token) {
    return <Navigate to="/login" />;
  }

  return children; 
};

export default AdminRoute;
