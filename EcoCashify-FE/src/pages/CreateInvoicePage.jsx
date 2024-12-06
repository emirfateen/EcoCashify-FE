import React, { useState } from "react";
import apiClient from "../utils/axios";
import QrCode from "react-qr-code";
import { useUser } from "../context/UserContext";

const CreateInvoicePage = () => {
  const [amountBilled, setAmountBilled] = useState(0);
  const [qrValue, setQrValue] = useState();
  const { setUser } = useUser();  

  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient.post("/invoice/create", { amount: amountBilled }).then((response) => {
      setQrValue(response.data.data);
    });
  };

  React.useEffect(() => {
    if (qrValue) {
      const interval = setInterval(() => {
        apiClient.get(`/invoice/status?invoice_id=${qrValue._id}`).then((response) => {
          if (response.data.data.invoice.status === "paid") {
            clearInterval(interval);
            setUser(response.data.data.user);
            window.location.href = "/success/Payment";
          }
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [qrValue]);

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      {qrValue ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-40">
          <div className="bg-white p-8 shadow-md w-full max-w-md rounded-xl">
            <h1 className="text-2xl font-bold mb-6">Pay amount: {formatRupiah(qrValue.amount)}</h1>
            <QrCode value={qrValue._id} className="mx-auto"/>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-40">
          <div className="bg-white p-8 shadow-md w-full max-w-md rounded-xl">
            <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Amount Billed:</label>
                <input
                  type="number"
                  name="amountBilled"
                  value={amountBilled}
                  onChange={(e) => setAmountBilled(e.target.value)}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-main-green text-white p-2 rounded hover:bg-green-700"
              >
                Create Invoice
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateInvoicePage;
