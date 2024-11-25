import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import googleIcon from "../assets/google.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import personIllustration from "../assets/person.png";
import apiClient from "../utils/axios";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }
        apiClient.post("/user/register", { email, password })
          .then((response) => {
            console.log("response all", response);
            if (response.data.success) {
              setUser(response.data.data);
              navigate("/home");
            } 
          })
          .catch((error) => {
            setError(error.response.data.message || "Failed to sign in. Please check your credentials and try again.");
          });
      };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
            <div className="w-full max-w-md space-y-8 pt-16">
                {/* Title Section */}
                <div className="text-center space-y-2 mt-8">
                    <h2 className="text-4xl font-bold text-gray-800">Sign Up</h2>
                    <p className="text-gray-500 text-sm">
                        Start earning money by recycling your waste. Create an account and make the planet greener with every trade.
                    </p>
                </div>
                
                {/* Sign In and Sign Up Toggle */}
                <div className="flex justify-center space-x-8 text-lg mt-6">
                    <button
                        onClick={() => navigate("/auth/sign-in")}
                        className="text-gray-400 font-semibold"
                    >
                        Sign In
                    </button>
                    <button className="text-[#63AB57] font-semibold border-b-2 border-[#63AB57]">
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
                        <img src={emailIcon} alt="Email Icon" className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#63AB57] pl-12 pr-12 text-sm"
                        />
                        <img src={passwordIcon} alt="Password Icon" className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                        <div
                            onClick={togglePasswordVisibility}
                            className="absolute right-4 top-3 cursor-pointer text-gray-400"
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#63AB57] pl-12 pr-12 text-sm"
                        />
                        <img src={passwordIcon} alt="Password Icon" className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                        <div
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute right-4 top-3 cursor-pointer text-gray-400"
                        >
                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        onClick={handleSignUp}
                        className="w-full bg-[#63AB57] text-white py-3 rounded-full font-semibold text-sm hover:bg-[#52984A] transition duration-300"
                    >
                        Sign Up
                    </button>
                    <p className="text-red-500 text-sm text-center">{error}</p> 

                    {/* Or Separator */}
                    <div className="flex items-center justify-center space-x-2 mt-4 text-gray-400 text-sm">
                        <span className="block w-16 h-px bg-gray-200"></span>
                        <span>Or</span>
                        <span className="block w-16 h-px bg-gray-200"></span>
                    </div>

                    {/* Google Sign Up Button */}
                    <button className="w-full border border-gray-300 flex items-center justify-center py-3 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition duration-300 text-sm">
                        <img src={googleIcon} alt="Google Icon" className="w-5 h-5 mr-2" />
                        Sign up with Google
                    </button>
                </div>

                {/* Illustration */}
                <div className="mt-10 flex justify-center">
                    <img src={personIllustration} alt="Person Recycling Illustration" className="w-2/3" />
                </div>
            </div>
        </div>
    );
}

export default SignUp;