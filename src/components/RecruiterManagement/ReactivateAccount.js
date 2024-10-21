import React, { useState, useEffect } from 'react';
import { deactivateAccount, reactivateAccount, fetchUsers, generateOTP, validateOTP } from '../../services/api'; 
import Swal from 'sweetalert2';

const ManageRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [actionType, setActionType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecruiters = async () => {
      setLoading(true);
      try {
        const result = await fetchUsers();
        setRecruiters(result);
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch recruiters', 'error');
      } finally {
        setLoading(false);
      }
    };
    loadRecruiters();
  }, []);

  const handleOpenOtpModal = async (recruiter, action) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to ${action === 'deactivate' ? 'deactivate' : 'reactivate'} this account.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed!'
    });

    if (confirmation.isConfirmed) {
      setSelectedRecruiter(recruiter);
      setActionType(action);
      try {
        await generateOTP(recruiter.id, recruiter.email);
        Swal.fire('Info', 'OTP has been sent to the admin. Please check your email.', 'info');
        setShowOtpModal(true);
      } catch (error) {
        Swal.fire('Error', error.message || 'Failed to send OTP', 'error');
      }
    }
  };

  const handleCloseOtpModal = () => {
    setShowOtpModal(false);
    setOtp('');
    setSelectedRecruiter(null);
    setActionType('');
  };

  const handleAction = async () => {
    if (!selectedRecruiter || !otp) return;

    try {
      const isOtpValid = await validateOTP(selectedRecruiter.id, otp, selectedRecruiter.email);
      if (isOtpValid) {
        if (actionType === 'deactivate') {
          const response = await deactivateAccount(selectedRecruiter.id, otp);
          Swal.fire('Success', response.message, 'success');
          setRecruiters(recruiters.filter((rec) => rec.id !== selectedRecruiter.id));
        } else if (actionType === 'reactivate') {
          const response = await reactivateAccount(selectedRecruiter.id, otp);
          Swal.fire('Success', response.message, 'success');
          // Optionally refetch the recruiters list or update state accordingly.
          // Load the recruiters again after reactivation
          const updatedRecruiters = await fetchUsers();
          setRecruiters(updatedRecruiters);
        }
        handleCloseOtpModal();
      } else {
        Swal.fire('Error', 'Invalid OTP, please try again.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.message || 'Error processing the request.', 'error');
    }
  };

  return (
    <div>
      <h2 className="text-xl">Manage Recruiter Accounts</h2>
      {loading ? (
        <p>Loading recruiters...</p>
      ) : (
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
                <td className="py-2 flex space-x-2">
                  <button
                    onClick={() => handleOpenOtpModal(recruiter, 'deactivate')}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition ease-in-out duration-200"
                  >
                    Deactivate
                  </button>
                  <button
                    onClick={() => handleOpenOtpModal(recruiter, 'reactivate')}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ease-in-out duration-200"
                  >
                    Reactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg mb-4">
              Enter OTP for {selectedRecruiter?.name} ({actionType === 'deactivate' ? 'Deactivation' : 'Reactivation'})
            </h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border p-2 mb-2 w-full"
            />
            <button onClick={handleAction} className="bg-blue-500 text-white px-4 py-2 mr-2">
              Verify OTP
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

export default ManageRecruiters;
