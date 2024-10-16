import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../../services/api';

function ProfileDetail({ userId }) {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchUserProfile(userId).then((data) => setProfile(data));
    }, [userId]);

    if (!profile) return <p>Loading profile...</p>;

    return (
        <div>
            <h2>{profile.name}'s Profile</h2>
            <p>Email: {profile.email}</p>
            <p>Joined: {profile.joinedDate}</p>
            {/* Add more details as needed */}
        </div>
    );
}

export default ProfileDetail;
