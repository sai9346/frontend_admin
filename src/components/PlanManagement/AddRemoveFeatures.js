import React, { useState, useEffect } from 'react';
import { fetchPlans, addFeatureToPlan, removeFeatureFromPlan } from '../../services/api'; // Import the API functions
import Swal from 'sweetalert2';

const AddRemoveFeatures = () => {
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Basic');
  const [feature, setFeature] = useState('');
  const [quota, setQuota] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState({});
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchPlans();
        const initializedFeatures = {};
        data.forEach(plan => {
          initializedFeatures[plan.name] = Array.isArray(plan.features) ? plan.features.map(f => f.name) : [];
        });

        setFeatures(initializedFeatures);
        setPlans(data);

        const defaultPlan = data.find(plan => plan.name === 'Basic');
        if (defaultPlan) {
          setSelectedPlanId(defaultPlan._id);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        Swal.fire('Error', 'Failed to fetch plans. Please try again later.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFeatureChange = (e) => {
    setFeature(e.target.value);
  };

  const handleQuotaChange = (e) => {
    setQuota(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePlanChange = (e) => {
    const planName = e.target.value;
    setSelectedPlan(planName);

    const selectedPlanData = plans.find(plan => plan.name === planName);
    if (selectedPlanData) {
      setSelectedPlanId(selectedPlanData._id);
    }
  };

  const addFeature = async () => {
    if (!feature.trim() || !quota.trim() || !description.trim()) {
      return Swal.fire('Error', 'Feature name, quota, and description cannot be empty', 'error');
    }

    if (features[selectedPlan]?.includes(feature)) {
      return Swal.fire('Error', 'Feature already exists', 'error');
    }

    try {
      await addFeatureToPlan(selectedPlanId, { name: feature, quota, description });
      setFeatures({
        ...features,
        [selectedPlan]: [...(features[selectedPlan] || []), feature]
      });
      setFeature('');
      setQuota('');
      setDescription('');
      Swal.fire('Success', 'Feature added successfully', 'success');
    } catch (error) {
      console.error("Error adding feature:", error);
      Swal.fire('Error', 'Failed to add feature. Please try again.', 'error');
    }
  };

  const removeFeature = async (featureToRemove) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await removeFeatureFromPlan(selectedPlanId, featureToRemove);
          setFeatures({
            ...features,
            [selectedPlan]: features[selectedPlan].filter(f => f !== featureToRemove),
          });
          Swal.fire('Success', 'Feature removed successfully', 'success');
        } catch (error) {
          console.error("Error removing feature:", error);
          Swal.fire('Error', 'Failed to remove feature. Please try again.', 'error');
        }
      }
    });
  };

  return (
    <div className="p-4" style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
      <h3>Manage Plan Features</h3>

      {loading ? (
        <p>Loading plans...</p>
      ) : (
        <>
          <div>
            <label htmlFor="plan-select">Select Plan:</label>
            <select
              id="plan-select"
              value={selectedPlan}
              onChange={handlePlanChange}
              style={{ padding: '8px', margin: '8px 0', backgroundColor: '#e3e3e3', borderRadius: '4px' }}
            >
              {plans.map((plan) => (
                <option key={plan._id} value={plan.name}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="text"
              value={feature}
              onChange={handleFeatureChange}
              placeholder="Enter Feature"
              style={{ padding: '8px', borderRadius: '4px', marginRight: '8px' }}
            />
            <input
              type="text"
              value={quota}
              onChange={handleQuotaChange}
              placeholder="Enter Quota"
              style={{ padding: '8px', borderRadius: '4px', marginRight: '8px' }}
            />
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter Description"
              style={{ padding: '8px', borderRadius: '4px', marginRight: '8px' }}
            />
            <button onClick={addFeature} style={{ padding: '8px', backgroundColor: '#28a745', color: 'white', borderRadius: '4px' }}>
              Add Feature
            </button>
          </div>

          <h4>Features for {selectedPlan}:</h4>
          <ul>
            {features[selectedPlan]?.map((f, index) => (
              <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {f}
                <button 
                  onClick={() => removeFeature(f)} 
                  style={{ marginLeft: '10px', padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', borderRadius: '4px' }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AddRemoveFeatures;
