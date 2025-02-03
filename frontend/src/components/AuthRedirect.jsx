import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return null; // No UI needed, just redirection logic
};

export default AuthRedirect;
