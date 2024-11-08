import React, { useState } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://localhost:5000"
    : "http://localhost:5000";

const ClaimPage = () => {
  const [scanResult, setScanResult] = useState();

  const webcamError = (error) => {
    if (error) {
      console.log(error);
    }
  };

  const webcamScan = (result) => {
    if (result) {
      setScanResult(result);
      axios.post(`${BASE_URL}`, { qrData: result })
        .then(response => {
          console.log('Data sent successfully:', response.data);
        })
        .catch(error => {
          console.error('Error sending data to the backend:', error);
        });
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h3 className="text-center text-2xl font-semibold mb-4">Scan QR Code</h3>
      <div className="flex justify-center">
        <QrReader
          delay={300}
          onError={webcamError}
          onScan={webcamScan}
          className="w-full max-w-md"
          legacyMode={false}
          facingMode={"environment"}
        />
      </div>
      <div className="mt-4 text-center">
        <h6 className="text-lg">Scan Result: {scanResult ? scanResult : "No result yet"}</h6>
      </div>
    </div>
  );
};

export default ClaimPage;
