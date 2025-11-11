import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
// import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData.email, formData.password, formData.name, formData.photo);
      toast.success("Account created successfully 🎉");
      navigate("/my-connections");
    } catch (err) {
      toast.error("Signup failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Google signup successful");
      navigate("/my-connections");
    } catch {
      toast.error("Google signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#050814]">
      <div className="bg-[#101426] text-white w-96 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 rounded bg-[#1A1E33] border border-gray-700 focus:outline-none"
            onChange={handleChange}
          />

          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            className="w-full p-3 rounded bg-[#1A1E33] border border-gray-700 focus:outline-none"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-[#1A1E33] border border-gray-700 focus:outline-none"
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-[#1A1E33] border border-gray-700 focus:outline-none"
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 cursor-pointer text-gray-400"
            >
              {/* {showPass ? <EyeOff size={20} /> : <Eye size={20} />} */}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
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
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
