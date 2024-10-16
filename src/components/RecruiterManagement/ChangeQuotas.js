import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ChangeQuotas = () => {
  const { id } = useParams();
  const [quota, setQuota] = useState(0);
  const [error, setError] = useState(null);

  const handleChangeQuota = () => {
    alert(`Quota updated to: ${quota}`);
  };

  return (
    <div>
      <h2 className="text-xl">Change Quota</h2>
      <input
        type="number"
        value={quota}
        onChange={(e) => setQuota(e.target.value)}
        placeholder="Enter new quota"
        className="border border-gray-300 p-2"
      />
      <button onClick={handleChangeQuota} className="mt-2 bg-green-500 text-white px-4 py-2">Change Quota</button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ChangeQuotas;
