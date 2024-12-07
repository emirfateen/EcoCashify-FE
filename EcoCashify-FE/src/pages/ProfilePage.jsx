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
                  console.log("User cookie found:", tempuser);
                } else {
                  console.error("User cookie not found.");
                }
              } catch (error) {
                console.error("Error fetching user:", error);
              }
        };
        fetchUserData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold" >Profile Page</h1>
            {user && (
                <div>
                    <h2 className="text-xl" >Your QR Code</h2>
                    <QRCode className= "w-32 h-32" value={user._id} />
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
