import React, { useState } from 'react';
import axios from 'axios';

const AddTeacher = ({ token }) => {
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [almaMater, setAlmaMater] = useState('');
    const [degree, setDegree] = useState('');
    const [positions, setPositions] = useState('');
    const [biography, setBiography] = useState('');
    const [knowledgeRating, setKnowledgeRating] = useState(0);
    const [teachingSkillRating, setTeachingSkillRating] = useState(0);
    const [communicationRating, setCommunicationRating] = useState(0);
    const [easinessRating, setEasinessRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://hellsinger1337-yarsu-wiki-0893.twc1.net/api/teachers',
                {
                    name,
                    photo,
                    alma_mater: almaMater,
                    degree,
                    positions,
                    biography,
                    knowledge_rating: knowledgeRating,
                    teaching_skill_rating: teachingSkillRating,
                    communication_rating: communicationRating,
                    easiness_rating: easinessRating,
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
            <button type="submit">Add Teacher</button>
        </form>
    );
};

export default AddTeacher;
