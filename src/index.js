import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TeachersList from './TeacherPage/Teachers.js';
import TeacherPage from './TeacherPage/TeacherPage.js';
import UserProfile from './Profile/UserProfile';
import YSUMap from './MapComponent/MapComponent.js';
import AboutProject from './about/about.js';
import MainPage from './main.js'
import reportWebVitals from './reportWebVitals';
import LoginPage from './login/LoginPage'; 
import RegisterPage from './login/RegisterPage'; 
import AddTeacher from './addTeacher/AddTeacher.js'
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './admin/AdminPanel.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>    
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/addTeacher" element={<AddTeacher/>} />
        <Route path="/teachers" element={<TeachersList />} />
        <Route path="/teachers/:id" element={<TeacherPage />} />
        <Route path="/buildings" element={<YSUMap />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/departments" element={<div>Страница кафедр</div>} />
        <Route path="/about" element={<AboutProject />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();