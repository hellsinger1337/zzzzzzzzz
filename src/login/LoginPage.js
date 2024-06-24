// LoginPage.js
import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';
import './LoginPage.css';
import { login } from '../services/api'

const LoginPage = () => {
    const vantaRef = useRef(null);
  useEffect(() => {
    let vantaEffect = CLOUDS({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      skyColor: 0x0000,
      cloudColor: 0xbbbbbb,
      cloudShadowColor: 0xb1b1b1,
      sunColor: 0xff9900,
      sunGlareColor: 0xff9900,
      sunlightColor: 0xff9900
    });
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await login(username, password);
          localStorage.setItem('token', response.data.access_token);
      } catch (error) {
          console.error('Error logging in', error);
      }
  };


  return (
    <div className="login-container" ref={vantaRef}>
        
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">НУ ПРИВЕТ, АНОН</h2>
        <div className="input-container">
          <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
        </div>
        <div className="input-container">
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
          />
        </div>
        <button
          type="submit"
          className="login-button"
          disabled={!username || !password}
        >
          Login
        </button>
        <a href="/register">register</a>
      </form>
    </div>
  );
};

export default LoginPage;
