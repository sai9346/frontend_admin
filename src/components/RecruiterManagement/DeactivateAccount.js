import React from 'react';
import { useParams } from 'react-router-dom';

const DeactivateAccount = () => {
  const { id } = useParams();

  const handleDeactivate = () => {
    alert(`Account ${id} deactivated successfully!`);
  };

  return (
    <div>
      <h2 className="text-xl">Deactivate Account</h2>
      <button onClick={handleDeactivate} className="mt-2 bg-red-500 text-white px-4 py-2">Deactivate Account</button>
    </div>
  );
};

export default DeactivateAccount;
