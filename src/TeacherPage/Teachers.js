import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Teachers.css'
import {getTeachers} from '../services/api'
const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getTeachers();
        if (!response.status===200) {
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

  useEffect(() => {
    const filterTeachers = () => {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(lowercasedQuery) ||
        Object.values(teacher).some(value =>
          String(value).toLowerCase().includes(lowercasedQuery)
        )
      );
      setFilteredTeachers(filtered);
    };

    filterTeachers();
  }, [searchQuery, teachers]);

  return (
    <div className='container'>
      <h1>Список преподавателей</h1>
      <Link to='/addTeacher' className="main-button">Добавить преподавателя</Link>
      <input
        type="text"
        placeholder="Поиск преподавателей..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <ul>
        {filteredTeachers.map(teacher => (
          <li key={teacher.id}>
            <Link to={`/teachers/${teacher.id}`}>{teacher.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeachersList;