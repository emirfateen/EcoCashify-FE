import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userCookie = localStorage.getItem("user");

        if (userCookie) {
          const tempuser = await JSON.parse(userCookie);
          setUser(tempuser);
        } else {
          console.error("User cookie not found.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUserData();
  }, []);

  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setBalance(user.balance);
      setRole(user.role);
    }
  }, [user]);

  const handleUpdate = () => {
    const updatedUser = { ...user, email, balance, role };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 mt-28">
      <h1 className="text-3xl font-bold mb-6">Profile Page</h1>
      {user && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Balance:</strong> {user.balance}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Role:</strong> {user.role}
          </p>
          <QRCode className="w-full max-w-xs mx-auto" value={user._id} />
        </div>
      )}
      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Update Information</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <button
          onClick={handleUpdate}
          className="bg-main-green text-white p-2 w-full rounded hover:bg-green-950 transition-all"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
