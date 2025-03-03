import { useState, useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobPage from "./pages/JobPage";
import Login from "./components/auth/Login";
import SignUpPage from "./pages/SignUpPage";
import EditJobPage from "./pages/EditJobPage";
import AdminDashboard from "./Dashboard/AdminDashboard";
import NotFoundPage from "./pages/NotFoundPage";
// import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
// import ClientDashboard from './Dashboard/ClientDashboard';
// import ClientRoute from './components/ClientRoute';
import { jobLoader } from "./components/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddJobForm } from "./AdminDashboard comp/AddJobForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user"); // Retrieve user data
  
        if (!token || !storedUser) {
          setLoading(false);
          return;
        }
  
        const user = JSON.parse(storedUser);
        setUser(user); // Ensure user state gets updated
  
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []);
  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="jobs/:id" element={<JobPage />} loader={jobLoader} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUpPage />} />
        {/* Admin Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="add-job"
          element={
            <AdminRoute>
              <AddJobForm />
            </AdminRoute>
          }
        />
        <Route
          path="edit-job/:id"
          element={
            <AdminRoute>
              <EditJobPage />
            </AdminRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
