import React, { useEffect, useState } from 'react';
import { fetchPlanUsageReports } from '../../services/api'; // Adjust the import path

const PlanHistory = () => {
  const [planUsage, setPlanUsage] = useState([]);

  useEffect(() => {
    const getPlanUsageData = async () => {
      try {
        const data = await fetchPlanUsageReports();
        setPlanUsage(data); // Update state with plan usage data
      } catch (error) {
        console.error("Failed to fetch plan usage data:", error);
      }
    };
    getPlanUsageData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Plan Usage Reports</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Plan Name</th>
            <th className="py-2 px-4 border-b">Number of Users</th>
            <th className="py-2 px-4 border-b">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {planUsage.map((plan, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{plan.plan}</td>
              <td className="py-2 px-4 border-b">{plan.count}</td>
              <td className="py-2 px-4 border-b">${plan.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanHistory;
