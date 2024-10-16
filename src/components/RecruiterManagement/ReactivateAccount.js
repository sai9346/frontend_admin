import React from 'react';
import { useParams } from 'react-router-dom';

const ReactivateAccount = () => {
  const { id } = useParams();

  const handleReactivate = () => {
    alert(`Account ${id} reactivated successfully!`);
  };

  return (
    <div>
      <h2 className="text-xl">Reactivate Account</h2>
      <button onClick={handleReactivate} className="mt-2 bg-green-500 text-white px-4 py-2">Reactivate Account</button>
    </div>
  );
};

export default ReactivateAccount;
