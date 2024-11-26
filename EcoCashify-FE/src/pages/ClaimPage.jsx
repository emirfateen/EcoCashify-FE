import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";
import apiClient from "../utils/axios";

const ClaimPage = () => {
  const [startScan, setStartScan] = useState(false);
  const [data, setData] = useState("");

  const sendDataToBackend = async (scannedData) => {
    try {
      const response = await apiClient.post("/trash/claim", { trash_id: scannedData });
      console.log("Backend Response:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data.data.trash));
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  useEffect(() => {
    let scannerInstance = null;

    if (startScan) {
      // Destroy any existing scanner before creating a new one
      const startCameraScan = async () => {
        try {
          // Use Html5Qrcode directly for more control
          scannerInstance = new Html5Qrcode("reader");
          await scannerInstance.start(
            { facingMode: "environment" }, // Camera mode
            {
              fps: 10,
              qrbox: 250,
            },
            (decodedText) => {
              console.log("Scanned Result:", decodedText);
              setData(decodedText);

              // Stop the scanner after a successful scan
              scannerInstance.stop().then(() => {
                scannerInstance.clear();
                setStartScan(false);
              });

              // Send the scanned data to the backend
              sendDataToBackend(decodedText);
            },
            (error) => console.error("Scanning Error:", error)
          );
        } catch (error) {
          console.error("Error initializing camera:", error);
        }
      };

      startCameraScan();
    }

    // Cleanup function to ensure proper resource cleanup
    return () => {
      if (scannerInstance) {
        scannerInstance.stop().then(() => scannerInstance.clear());
      }
    };
  }, [startScan]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold mb-4">QR Code Scanner</h1>

      <button
        onClick={() => setStartScan(!startScan)}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {startScan ? "Stop Scan" : "Start Scan"}
      </button>

      {startScan && <div id="reader" className="w-72 h-72"></div>}

      {data && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Scanned Data: {data}</p>
        </div>
      )}
    </div>
  );
};

export default ClaimPage;