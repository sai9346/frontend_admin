import React, { useState } from 'react';
import { renewPlan } from '../../services/api'; // Adjust the import path based on your file structure

const RenewExtendPlans = () => { 
  const [selectedPlan, setSelectedPlan] = useState('Basic');
  const [extensionMonths, setExtensionMonths] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Logic to get current user ID, e.g., from context or props
  const userId = null; // Replace this with your actual logic to get the user ID

  const handleRenew = async () => {
    const additionalDays = extensionMonths * 30; // Assuming each month is 30 days

    // Log the values being sent
    console.log('Renewing plan with:', { additionalDays });

    if (!userId || additionalDays <= 0) {
      setErrorMessage("Please provide a valid user ID and number of additional days.");
      return;
    }

    try {
      const response = await renewPlan(additionalDays); // Removed userId from API call
      setSuccessMessage(response.message);
      setErrorMessage(null); // Clear any previous error
    } catch (error) {
      console.error('Error renewing plan:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred during renewal.');
      setSuccessMessage(null); // Clear any previous success message
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Renew or Extend Plans</h2>
      <div className="mb-4">
        <label className="block mb-2">Select Plan:</label>
        <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} className="border border-gray-300 p-2 w-full">
          <option value="Basic">Basic Plan</option>
          <option value="Pro">Pro Plan</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Extension (Months):</label>
        <input 
          type="number" 
          value={extensionMonths} 
          onChange={(e) => setExtensionMonths(e.target.value)} 
          min="1" 
          className="border border-gray-300 p-2 w-full"
        />
      </div>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
      <button onClick={handleRenew} className="bg-green-500 text-white px-4 py-2 rounded">
        Renew Plan
      </button>
    </div>
  );
};

export default RenewExtendPlans;
