import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Account created. You can now sign in.");
      navigate("/");
    } else {
      const err = await res.json();
      alert(err.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded">
        <h2 className="text-2xl font-bold text-center text-gray-900">Get Started Now</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div className="flex items-center">
            {/* <input
              type="checkbox"
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
              required
            />
            <label className="ml-2 block text-sm text-gray-600">
              I agree to the <a href="#" className="font-medium text-green-700 underline">terms & policy</a>
            </label> */}
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition-colors"
          >
            Signup
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Have an account?{" "}
          <a href="/" className="font-medium text-blue-600 hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

