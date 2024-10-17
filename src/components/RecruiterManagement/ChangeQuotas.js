import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ChangeQuotas = () => {
  const { id } = useParams(); // eslint-disable-line no-unused-vars
  const [quota, setQuota] = useState(0);
  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpError, setOtpError] = useState(null);

  const correctOtp = '1234'; // Demo OTP for validation

  const handleChangeQuota = () => {
    setShowOtpModal(true); // Open the OTP modal when quota change is clicked
  };

  const handleOtpSubmit = () => {
    if (otp === correctOtp) {
      alert(`Quota updated to: ${quota}`);
      setShowOtpModal(false); // Close modal on success
      setOtpError(null); // Clear any error
    } else {
      setOtpError('Incorrect OTP. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setShowOtpModal(false);
    setOtpError(null);
  };

  return (
    <div>
      <h2 className="text-xl">Change Quota</h2>
      <input
        type="number"
        value={quota}
        onChange={(e) => setQuota(Number(e.target.value))} // Ensure input value is a number
        placeholder="Enter new quota"
        className="border border-gray-300 p-2"
      />
      <button onClick={handleChangeQuota} className="mt-2 bg-green-500 text-white px-4 py-2">
        Change Quota
      </button>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold">Enter OTP</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border border-gray-300 p-2 mt-2"
            />
            {otpError && <p className="text-red-500 mt-2">{otpError}</p>}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleOtpSubmit}
                className="bg-green-500 text-white px-4 py-2 mr-2"
              >
                Verify OTP
              </button>
              <button onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeQuotas;
