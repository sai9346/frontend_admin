import React, { useState, useEffect } from 'react';
import { fetchPlans, renewPlan } from '../../services/api'; // Make sure the path is correct

const ExpiringPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await fetchPlans();
        setPlans(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load plans');
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  const handleRenewPlan = async (id) => {
    try {
      await renewPlan(id, 1); // Renew for 1 month by default
      alert(`Plan ID: ${id} has been renewed for 1 month.`);
    } catch (err) {
      setError('Failed to renew plan.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Expiring Plans</h1>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Expiration Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>{plan.expirationDate}</td>
              <td>
                <button onClick={() => handleRenewPlan(plan.id)}>Renew</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpiringPlans;
