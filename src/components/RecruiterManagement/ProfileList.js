import React, { useEffect, useState } from 'react';
import { fetchUserProfiles } from '../../services/api';
import ProfileDetails from './ProfileDetails';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetchUserProfiles();
        setProfiles(response);
      } catch (err) {
        setError('Error fetching profiles');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleProfileClick = (profileId) => {
    const profile = profiles.find((p) => p._id === profileId);
    setSelectedProfile(profile);
  };

  if (loading) return <div>Loading profiles...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-list-container">
      <div className="profile-list">
        <h2>User Profiles</h2>
        <ul>
          {profiles.map((profile) => (
            <li key={profile._id} onClick={() => handleProfileClick(profile._id)}>
              {profile.name} - {profile.email}
            </li>
          ))}
        </ul>
      </div>
      <div className="profile-details">
        <ProfileDetails profile={selectedProfile} />
      </div>
    </div>
  );
};

export default ProfileList;
