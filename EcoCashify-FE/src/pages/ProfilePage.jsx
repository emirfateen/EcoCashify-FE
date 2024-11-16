import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
    const [user, setUser] = useState({
        fullName: "",
        username: "",
        email: "",
        phoneNumber: "",
        country: "",
        gender: "",
        address: "",
    });
    const [originalUser, setOriginalUser] = useState(null); // Store original data for comparison

    useEffect(() => {
        // Fetch user data when the component loads
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/profile", {
                    withCredentials: true, // To include cookies for authentication
                });
                setUser(response.data);
                setOriginalUser(response.data); // Save the original data for comparison
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const hasChanges = () => {
        // Check if there are changes between user and originalUser
        return JSON.stringify(user) !== JSON.stringify(originalUser);
    };

    const handleSave = async () => {
        if (!hasChanges()) {
            alert("No changes to save.");
            return;
        }

        try {
            await axios.put("http://localhost:5000/profile", user, {
                withCredentials: true,
            });
            alert("Profile updated successfully");
            setOriginalUser(user); // Update originalUser to reflect saved changes
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={user.fullName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={user.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={!hasChanges()}
                    className={`mt-6 w-full px-4 py-2 rounded text-white font-semibold ${hasChanges()
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-300 cursor-not-allowed"
                        }`}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
