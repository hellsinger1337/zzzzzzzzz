import React, { useEffect, useState } from 'react';
import TeacherRequests from './TeacherRequests';
import './AdminPanel.css';
import { getMe } from '../services/api'

const AdminPanel = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await getMe(token);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>Error loading user data.</p>;
    }

    if (!user.is_admin) {
        return (
            <div className="admin-panel">
                <button onClick={() => window.location.href = '/'}>На главную</button>
            </div>
        );
    }

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <TeacherRequests />
        </div>
    );
};

export default AdminPanel;