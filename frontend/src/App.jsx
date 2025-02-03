import { useState, useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../src/components/auth/Login";
// import AdminDashboard from "../src/Dashboard/AdminDashboard";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://your-laravel-backend/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle user login
  // const handleLogin = async (email, password) => {
  //   try {
  //     // Example API request (Replace this with your actual login logic)
  //     const response = await fetch("/api/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       localStorage.setItem("user", JSON.stringify(data.user)); // Store user info
  //       return true; // Success
  //     } else {
  //       return false; // Login failed
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     return false;
  //   }
  // };


  // Handle user signup
  const handleSignUp = async (email, password) => {
    try {
      const response = await fetch("http://your-laravel-backend/api/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(data.user);  // Update the user state here
        toast.success("Sign Up Successful!", {
          position: toast.POSITION.TOP_CENTER,
        });
        return true;
      } else {
        toast.error("Sign Up Failed! Please try again.", {
          position: toast.POSITION.TOP_CENTER,
        });
        return false;
      }
    } catch (error) {
      toast.error("Error during sign up!", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("Error during sign up:", error);
      return false;
    }
  };

  const addJob = async (newJob) => {
    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
  };

  const deleteJob = async (id) => {
    await fetch(`/api/jobs/${id}`, { method: "DELETE" });
  };

  const updateJob = async (job) => {
    await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
  };



  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <HomePage /> },  // ✅ HomePage loads by default
        { path: "/jobs", element: <JobsPage /> },
        { path: "/add-job", element: <AddJobPage addJobSubmit={addJob} />  },
        { path: "/edit-job/:id", element: <EditJobPage/> },
        <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob} />} />,
        <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} />,
        { path: "/jobs/:id", element: <JobPage /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <SignUpPage /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      {!loading && <RouterProvider router={router} />}

    </>
  );
};

export default App;
