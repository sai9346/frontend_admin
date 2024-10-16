import React, { useState, useEffect } from 'react';
import { fetchPlans, deletePlan as deletePlanApi } from '../../services/api'; // Import your API functions

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch plans from the API on component mount
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const fetchedPlans = await fetchPlans();
        setPlans(fetchedPlans);
      } catch (err) {
        setError('Failed to load plans');
      } finally {
        setLoading(false);
      }
    };
    loadPlans();
  }, []);

  const deletePlan = async (id) => {
    try {
      await deletePlanApi(id);  // Delete the plan using API
      setPlans(plans.filter(plan => plan._id !== id)); // Use _id instead of id
    } catch (err) {
      setError('Failed to delete plan');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Subscription Plans</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Plan Name</th>
            <th className="py-2 px-4 border-b">Features</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan._id}> {/* Use _id for the key */}
              <td className="py-2 px-4 border-b">{plan.name}</td>
              <td className="py-2 px-4 border-b">{plan.features.join(', ')}</td>
              <td className="py-2 px-4 border-b">${plan.price}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => deletePlan(plan._id)} className="text-red-500">Delete</button> {/* Use _id */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePlans;
