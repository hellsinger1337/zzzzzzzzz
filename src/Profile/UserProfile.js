import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import EditProfile from './EditProfile';
import './UserProfile.css';
import { getMe } from '../services/api'

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
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
      setUser(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  
  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
    setEditMode(false);
    fetchUserProfile();
  };
  useEffect(() => {
    

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  if(!user.is_email_verified){
    return (
      <div className="bad-email">
        <h1>Добро пожаловать в клуб!</h1>
        <h2>Для просмотра профиля или для кучи других действий тебе необходимо подтвердить почту</h2>
        <p>Чтоб подтвердить почту просто кликни на ссылку, которая придет тебе на почту университета (Проверь спам, если не видно письма)</p>
      </div>
    )
  }
  return (
    <div className="user-profile-container">
      <div className="profile-container">
        <button className="profile-button profile-button-green" onClick={() => setEditMode(!editMode)}>
          {editMode ? "Show Profile" : "Edit Profile"}
        </button>
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