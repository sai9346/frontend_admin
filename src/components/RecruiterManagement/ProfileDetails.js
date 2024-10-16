import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserProfile } from '../../services/api'; // Adjust the path as necessary

const ProfileDetails = () => {
  const { id } = useParams(); // Get the recruiter ID from URL params
  const [recruiter, setRecruiter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Recruiter ID:", id); // Debug log
    const fetchRecruiterData = async () => {
      if (!id) {
        setError('Recruiter ID is not provided');
        setLoading(false);
        return;
      }

      try {
        const recruiterData = await fetchUserProfile(id);
        console.log("Recruiter Data:", recruiterData); // Log the retrieved data
        if (!recruiterData) {
          setError('Recruiter not found');
        } else {
          setRecruiter(recruiterData);
        }
      } catch (err) {
        console.error('API error:', err); // Log the error for debugging
        setError('Error: Recruiter not found or API request failed.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterData();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Display recruiter details
  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
      <p><strong>Name:</strong> {recruiter.name || 'N/A'}</p>
      <p><strong>Email:</strong> {recruiter.email || 'N/A'}</p>
      <p><strong>Plan:</strong> {recruiter.plan || 'N/A'}</p>
      <p><strong>Active:</strong> {recruiter.active ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default ProfileDetails;
