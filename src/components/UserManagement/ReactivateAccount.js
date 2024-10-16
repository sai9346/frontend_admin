import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReactivateAccount = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleReactivate = () => {
    // API call to reactivate the account
    alert(`Account for user ${id} has been reactivated.`);
    navigate(`/user/${id}`); // Redirect to user profile after reactivation
  };

  return (
    <div>
      <h1>Reactivate Account for User {id}</h1>
      <button onClick={handleReactivate}>Reactivate</button>
    </div>
  );
};

export default ReactivateAccount;
