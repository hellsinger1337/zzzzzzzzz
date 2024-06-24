import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './about.css'
import CommitsComponent from '../commit/CommitComponent';
const AboutProject = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authorsData = [
          {
            Id: 1,
            Name: "Крылов Савелий",
            PictureUrl: "https://sun9-72.userapi.com/impg/z2svf8FdvuDKfqTK12clO8lJhzRwlsW8tdDr_Q/_gRelGRw7No.jpg?size=2560x1707&quality=95&sign=b0ff0e6e6b50330bc6d8a7f290362608&type=album",
            Description: "Милый мальчик титанчик в доте",
            TelegramLink: "https://t.me/hellsinger1337",
            TypeAuthor: 1
          }
        ];
        setAuthors(authorsData);
      } catch (error) {
        console.error('Ошибка при получении данных об авторах:', error);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className='container'>
      <h1>О проекте</h1>
      <p>
        Наш проект представляет собой вики-платформу, на которой собирается и систематизируется информация о преподавателях вуза.
        Цель проекта - предоставить студентам удобный инструмент для выбора преподавателей и подготовки к занятиям.
        Здесь вы можете найти подробные описания, отзывы и рекомендации о каждом преподавателе, что поможет вам сформировать максимально полное представление
        и сделать обоснованный выбор. Мы стремимся сделать процесс обучения более комфортным и продуктивным для каждого студента.
      </p>
      <h2>Наши авторы</h2>
      <div className='authorsBlock'>
        {authors.map(author => (
          <div key={author.Id} className='authorCard'>
            <img src={author.PictureUrl} alt={author.Name} className='authorPicture' />
            <h3 className='authorName'>{author.Name}</h3>
            <p className='authorDescription'>{author.Description}</p>
            <a href={author.TelegramLink} className='authorTelegramLink'><i className='telegramIcon'></i> Связаться в Telegram</a>
            <p className='authorSpecialization'>Специализация: {author.TypeAuthor === 0 ? 'Бэкэндер' : 'Фронтэндер'}</p>
          </div>
        ))}
      </div>
      <CommitsComponent />
    </div>
  );
};

export default AboutProject;