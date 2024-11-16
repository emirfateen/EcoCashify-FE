import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import axios from "axios";

const ClaimPage = () => {
  const [startScan, setStartScan] = useState(false);
  const [data, setData] = useState("");

  const sendDataToBackend = async (scannedData) => {
    try {
      const response = await axios.post("", {
        qrData: scannedData,
      });

      console.log("Backend Response:", response.data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  useEffect(() => {
    if (startScan) {
      const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
      scanner.render(
        (decodedText) => {
          console.log("Scanned Result:", decodedText); // Debugging
          setData(decodedText);
          setStartScan(false);
          scanner.clear();

          // Send scanned data to backend
          sendDataToBackend(decodedText);
        },
        (error) => console.error("Error scanning QR Code:", error) // Debugging
      );
    }
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
