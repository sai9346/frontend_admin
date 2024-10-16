import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeactivateAccount = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeactivate = () => {
    // API call to deactivate the account
    alert(`Account for user ${id} has been deactivated.`);
    navigate('/'); // Redirect after deactivation
  };

  return (
    <div>
      <h1>Deactivate Account for User {id}</h1>
      <button onClick={handleDeactivate}>Deactivate</button>
    </div>
  );
};

export default DeactivateAccount;
