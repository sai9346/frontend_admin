import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from '../../services/api'; // Ensure this function is correctly implemented
import Modal from 'react-modal';

const ExpiringPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [newExpirationDate, setNewExpirationDate] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [recruiterDetails, setRecruiterDetails] = useState(null);

  // Fetch expiring plans on component mount
  useEffect(() => {
    const fetchExpiringPlans = async () => {
      try {
        const response = await fetch('/api/plans/expiring'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedPlans = await response.json();
        setPlans(fetchedPlans);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to load plans. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpiringPlans();
  }, []);

  // Fetch recruiter details when a plan is selected for renewal
  const fetchRecruiterDetails = async (recruiterId) => {
    try {
      const userDetails = await fetchUserProfile(recruiterId); // Ensure this API call is correct
      setRecruiterDetails(userDetails);
    } catch (err) {
      console.error("Error fetching recruiter details:", err);
      setError("Failed to load recruiter details.");
    }
  };

  // Open modal and load recruiter details for the selected plan
  const handleRenewPlan = (plan) => {
    setSelectedPlan(plan);
    setNewExpirationDate('');
    setModalIsOpen(true);
    fetchRecruiterDetails(plan.recruiterId);
  };

  // Save new expiration date and close modal
  const handleSave = async () => {
    if (newExpirationDate) {
      try {
        // Simulate updating the expiration date
        const updatedPlans = plans.map((plan) =>
          plan.id === selectedPlan.id ? { ...plan, expirationDate: newExpirationDate } : plan
        );
        setPlans(updatedPlans);
        setModalIsOpen(false);
      } catch (err) {
        console.error("Error renewing plan:", err);
        setError("Failed to renew the plan. Please try again.");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Expiring Plans</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Recruiter Name</th>
            <th className="py-2 px-4 border-b">Plan Name</th>
            <th className="py-2 px-4 border-b">Expiration Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td className="py-2 px-4 border-b">{plan.recruiterName || "N/A"}</td>
              <td className="py-2 px-4 border-b">{plan.name}</td>
              <td className="py-2 px-4 border-b">{plan.expirationDate}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleRenewPlan(plan)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Renew
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for updating expiration date */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Renew Plan">
        <h2 className="text-lg font-semibold mb-4">
          Renew Plan for {recruiterDetails ? recruiterDetails.name : "Selected Recruiter"}
        </h2>
        <p>{recruiterDetails ? recruiterDetails.email : "Loading recruiter details..."}</p>
        <label className="block mb-2">
          New Expiration Date:
          <input
            type="date"
            value={newExpirationDate}
            onChange={(e) => setNewExpirationDate(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </label>
        <div className="mt-4 flex justify-end">
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Save
          </button>
          <button onClick={() => setModalIsOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ExpiringPlans;
