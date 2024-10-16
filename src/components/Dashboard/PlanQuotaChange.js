import React, { useState } from 'react';
import { updatePlanQuota } from '../../services/api';

function PlanQuotaChange({ planId, currentQuota, onQuotaUpdate }) {
    const [newQuota, setNewQuota] = useState(currentQuota);

    const handleQuotaChange = () => {
        updatePlanQuota(planId, newQuota).then(() => {
            onQuotaUpdate(planId, newQuota);
        });
    };

    return (
        <div>
            <h4>Change Quota for Plan {planId}</h4>
            <input
                type="number"
                value={newQuota}
                onChange={(e) => setNewQuota(e.target.value)}
            />
            <button onClick={handleQuotaChange}>Update Quota</button>
        </div>
    );
}

export default PlanQuotaChange;
