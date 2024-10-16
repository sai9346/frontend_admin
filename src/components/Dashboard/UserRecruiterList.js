import React, { useEffect, useState } from 'react';
import { fetchRecruiters } from '../../services/api';

function UserRecruiterList() {
    const [recruiters, setRecruiters] = useState([]);

    useEffect(() => {
        fetchRecruiters().then((data) => setRecruiters(data));
    }, []);

    return (
        <div>
            <h2>Recruiter List</h2>
            <ul>
                {recruiters.map((recruiter) => (
                    <li key={recruiter.id}>
                        {recruiter.name} ({recruiter.email})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserRecruiterList;
