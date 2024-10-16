import React, { useState, useEffect } from 'react';
import { fetchPlans, renewPlan } from '../../services/api'; // Adjust the path based on your structure

const ExpiringPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpiringPlans = async () => {
      try {
        const fetchedPlans = await fetchPlans(); // Fetch plans from backend
        setPlans(fetchedPlans); // Set state with fetched plans
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiringPlans();
  }, []);

  const handleRenewPlan = async (id) => {
    try {
      await renewPlan(id, 30); // Assuming you want to add 30 days
      // Optionally, refresh the plans after renewal
      const updatedPlans = await fetchPlans();
      setPlans(updatedPlans);
    } catch (err) {
      setError(err.message);
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
            <th className="py-2 px-4 border-b">Plan Name</th>
            <th className="py-2 px-4 border-b">Expiration Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td className="py-2 px-4 border-b">{plan.name}</td>
              <td className="py-2 px-4 border-b">{plan.expirationDate}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleRenewPlan(plan.id)} className="bg-green-500 text-white px-2 py-1 rounded">
                  Renew
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpiringPlans;
