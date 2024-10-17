import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { reactivateAccount } from '../../services/api'; // Import from api.js

const ReactivateAccount = () => {
  const { id } = useParams(); // Account ID
  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false); // Modal state

  // Function to open the OTP modal
  const handleOpenOtpModal = () => {
    setShowOtpModal(true);
  };

  // Function to close the OTP modal
  const handleCloseOtpModal = () => {
    setShowOtpModal(false);
  };

  // Function to handle reactivation
  const handleReactivate = async () => {
    try {
      const response = await reactivateAccount(id, otp); // Verify OTP and reactivate
      alert(response.message); // Display success message
      handleCloseOtpModal(); // Close the modal
    } catch (error) {
      alert(error.message || 'Error reactivating account.'); // Display error message
    }
  };

  return (
    <div>
      <h2 className="text-xl">Reactivate Account</h2>
      <button onClick={handleOpenOtpModal} className="mt-2 bg-green-500 text-white px-4 py-2">
        Reactivate Account
      </button>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg mb-4">Enter OTP</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border p-2 mb-2 w-full"
            />
            <button
              onClick={handleReactivate}
              className="bg-green-500 text-white px-4 py-2 mr-2"
            >
              Verify OTP
            </button>
            <button
              onClick={handleCloseOtpModal}
              className="bg-red-500 text-white px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactivateAccount;
