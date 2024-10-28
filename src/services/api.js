// src/utils/api.js
import axios from 'axios';
import Swal from 'sweetalert2';

// Set up the base URL for your API
export const API_URL = 'https://backend-admin-nqf3.onrender.com/api'; // Change this for production

// Error handling utility function
const handleError = (action, error) => {
  if (error.response) {
    console.error(`Error ${action}:`, error.response.data);
    Swal.fire('Error', error.response.data.message || error.response.status, 'error');
    throw new Error(error.response.data.message || error.response.status);
  } else {
    console.error(`Error ${action}: No response received`, error);
    Swal.fire('Error', 'No response from server', 'error');
    throw new Error('No response from server');
  }
};

export const billingService = {
  // Fetch all billing records
  async fetchBillingHistory() {
    try {
      const response = await axios.get(`${API_URL}/billing`);
      return response.data;
    } catch (error) {
      handleError('fetching billing history', error);
    }
  },

  // Fetch billing by ID
  async getBillingById(id) {
    try {
      const response = await axios.get(`${API_URL}/billing/${id}`);
      return response.data;
    } catch (error) {
      handleError('fetching billing record', error);
    }
  },

  // Create new billing record
  async createBilling(billingData) {
    try {
      const response = await axios.post(`${API_URL}/billing`, billingData);
      return response.data;
    } catch (error) {
      handleError('creating billing record', error);
    }
  }
};

// Function to send notifications
export const sendNotification = async (email, subject, text) => {
  try {
    const response = await axios.post(`${API_URL}/notifications`, {
      email,
      subject,
      text,
    });
    return response.data;
  } catch (error) {
    handleError('sending notification', error);
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

// Fetch all user profiles
export const fetchUserProfiles = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/profiles`);
    return response.data;
  } catch (error) {
    handleError('fetching user profiles', error);
  }
};

// Fetch user profile by ID
export const fetchUserProfile = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}/profile`);
    return response.data;
  } catch (error) {
    handleError('fetching user profile', error);
  }
};

// Update user plan
export const updateUserPlan = async (id, planData) => {
  try {
    const response = await axios.patch(`${API_URL}/plans/${id}/update-plan`, planData);
    return response.data;
  } catch (error) {
    handleError('updating user plan', error);
  }
};

// Example API function to fetch analytics data
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
    const response = await axios.post(`${API_URL}/plans/add-feature`, { planId, featureId });
    return response.data;
  } catch (error) {
    handleError('adding feature to plan', error);
  }
};

// Remove a feature from a plan
export const removeFeatureFromPlan = async (planId, featureId) => {
  try {
    const response = await axios.delete(`${API_URL}/plans/remove-feature`, {
      data: { planId, featureId },
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



// Renew user plan
export const renewPlan = async (userId, additionalDays) => {
  try {
    const response = await axios.post(`${API_URL}/renewals/renew`, {
      userId,
      additionalDays,
    });
    return response.data;
  } catch (error) {
    handleError('renewing plan', error);
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
    const response = await axios.get(`${API_URL}/notifications/log`);
    return response.data;
  } catch (error) {
    handleError('fetching notifications', error);
  }
};

// Send notification to a single user
export const sendNotificationToUser = async (userId, message, type) => {
  try {
    const response = await axios.post(`${API_URL}/notifications/send`, { userId, message, type });
    return response.data;
  } catch (error) {
    handleError('sending notification to user', error);
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
    const response = await axios.get(`${API_URL}/audit`);
    return response.data;
  } catch (error) {
    handleError('fetching audit data', error);
  }
};

// Generate OTP function
export const generateOTP = async (recipient, userId, action) => {
  try {
    const response = await axios.post(`${API_URL}/otp/generate`, { recipient, userId, action });
    return response.data;
  } catch (error) {
    console.error("Error generating OTP:", error.response || error.message || error);
    Swal.fire('Error', 'Error sending OTP', 'error');
    throw new Error('Error sending OTP');
  }
};

// Reactivate account function
export const reactivateAccount = async (userId, otp) => {
  try {
    const response = await axios.post(`${API_URL}/accounts/reactivate`, { userId, otp });
    return response.data;
  } catch (error) {
    console.error("Error reactivating account:", error.response || error.message || error);
    Swal.fire('Error', 'Failed to reactivate account', 'error');
    throw new Error('Failed to reactivate account');
  }
};

// Validate OTP
export const validateOTP = async (userId, otp, recipient) => {
  try {
    const response = await axios.post(`${API_URL}/otp/validate`, { userId, otp, recipient, action: 'deactivate' });
    return response.data;
  } catch (error) {
    handleError('validating OTP', error);
  }
};

// Deactivate account
export const deactivateAccount = async (id, otp) => {
  try {
    const response = await axios.post(`${API_URL}/accounts/deactivate`, { userId: id, otp });
    return response.data;
  } catch (error) {
    handleError('deactivating account', error);
  }
};

// Log plan change
export const logPlanChange = async (user, oldPlan, newPlan) => {
  try {
    const response = await axios.post(`${API_URL}/planChangeLog/log`, { user, oldPlan, newPlan });
    return response.data;
  } catch (error) {
    handleError('logging plan change', error);
  }
};

// Example to handle billing renewals
export const handleBillingRenewals = async (userId, billingData) => {
  try {
    const response = await axios.post(`${API_URL}/billing/renew`, { userId, ...billingData });
    return response.data;
  } catch (error) {
    handleError('handling billing renewals', error);
  }
};

// Example API function to fetch system metrics
export const fetchSystemMetrics = async () => {
  try {
    const response = await axios.get(`${API_URL}/metrics/system`);
    return response.data;
  } catch (error) {
    handleError('fetching system metrics', error);
  }
};

// Function to create a new feature
export const createFeature = async (featureData) => {
  try {
    const response = await axios.post(`${API_URL}/features`, featureData);
    return response.data;
  } catch (error) {
    handleError('creating feature', error);
  }
};

// Function to delete a feature
export const deleteFeature = async (featureId) => {
  try {
    const response = await axios.delete(`${API_URL}/features/${featureId}`);
    return response.data;
  } catch (error) {
    handleError('deleting feature', error);
  }
};

// Function to update a feature
export const updateFeature = async (featureId, featureData) => {
  try {
    const response = await axios.patch(`${API_URL}/features/${featureId}`, featureData);
    return response.data;
  } catch (error) {
    handleError('updating feature', error);
  }
};


// Assign or change plan for a single user
export const assignChangePlan = async (userId, plan) => {
  try {
    const response = await axios.post(`${API_URL}/users/assign-plan`, { userId, plan });
    return response.data;
  } catch (error) {
    console.error("Error assigning/changing plan:", error);
    throw error;
  }
};

// Bulk assign plans to multiple users
export const bulkAssignPlans = async (userIds, plan) => {
  try {
    const response = await axios.post(`${API_URL}/users/bulk-assign-plans`, { userIds, plan });
    return response.data;
  } catch (error) {
    console.error("Error bulk assigning plans:", error);
    throw error;
  }
};
// Update a plan
export const updatePlan = async (planId, planData) => {
  try {
    const response = await axios.patch(`${API_URL}/plans/${planId}`, planData);
    return response.data;
  } catch (error) {
    handleError('updating plan', error);
  }
};

// Add a feature to a plan
export const addFeature = async (planId, featureData) => {
  try {
    const response = await axios.post(`${API_URL}/plans/${planId}/add-feature`, featureData);
    return response.data;
  } catch (error) {
    handleError('adding feature to plan', error);
  }
};

// Remove a feature from a plan
export const removeFeature = async (planId, featureId) => {
  try {
    const response = await axios.delete(`${API_URL}/plans/${planId}/remove-feature/${featureId}`);
    return response.data;
  } catch (error) {
    handleError('removing feature from plan', error);
  }
};



export const planService = {
  getAllPlans: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching plans:', error);
      throw error;
    }
  },

  createPlan: async (planData) => {
    try {
      const response = await axios.post(API_URL, planData);
      return response.data;
    } catch (error) {
      console.error('Error creating plan:', error);
      throw error;
    }
  },

  updatePlan: async (id, planData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/update-plan`, planData);
      return response.data;
    } catch (error) {
      console.error('Error updating plan:', error);
      throw error;
    }
  },

  deletePlan: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting plan:', error);
      throw error;
    }
  },

  addFeature: async (planId, feature) => {
    try {
      const response = await axios.post(`${API_URL}/add-feature`, { planId, feature });
      return response.data;
    } catch (error) {
      console.error('Error adding feature:', error);
      throw error;
    }
  },

  removeFeature: async (planId, featureId) => {
    try {
      const response = await axios.delete(`${API_URL}/remove-feature`, {
        data: { planId, featureId }
      });
      return response.data;
    } catch (error) {
      console.error('Error removing feature:', error);
      throw error;
    }
  }
};