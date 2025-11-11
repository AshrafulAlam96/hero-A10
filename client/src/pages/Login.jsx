import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
// import { Eye, EyeOff, Mail } from "lucide-react";

const Login = () => {
  const { login, googleLogin, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast.success("Login successful 🎉");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Invalid credentials. Try again.");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch {
      toast.error("Google login failed");
    }
  };

  const handleReset = async () => {
    if (!formData.email) return toast.error("Enter your email first!");
    await resetPassword(formData.email);
    toast.success("Password reset email sent!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#050814]">
      <div className="bg-[#101426] text-white w-96 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#1A1E33] border border-gray-700 focus:outline-none"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#1A1E33] border border-gray-700 focus:outline-none"
              required
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 cursor-pointer text-gray-400"
            >
              {/* {showPass ? <EyeOff size={20} /> : <Eye size={20} />} */}
            </span>
          </div>

          <p
            className="text-sm text-blue-400 cursor-pointer hover:underline text-right"
            onClick={handleReset}
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            className="w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center gap-2 my-4">
          <hr className="flex-grow border-gray-700" />
          <span className="text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        <button
          onClick={handleGoogle}
          className="w-full border border-gray-600 py-2 rounded-lg hover:bg-[#1A1E33] transition"
        >
          <span className="flex items-center justify-center gap-2">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </span>
        </button>

        <p className="text-center text-sm mt-4 text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
