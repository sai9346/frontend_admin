import React, { useState, useEffect } from 'react';
import { deactivateAccount, fetchUsers, generateOTP, validateOTP } from '../../services/api'; 
import Swal from 'sweetalert2'; 

const DeactivateAccount = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); 
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRecruiters = async () => {
      try {
        const result = await fetchUsers();
        setRecruiters(result);
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch recruiters', 'error');
      }
    };
    loadRecruiters();
  }, []);

  const handleOpenConfirmModal = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setShowConfirmModal(true); 
  };

  const handleConfirmDeactivate = async () => {
    if (!selectedRecruiter) return; // Ensure there's a selected recruiter

    setShowConfirmModal(false); 
    try {
      const response = await generateOTP(selectedRecruiter.id, selectedRecruiter.email);
      
      if (response.success) {
        Swal.fire('Info', 'OTP has been sent to the admin. Please check your email.', 'info');
        setShowOtpModal(true); // Show OTP modal
        setOtp(''); // Clear OTP input when opening modal
      } else {
        throw new Error(response.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      Swal.fire('Error', error.message || 'Failed to send OTP', 'error');
    }
  };

  const handleCloseOtpModal = () => {
    setShowOtpModal(false);
    setOtp('');
    setSelectedRecruiter(null);
  };

  const handleDeactivate = async () => {
    if (!selectedRecruiter || !otp) return;

    setLoading(true);
    try {
      const isOtpValid = await validateOTP(selectedRecruiter.id, otp, selectedRecruiter.email);
      if (isOtpValid) {
        const response = await deactivateAccount(selectedRecruiter.id, otp);
        Swal.fire('Success', response.message, 'success');
        setRecruiters(recruiters.filter((rec) => rec.id !== selectedRecruiter.id));
        handleCloseOtpModal();
      } else {
        Swal.fire('Error', 'Invalid OTP, please try again.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.message || 'Error deactivating account.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl">Deactivate Recruiter Accounts</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Plan</th>
            <th className="py-2">Email</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recruiters.map((recruiter, index) => (
            <tr key={`${recruiter.id}-${index}`} className="border-b">
              <td className="py-2">{recruiter.name}</td>
              <td className="py-2">{recruiter.plan}</td>
              <td className="py-2">{recruiter.email}</td>
              <td className="py-2">
                <button
                  onClick={() => handleOpenConfirmModal(recruiter)}
                  className="bg-red-500 text-white px-4 py-2"
                >
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg mb-4">Are you sure you want to deactivate {selectedRecruiter?.name}?</h3>
            <button onClick={handleConfirmDeactivate} className="bg-red-500 text-white px-4 py-2 mr-2">
              Yes
            </button>
            <button onClick={() => setShowConfirmModal(false)} className="bg-gray-500 text-white px-4 py-2">
              No
            </button>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg mb-4">Enter OTP for {selectedRecruiter?.name}</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border p-2 mb-2 w-full"
            />
            <button 
              onClick={handleDeactivate} 
              className="bg-red-500 text-white px-4 py-2 mr-2"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button onClick={handleCloseOtpModal} className="bg-gray-500 text-white px-4 py-2">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeactivateAccount;
