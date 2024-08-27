import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import link from "../ServerLink";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${link}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const msg = await response.json();

      if (response.ok) {
        toast(msg.message);
        navigate("/login"); // Redirect to login page after successful signup
      } else {
        toast(msg.message);
      }
    } catch (error) {
      toast("Something went wrong",error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg mt-20">
      <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded hover:bg-green-700 transition duration-200"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
