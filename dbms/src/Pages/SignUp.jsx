import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/editor");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <form onSubmit={handleSignUp} className="w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-4">Get Started Now</h1>

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

        <label className="block mb-1 font-medium text-sm">Password</label>
        <input
          type="password"
          placeholder="********"
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

       

        <button className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800">
          Signup
        </button>

        <p className="text-center text-sm mt-6">
          Have an account? <Link to="/" className="text-blue-600 hover:underline">Sign In</Link>
        </p>
      </form>
    </div>
  );
}
