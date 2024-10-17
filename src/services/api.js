import axios from 'axios';

// Update API_URL to point to your deployed backend
const API_URL = 'https://backend-admin-nqf3.onrender.com/api'; // Adjusted for production use

// Error handling utility function
const handleError = (action, error) => {
  if (error.response) {
    console.error(`Error ${action}:`, error.response.data);
    throw new Error(error.response.data.message || error.response.status);
  } else {
    console.error(`Error ${action}: No response received`, error);
    throw new Error("No response from server");
  }
};

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    handleError('fetching users', error);
  }
};

// Fetch user profile by ID
export const fetchUserProfile = async (userId) => {
  if (!userId) throw new Error("User ID is required");

  try {
    const response = await axios.get(`${API_URL}/user/${userId}/profile`); // Ensure this URL matches your backend
    return response.data;
  } catch (error) {
    handleError('fetching user profile', error);
  }
};

// Update user plan
export const updateUserPlan = async (id, planData) => {
  try {
      const response = await axios.put(`${API_URL}/plans/${id}/update-plan`, planData); // Ensure this URL matches your backend
      return response.data;
  } catch (error) {
      handleError('updating user plan', error);
  }
};

// Fetch analytics data
export const fetchAnalyticsData = async () => {
  try {
    const response = await axios.get(`${API_URL}/analytics`);
    return response.data;
  } catch (error) {
    handleError('fetching analytics data', error);
  }
};

// Fetch all plans
export const fetchPlans = async () => {
  try {
    const response = await axios.get(`${API_URL}/plans`);
    return response.data;
  } catch (error) {
    handleError('fetching plans', error);
  }
};

// Add a feature to a plan
export const addFeatureToPlan = async (planId, featureId) => {
  try {
    const response = await axios.post(`${API_URL}/plans/add-feature`, {
      planId,
      featureId // Clear and concise
    });
    return response.data;
  } catch (error) {
    handleError('adding feature to plan', error);
  }
};

// Remove a feature from a plan
export const removeFeatureFromPlan = async (planId, featureId) => {
  try {
    const response = await axios.delete(`${API_URL}/plans/remove-feature`, {
      data: { planId, featureId }
    });
    return response.data;
  } catch (error) {
    handleError('removing feature', error);
  }
};

// Delete a plan
export const deletePlan = async (planId) => {
  try {
    const response = await axios.delete(`${API_URL}/plans/${planId}`);
    return response.data;
  } catch (error) {
    handleError('deleting plan', error);
  }
};

// Bulk assign plans to users
export const bulkAssignPlans = async (userIds, selectedPlan) => {
  try {
    const response = await axios.post(`${API_URL}/plans/bulk-assign`, { userIds, selectedPlan });
    return response.data;
  } catch (error) {
    handleError('bulk assigning plans', error);
  }
};

// Renew user plan
export const renewPlan = async (userId, additionalDays) => {
  try {
    const response = await axios.post(`${API_URL}/renewals/renew`, {
      userId, // Include userId in the request body
      additionalDays, // Send additionalDays
    });
    return response.data; // Return the data received from the response
  } catch (error) {
    console.error('Error renewing plan:', error);
    throw new Error(error.response?.data?.message || 'An error occurred during renewal.');
  }
};

// Fetch billing history
export const fetchBillingHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/billing`);
    return response.data;
  } catch (error) {
    handleError('fetching billing history', error);
  }
};

// Fetch plan usage reports
export const fetchPlanUsageReports = async () => {
  try {
    const response = await axios.get(`${API_URL}/analytics/plan-usage`);
    return response.data;
  } catch (error) {
    handleError('fetching plan usage reports', error);
  }
};

// Fetch feature usage data
export const fetchFeatureUsage = async () => {
  try {
    const response = await axios.get(`${API_URL}/analytics/feature-usage`);
    return response.data;
  } catch (error) {
    handleError('fetching feature usage data', error);
  }
};

// Fetch notifications log
export const fetchNotifications = async () => {
  try {
    const response = await axios.get(`${API_URL}/notifications/notificationsLog`);
    return response.data;
  } catch (error) {
    handleError('fetching notifications', error);
  }
};

// Send notification to a single user
export const sendNotification = async (userId, message, type) => {
  try {
    const response = await axios.post(`${API_URL}/notifications/send`, { userId, message, type });
    return response.data;
  } catch (error) {
    handleError('sending notification', error);
  }
};

// Send bulk notifications to multiple users
export const sendBulkNotifications = async (userIds, message, type) => {
  try {
    const response = await axios.post(`${API_URL}/notifications/send-bulk`, { userIds, message, type });
    return response.data;
  } catch (error) {
    handleError('sending bulk notifications', error);
  }
};

// Fetch audit data
export const fetchAuditData = async () => {
  try {
    const response = await axios.get(`${API_URL}/audit`); // This should match the backend route
    return response.data;
  } catch (error) {
    handleError('fetching audit data', error);
  }
};



// Function to reactivate account
export const reactivateAccount = async (userId, otp) => {
  try {
    const response = await axios.post('/accounts/reactivate', { userId, otp });
    return response.data; // Return the response data (message)
  } catch (error) {
    throw error.response.data; // Throw error message if failed
  }
};
// Function to deactivate account
export const deactivateAccount = async (userId, otp) => {
  try {
    const response = await axios.post('/accounts/deactivate', { userId, otp });
    return response.data; // Return the response data (message)
  } catch (error) {
    throw error.response.data; // Throw error message if failed
  }
};