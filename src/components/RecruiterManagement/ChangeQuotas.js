import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendOtp, verifyOtpAndChangeQuota } from '../../services/api'; 
// Assuming these API functions exist

const ChangeQuotas = () => {
  const { id } = useParams(); // Account ID
  const [quota, setQuota] = useState(0);
  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false); // State for OTP modal
  const [error, setError] = useState(null);

  // Function to handle quota change initiation (send OTP)
  const handleSendOtp = async () => {
    try {
      await sendOtp(id); // Send OTP to admin via API
      setShowOtpModal(true); // Open the OTP modal
    } catch (err) {
      setError('Error sending OTP. Please try again.');
    }
  };

  // Function to handle quota change after OTP verification
  const handleVerifyOtpAndChangeQuota = async () => {
    try {
      const response = await verifyOtpAndChangeQuota(id, otp, quota); // Verify OTP and change quota
      alert(response.message); // Show success message
      setShowOtpModal(false); // Close modal on success
    } catch (err) {
      setError('Invalid OTP. Please try again.'); // Show error if OTP is incorrect
    }
  };

  return (
    <div>
      <h2 className="text-xl">Change Quota</h2>
      <input
        type="number"
        value={quota}
        onChange={(e) => setQuota(e.target.value)}
        placeholder="Enter new quota"
        className="border border-gray-300 p-2"
      />
      <button onClick={handleSendOtp} className="mt-2 bg-green-500 text-white px-4 py-2">
        Change Quota
      </button>

      {error && <p className="text-red-500">{error}</p>}

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
              onClick={handleVerifyOtpAndChangeQuota}
              className="bg-green-500 text-white px-4 py-2 mr-2"
            >
              Verify OTP
            </button>
            <button
              onClick={() => setShowOtpModal(false)}
              className="bg-gray-500 text-white px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeQuotas;
