import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../services/api'; // Adjust the path as necessary

const RecruiterList = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingId, setLoadingId] = useState(null); // For tracking which button is loading

  useEffect(() => {
    const getRecruiters = async () => {
      try {
        const data = await fetchUsers(); // Fetch users from API
        setRecruiters(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getRecruiters();
  }, []);

  const handleDeactivate = async (id) => {
    setLoadingId(id); // Set the loading ID
    try {
      // Here you might call an API to deactivate the user
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedRecruiters = recruiters.map(recruiter => 
        recruiter.id === id ? { ...recruiter, active: false } : recruiter
      );
      setRecruiters(updatedRecruiters);
    } catch (error) {
      console.error('Error deactivating recruiter:', error);
    } finally {
      setLoadingId(null); // Reset the loading ID
    }
  };

  const handleReactivate = async (id) => {
    setLoadingId(id); // Set the loading ID
    try {
      // Here you might call an API to reactivate the user
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedRecruiters = recruiters.map(recruiter => 
        recruiter.id === id ? { ...recruiter, active: true } : recruiter
      );
      setRecruiters(updatedRecruiters);
    } catch (error) {
      console.error('Error reactivating recruiter:', error);
    } finally {
      setLoadingId(null); // Reset the loading ID
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-xl">Recruiters</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200">ID</th>
            <th className="border border-gray-200">Name</th>
            <th className="border border-gray-200">Email</th>
            <th className="border border-gray-200">Plan</th>
            <th className="border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recruiters.map((recruiter) => (
            <tr key={recruiter.id}>
              <td className="border border-gray-200">{recruiter.id}</td>
              <td className="border border-gray-200">{recruiter.name}</td>
              <td className="border border-gray-200">{recruiter.email}</td>
              <td className="border border-gray-200">{recruiter.plan}</td>
              <td className="border border-gray-200">
                {recruiter.active ? (
                  <button
                    className={`text-red-500 ${loadingId === recruiter.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleDeactivate(recruiter.id)}
                    disabled={loadingId === recruiter.id}
                  >
                    {loadingId === recruiter.id ? 'Deactivating...' : 'Deactivate'}
                  </button>
                ) : (
                  <button
                    className={`text-green-500 ${loadingId === recruiter.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleReactivate(recruiter.id)}
                    disabled={loadingId === recruiter.id}
                  >
                    {loadingId === recruiter.id ? 'Reactivating...' : 'Reactivate'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecruiterList;
