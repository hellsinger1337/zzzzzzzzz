import React, { useState } from 'react';
import { updateProfile } from '../services/api';

const EditProfile = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    email: user.email,
    Username: user.username,
    avatar: user.avatar
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const payload = {
      ...formData,
      token
    };

    try {
      const response = await updateProfile(localStorage.token, formData.Username, formData.avatar);
      if (!response.status == 200) {
        throw new Error('Network response was not ok');
      }

      onUpdate(formData);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <form className="edit-profile" onSubmit={handleSubmit}>
      <div className="edit-avatar">
        <img src={formData.avatar} alt="Avatar" className="edit-avatar-img" />
        <input
          type="file"
          name="avatar"
          id="avatar"
          onChange={handleAvatarChange}
          accept="image/*"
        />
        <label htmlFor="avatar">Change Avatar</label>
      </div>
      <div className="edit-info">
        <p>Email: {user.email}</p>
        <input
          type="text"
          name="Username"
          value={formData.Username}
          onChange={handleChange}
          placeholder="Username"
        />
      </div>
      <button type="submit" className="profile-button profile-button-green">Update</button>
    </form>
  );
};

export default EditProfile;