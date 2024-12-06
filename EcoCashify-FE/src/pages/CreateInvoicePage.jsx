import React, { useState } from "react";

const CreateInvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState({
    customerName: "",
    invoiceDate: "",
    amountBilled: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(invoiceData);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-40">
        <div className="bg-white p-8 shadow-md w-full max-w-md rounded-xl">
          <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4"></div>
            <div className="mb-4">
              <label className="block text-gray-700">Amount Billed:</label>
              <input
                type="number"
                name="amountBilled"
                value={invoiceData.amountBilled}
                onChange={handleInputChange}
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
    </>
  );
};

export default CreateInvoicePage;
