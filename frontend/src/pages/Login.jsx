import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/user/userContext";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import videoContext from "../context/videos/videosContext";

import { toast } from "react-toastify";
import link from "../ServerLink";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(UserContext);
  const { getUserInfo } = context;

  const { getVideos } = useContext(videoContext);
  const cookies = new Cookies();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${link}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const msg = await response.json();

      if (response.ok) {
        const { authtoken, message } = msg;

        const decodedToken = jwtDecode(authtoken);
        cookies.set("authtoken", authtoken, {
          expires: new Date(decodedToken.exp * 1000),
        });
        getUserInfo();
        getVideos();
        navigate("/");
        toast(message);
      } else {
        toast(msg.message);
      }
    } catch (error) {
      toast(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg mt-32">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-500 hover:underline hover:text-blue-700"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
