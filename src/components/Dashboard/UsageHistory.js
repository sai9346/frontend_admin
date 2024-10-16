import React, { useEffect, useState } from 'react';
import { fetchUsageHistory } from '../../services/api';

function UsageHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchUsageHistory().then((data) => setHistory(data));
    }, []);

    return (
        <div>
            <h2>Usage History</h2>
            <ul>
                {history.map((item) => (
                    <li key={item.id}>
                        {item.date} - {item.action}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UsageHistory;
