import React from 'react';
import ProfileDetail from '../components/Dashboard/ProfileDetail';
import { useParams } from 'react-router-dom';

function ProfileDetailPage() {
    const { userId } = useParams();

    return (
        <div>
            <h1>Profile Detail</h1>
            <ProfileDetail userId={userId} />
        </div>
    );
}

export default ProfileDetailPage;
