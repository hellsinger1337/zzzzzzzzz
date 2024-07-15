import React from 'react';
import { Link } from 'react-router-dom';
import './main.css';

const MainPage = () => {
  return (
    <div className="main-page">
      <header className="main-header">
        <h1>Добро пожаловать на студенческую вики по ЯРГУ</h1>
        <p>Хочешь узнать подробноее о вузе и преподователях?</p>
        <Link to="/about" className="main-button">Подробнее</Link>
      </header>
      <section className="features">
        <h2>Что тут есть?</h2>
        <div className="features-grid">
          <a href="/buildings" className="feature">
            <h3>Карта корпусов</h3>
            <p>Расположение всех корпусов на сайте ярославля</p>
          </a>
          <a href="/teachers" className="feature">
            <h3>Информация о преподователях</h3>
            <p>Развивающаяся база данных о преподователях с оценками пользователей</p>
          </a>

          <a href="/departments" className="feature">
            <h3>Информация о кафедрах</h3>
            <p>Когда-нибудь мы справимся и соберем инфу о кафедрах</p>
          </a>
        </div>
      </section>
      <section className="cta">
        <h2>Присоединяйся</h2>
        <p>Зарегистрируйся, чтоб остовлять комментарии и оценки преподователям</p>
        <Link to="/register" className="main-button">Регистрация</Link>
      </section>

    </div>
  );
};

export default MainPage;
