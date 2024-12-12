import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import googleIcon from "../assets/google.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import personIllustration from "../assets/person.png";
import apiClient from "../utils/axios";

function SignIn() {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    apiClient
      .post("/user/login", { email, password })
      .then((response) => {
        setLoading(false);
        console.log("response all", response);
        if (response.data.success) {
          localStorage.setItem("token", response.data.data.token);
          setUser(response.data.data);
          navigate("/home");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(
          error.response.data.message ||
            "Failed to sign in. Please check your credentials and try again."
        );
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="w-full max-w-md space-y-8 pt-16">
        {/* Title Section */}
        <div className="text-center space-y-2 mt-8">
          <h2 className="text-4xl font-bold text-gray-800">Sign In</h2>
          <p className="text-gray-500 text-sm">
            Turn your recyclables into rewards. Sign in to access your account
            and start making an impact today.
          </p>
        </div>

        {/* Sign In and Sign Up Toggle */}
        <div className="flex justify-center space-x-8 text-lg mt-6">
          <button className="text-[#63AB57] font-semibold border-b-2 border-[#63AB57]">
            Sign In
          </button>
          <button
            className="text-gray-400 font-semibold"
            onClick={() => navigate("/auth/sign-up")}
          >
            Sign Up
          </button>
        </div>

        {/* Form Section */}
        <div className="space-y-6 mt-8">
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#63AB57] pl-12 text-sm"
            />
            <img
              src={emailIcon}
              alt="Email Icon"
              className="absolute left-4 top-3 w-5 h-5 text-gray-400"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#63AB57] pl-12 pr-12 text-sm"
            />
            <img
              src={passwordIcon}
              alt="Password Icon"
              className="absolute left-4 top-3 w-5 h-5 text-gray-400"
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-3 cursor-pointer text-gray-400"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a href="#" className="text-[#63AB57] hover:underline text-sm">
              Forgot password?
            </a>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 border-t-[#63AB57] animate-spin"></div>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="w-full bg-[#63AB57] text-white py-3 rounded-full font-semibold text-sm hover:bg-[#52984A] transition duration-300"
            >
              Sign In
            </button>
          )}

          <p className="text-red-500 text-sm text-center">{error}</p>

          {/* Or Separator */}
          <div className="flex items-center justify-center space-x-2 mt-4 text-gray-400 text-sm">
            <span className="block w-16 h-px bg-gray-200"></span>
            <span>Or</span>
            <span className="block w-16 h-px bg-gray-200"></span>
          </div>
        </div>

        {/* Illustration */}
        <div className="mt-10 flex justify-center">
          <img
            src={personIllustration}
            alt="Person Recycling Illustration"
            className="w-2/3"
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
