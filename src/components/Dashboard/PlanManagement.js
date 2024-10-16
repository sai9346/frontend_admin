import React, { useEffect, useState } from 'react';
import { fetchPlans } from '../../services/api';

function PlanManagement() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        fetchPlans().then((data) => setPlans(data));
    }, []);

    return (
        <div>
            <h2>Plan Management</h2>
            <ul>
                {plans.map((plan) => (
                    <li key={plan.id}>{plan.name} - {plan.quota} users</li>
                ))}
            </ul>
        </div>
    );
}

export default PlanManagement;
