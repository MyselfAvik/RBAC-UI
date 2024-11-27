import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ email, setEmail }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    navigate("/dashboard");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="text-red-600 text-sm text-center mb-4">{error}</div>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4 float-right">
          <a className="underline" href="">
            forgot password
          </a>
        </div>

        <button
          type="submit"
          className="w-full h-12 mb-4 bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition duration-200"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
