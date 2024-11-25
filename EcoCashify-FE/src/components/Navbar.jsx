import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 w-full items-center flex justify-between flex-wrap p-3 bg-[#63AB57] rounded-b-2xl z-50">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => {
                        setIsOpen(false);
                        navigate("/home");
                    }}
                >
                    {/* Logo with Circular Background */}
                    <div className="bg-white rounded-full p-2 shadow-lg flex items-center justify-center">
                        <img
                            src={logo}
                            alt="EcoCashify Logo"
                            className="h-10 w-10"
                        />
                    </div>
                </div>
            </div>

            <div className="block lg:hidden">
                <button
                    className="flex items-center px-3 py-2 text-gray-200 border-gray-400 hover:border-gray bg-[#63AB57]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="fill-current h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isOpen ? (
                            <path
                                fillRule="evenodd"
                                d="M10 9.293L6.146 5.44a1 1 0 00-1.414 1.414L8.586 10l-3.854 3.854a1 1 0 101.414 1.414L10 11.414l3.854 3.854a1 1 0 001.414-1.414L11.414 10l3.854-3.854a1 1 0 00-1.414-1.414L10 8.586z"
                                clipRule="evenodd"
                            />
                        ) : (
                            <path
                                fillRule="evenodd"
                                d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 6h14a1 1 0 010 2H3a1 1 0 010-2zm0 6h14a1 1 0 010 2H3a1 1 0 010-2z"
                                clipRule="evenodd"
                            />
                        )}
                    </svg>
                </button>
            </div>

            <div
                className={`w-full lg:flex lg:items-center lg:w-auto lg:transition-none transition-all duration-300 ease-in-out transform ${
                    isOpen
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0 lg:opacity-100 lg:max-h-full"
                }`}
            >
                <ul className="text-sm lg:flex-grow">
                    <li
                        className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4 cursor-pointer"
                        onClick={() => {
                            setIsOpen(false);
                            navigate("/home");
                        }}
                    >
                        Home
                    </li>
                    <li
                        className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4 cursor-pointer"
                        onClick={() => {
                            setIsOpen(false);
                            navigate("/claim-trash");
                        }}
                    >
                        Claim Trash
                    </li>
                </ul>
                {user ? (
                    <li
                        className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4 cursor-pointer"
                        onClick={() => navigate("/profile")}
                    >
                        Profile
                    </li>
                ) : (
                    <button
                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:text-white-500 hover:bg-[#7e2d24] mt-4 lg:mt-0"
                        onClick={() => navigate("/auth/sign-in")}
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
