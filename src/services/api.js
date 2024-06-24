import axios from 'axios';

const api = axios.create({
    baseURL: 'https://hellsinger1337-yarsu-wiki-0893.twc1.net'
});

export const register = (username, email, password) =>
    api.post('/auth/register', { username, email, password });

export const login = (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return api.post('/auth/login', formData);
};

export const getTeachers = () =>
    api.get('/api/teachers');

export const getTeacher = (id) =>
    api.get(`/api/teachers/${id}`);

export const rateTeacher = (teacherId, knowledgeRating, teachingSkillRating, communicationRating, easinessRating, token) =>
    api.post('/api/teacher-ratings', {
        teacher_id: teacherId,
        knowledge_rating: knowledgeRating,
        teaching_skill_rating: teachingSkillRating,
        communication_rating: communicationRating,
        easiness_rating: easinessRating,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

export const commentTeacher = (teacherId, content, token) =>
    api.post(`/api/comments?teacher_id=${teacherId}`, { content: content }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });


export const getComments = (teacherId) =>
    api.get(`/api/teachers/${teacherId}/comments`);

export const getMe = (token) =>
    api.get('/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    export const updateProfile = async (token, newUsername, newPhoto) => {
        try {
            const response = await api.put(
                '/auth/profile',
                {
                    new_username: newUsername,
                    new_photo: newPhoto
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Failed to update profile:', error);
            throw error;
        }
    };