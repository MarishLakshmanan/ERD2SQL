import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    const token = data.token;
    localStorage.setItem("jwt", token);
    localStorage.setItem("uid", email);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded">
        <h2 className="text-2xl font-bold text-center text-gray-900">Welcome back !</h2>
        <h2 className="text-x  text-center text-gray-900">Enter your credentials to access your account .</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
              id="remember"
            /> */}
            {/* <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
              I agree to the <a href="#" className="font-medium text-green-700 underline">terms & policy</a>
            </label> */}
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition-colors"
          >
            Login
          </button>
        </form>
      
        <p className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link to="/register" className="font-medium text-blue-600 hover:underline">
            Sign up
        </Link>
        </p>


      </div>
    </div>
  );
};

export default Login;
