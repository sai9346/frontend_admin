import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdatePlans = () => {
  const { id } = useParams();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');

  // Dummy data for plans
  const dummyPlans = [
    { id: 'basic', name: 'Basic' },
    { id: 'pro', name: 'Pro' },
    { id: 'enterprise', name: 'Enterprise' },
  ];

  useEffect(() => {
    // Simulating API call to fetch plans
    setTimeout(() => {
      setPlans(dummyPlans);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSendOtp = async () => {
    try {
      await axios.post(`http://localhost:5000/api/otp/generate`, { adminId: id, recipient: 'user@example.com' });
      setOtpSent(true);
      alert('OTP has been sent to your email/phone.');
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/otp/validate`, { otp, adminId: id, recipient: 'user@example.com' });
      if (response.data.message === 'OTP is valid') {
        handleUpdate(); // Proceed to update plan
      } else {
        setOtpError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('Failed to verify OTP.');
    }
  };

  const handleUpdate = () => {
    alert(`Plan updated to: ${selectedPlan}`);
    // You can add your API call to update the plan here
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-xl">Update Plan</h2>
      <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
        <option value="">Select Plan</option>
        {plans.map((plan) => (
          <option key={plan.id} value={plan.id}>{plan.name}</option>
        ))}
      </select>
      <button onClick={handleSendOtp} className="mt-2 bg-blue-500 text-white px-4 py-2">Send OTP</button>

      {otpSent && (
        <div>
          <input 
            type="text" 
            placeholder="Enter OTP" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            className="mt-2 border p-2"
          />
          <button onClick={handleVerifyOtp} className="mt-2 bg-green-500 text-white px-4 py-2">Verify OTP</button>
          {otpError && <p className="text-red-500">{otpError}</p>}
        </div>
      )}
    </div>
  );
};

export default UpdatePlans;
