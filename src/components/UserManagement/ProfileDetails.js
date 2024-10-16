import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUserProfile, fetchAnalyticsData } from '../../services/api'; // Adjust the path based on your file structure

const ProfileDetails = () => {
  const { id } = useParams(); // Get user ID from route params
  const [user, setUser] = useState(null); // Store user details
  const [quotas, setQuotas] = useState(null); // Store remaining quotas
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) {
        setError("User ID is requiredbjbjb"); // Handle case where ID is not provided
        setLoading(false);
        return;
      }

      try {
        const userData = await fetchUserProfile(id); // Fetch user profile from API
        const analyticsData = await fetchAnalyticsData(); // Fetch quotas or analytics data if needed

        setUser(userData); // Assuming userData has the structure you need
        setQuotas(analyticsData.remainingQuotas); // Assuming analyticsData has the required quota information
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="profile-details p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile: {user.name}</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Account Information</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Company:</strong> {user.company}</p>
        <p><strong>Contact Number:</strong> {user.contactNumber}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Plan Information</h2>
        <p><strong>Plan Name:</strong> {user.plan.name}</p>
        <p><strong>Expiration Date:</strong> {user.plan.expirationDate}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Remaining Quotas</h2>
        <p><strong>Job Posts Remaining:</strong> {quotas.jobPosts}</p>
        <p><strong>Candidate Searches Remaining:</strong> {quotas.candidateSearches}</p>
        <p><strong>Video Interviews Conducted:</strong> {user.usageHistory.videoInterviewsConducted} / {user.plan.videoInterviewLimit}</p>
      </div>

      <div className="actions mt-4">
        <Link to={`/user/${user.id}/update-plans`} className="text-blue-500 underline">Update Plan</Link><br />
        <Link to={`/user/${user.id}/deactivate`} className="text-red-500 underline">Deactivate Account</Link><br />
        <Link to={`/user/${user.id}/change-quotas`} className="text-green-500 underline">Change Quotas</Link>
      </div>
    </div>
  );
};

export default ProfileDetails;
