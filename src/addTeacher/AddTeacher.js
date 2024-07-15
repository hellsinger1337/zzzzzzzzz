import React, { useState } from 'react';
import './AddTeacher.css'
import {api, getMe} from '../services/api'

const AddTeacher = ({ token }) => {
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [almaMater, setAlmaMater] = useState('');
    const [degree, setDegree] = useState('');
    const [positions, setPositions] = useState('');
    const [biography, setBiography] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }

            const userInfo = await getMe(token);
            const response = await api.post(
                'api/teacher_requests',
                {
                    name,
                    photo,
                    alma_mater: almaMater,
                    degree,
                    positions,
                    biography,
                    user_id: userInfo.data.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error('Failed to add teacher:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Photo URL"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
            />
            <input
                type="text"
                placeholder="Alma Mater"
                value={almaMater}
                onChange={(e) => setAlmaMater(e.target.value)}
            />
            <input
                type="text"
                placeholder="Degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
            />
            <input
                type="text"
                placeholder="Positions"
                value={positions}
                onChange={(e) => setPositions(e.target.value)}
            />
            <textarea
                placeholder="Biography"
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
            />
            <button type="submit">Предложить преподователя для рассмотрения администрации</button>
        </form>
    );
};

export default AddTeacher;
