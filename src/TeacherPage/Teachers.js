import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Teachers.css'
import {getTeachers} from '../services/api'
const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getTeachers();
        if (!response.status==200) {
          throw new Error('Network response was not ok');
        }
        const data = await response.data;
        setTeachers(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div>
      <h1>Список преподавателей</h1>
      <ul>
        {teachers.map(teacher => (
          <li key={teacher.id}>
            <Link to={`/teachers/${teacher.id}`}>{teacher.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeachersList;