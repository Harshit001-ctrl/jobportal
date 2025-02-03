import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // try {
    //   const success = await handleLogin(email, password); // Await the function

    //   if (success) {
    //     toast.success("Login successful!", {
    //       position: toast.POSITION.TOP_CENTER,
    //     });
    //     setEmail(""); // Clear inputs only if login is successful
    //     setPassword("");
    //   } else {
    //     toast.error("Login failed! Please check your credentials and try again.", {
    //       position: toast.POSITION.TOP_CENTER,
    //     });
    //   }
    // } catch (error) {
    //   toast.error("Login failed! Something went wrong.", {
    //     position: toast.POSITION.TOP_CENTER,
    //   });
    //   console.error("Login error:", error);
    // } finally {
    //   setLoading(false); // Stop loading
    // }
  };

  return (
    <div
      className="flex fixed h-screen w-screen justify-center items-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1536431311719-398b6704d4cc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100vh",  // Ensure no scrolling effect
        width: "100vw",
      }}
    >
      <div className="relative z-10 w-full max-w-lg p-4">
        <div className="max-w-sm w-full bg-white bg-opacity-80 rounded-2xl shadow-2xl p-8 transform transition duration-500 hover:scale-105">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">Login</h2>
          </div>
          <form onSubmit={SubmitHandler} className="flex flex-col items-center space-y-8">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-4 text-lg rounded-lg border-2 border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out duration-300 shadow-lg"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-4 text-lg rounded-lg border-2 border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out duration-300 shadow-lg"
            />
            <button
              type="submit"
              disabled={loading} // Disable button during login
              className={`w-full bg-indigo-600 text-white font-bold py-3 rounded-full transform transition duration-300 hover:scale-105 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"}`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="text-center mt-4">
            <span className="text-gray-500 text-sm">Don't have an account?</span>
            <Link to="/signup" className="text-indigo-600 text-sm font-semibold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
