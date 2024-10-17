// BillingHistory.js
import React, { useEffect, useState } from 'react';
import { fetchBillingHistory } from '../../services/api'; // Adjust the path based on your file structure

const BillingHistory = () => {
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBillingHistory = async () => {
      try {
        const response = await fetchBillingHistory(); // Use your API function
        setBillingHistory(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBillingHistory();
  }, []);

  const downloadCSV = () => {
    const csvData = [
      ['Invoice Number', 'Amount', 'Renewal Date', 'User Email'], // Updated header for clarity
      ...billingHistory.map(item => [
        item.invoiceNumber, 
        `$${item.amount}`, 
        new Date(item.renewalDate).toLocaleDateString(), 
        item.user.email // Added user email to the CSV
      ]), 
    ];
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'billing_history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p>Loading billing history...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Billing History</h2>
      <button 
        onClick={downloadCSV} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Download CSV
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Invoice Number</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Renewal Date</th>
            <th className="py-2 px-4 border-b">User Email</th>
          </tr>
        </thead>
        <tbody>
          {billingHistory.map(item => (
            <tr key={item._id}> {/* Use item._id as the key */}
              <td className="py-2 px-4 border-b">{item.invoiceNumber}</td>
              <td className="py-2 px-4 border-b">${item.amount}</td>
              <td className="py-2 px-4 border-b">{new Date(item.renewalDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{item.user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingHistory;




