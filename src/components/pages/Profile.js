import React, { useState, useEffect } from 'react';
import { getProfile } from '../../services/authService';

const Profile = ({ token }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile(token);
      setProfile(data);
    };
    fetchProfile();
  }, [token]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default Profile;
