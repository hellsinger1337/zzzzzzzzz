import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import EditProfile from './EditProfile';
import './UserProfile.css';
import {getMe} from '../services/api'

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
    setEditMode(false);
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await getMe(token);

        if (!response.status == 200) {
          throw new Error('Network response was not ok');
        }

        const data = await response.data;
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="user-profile-container">
      <div className="profile-container">
        <label className="toggle-switch">
          <input type="checkbox" checked={editMode} onChange={() => setEditMode(!editMode)} />
          <span className="slider">
            <span className="slider-text">{editMode ? "Edit Profile" : "Show Profile"}</span>
          </span>
        </label>
        {editMode ? (
          <EditProfile user={user} onUpdate={handleUpdate} />
        ) : (
          <Profile user={user} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;