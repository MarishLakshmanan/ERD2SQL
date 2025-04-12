// src/pages/SignIn.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/editor");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-1">Welcome back!</h1>
        <p className="mb-6 text-sm text-gray-600">Enter your credentials to access your account</p>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <label className="block mb-1 font-medium text-sm">Email address</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        
        <input
          type="password"
          placeholder="********"
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center mb-4 text-sm">
          <input type="checkbox" id="remember" className="mr-2" />
          <label htmlFor="remember">Remember for 30 days</label>
        </div>

        <button className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800">
          Login
        </button>

        <p className="text-center text-sm mt-6">
          Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
