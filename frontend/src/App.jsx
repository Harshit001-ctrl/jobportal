import { useState, useEffect, Suspense, lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const JobsPage = lazy(() => import("./pages/JobsPage"));
const JobPage = lazy(() => import("./pages/JobPage"));
const Login = lazy(() => import("./components/auth/Login"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const EditJobPage = lazy(() => import("./pages/EditJobPage"));
const AdminDashboard = lazy(() => import("./Dashboard/AdminDashboard"));
const NotFoundPage=lazy(()=>import("./pages/NotFoundPage"))
import AdminRoute from "./components/AdminRoute";
import Spinner, { jobLoader } from "./components/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddJobForm = lazy(() => import("./AdminDashboard comp/AddJobForm"));

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user"); 

        if (!token || !storedUser) {
          setLoading(false);
          return;
        }

        const user = JSON.parse(storedUser);
        setUser(user); 
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
      <Route
        path="/"
        element={
          <Suspense fallback={<Spinner />}>
            <MainLayout />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Spinner />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="jobs"
          element={
            <Suspense fallback={<Spinner />}>
              <JobsPage />
            </Suspense>
          }
        />
        <Route
          path="jobs/:id"
          element={
            <Suspense fallback={<Spinner />}>
              <JobPage />
            </Suspense>
          }
          loader={jobLoader}
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<Spinner />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="signup"
          element={
            <Suspense fallback={<Spinner />}>
              <SignUpPage />
            </Suspense>
          }
        />
        {/* Admin Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <Suspense fallback={<Spinner />}>
                <AdminDashboard />
              </Suspense>
            </AdminRoute>
          }
        />

        <Route
          path="add-job"
          element={
            <AdminRoute>
              <Suspense fallback={<Spinner />}>
                <AddJobForm />
              </Suspense>
            </AdminRoute>
          }
        />
        <Route
          path="edit-job/:id"
          element={
            <AdminRoute>
              <Suspense fallback={<Spinner />}>
                <EditJobPage />
              </Suspense>
            </AdminRoute>
          }
        />

        <Route path="*" element={
          <Suspense fallback={<Spinner />}>

            <NotFoundPage />
          </Suspense>
          } />
      </Route>
    )
  );

  if (loading) {
    return <Spinner />;
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
