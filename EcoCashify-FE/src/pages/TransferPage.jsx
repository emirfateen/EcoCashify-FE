import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useUser } from "../context/UserContext";
import apiClient from "../utils/axios";

const TransferPage = () => {
    const [data, setData] = useState("");
    const [startScan, setStartScan] = useState(false);
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState(0);
    const [method, setMethod] = useState("");
    const { setUser } = useUser();

    const sendDataToBackend = async (scannedData) => {
        try {
            const response = await apiClient.post("/user/transfer", {
                recipient_id: method === "scan" ? scannedData : null,
                email: method === "email" ? email : null,
                amount: amount,
            });
            console.log("Backend Response:", response.data);
            localStorage.setItem("user", JSON.stringify(response.data.data.user));
            if (response.data.success) {
                setUser(response.data.data.sender);
                window.location.href = "/success/Transfer";
            }
        } catch (error) {
            console.error("Error sending data to backend:", error);
        }
    };

    const handleScan = (result) => {
        console.log("Scanning Result:", result);
        if (result[0].rawValue) {
            setData(result[0].rawValue);

            // Stop scanning once we have a result
            setStartScan(false);

            // Send the scanned data to the backend
            sendDataToBackend(result[0].rawValue);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (method === "scan") {
            setStartScan(true);
        } else if (method === "email") {
            sendDataToBackend(email);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="w-[75%] max-w-96">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Amount
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Transfer Method
                    </label>
                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select Method</option>
                        <option value="scan">Scan QR Code</option>
                        <option value="email">Enter Email</option>
                    </select>
                </div>
                {method === "email" && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Recipient Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                )}
                <button
                    type="submit"
                    className="bg-main-green hover:bg-green-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Confirm
                </button>
            </form>

            {startScan && (
                <div className="w-[75%] max-w-96 mt-4">
                    <Scanner
                        onScan={(result) => handleScan(result)}
                        allowMultiple={false}
                    />
                </div>
            )}

            {data && (
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin fill-main-green"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
        </div>
    );
};

export default TransferPage;