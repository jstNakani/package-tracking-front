import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Tracking from './components/Tracking';
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User'
import './styles/App.css';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: null
  })

  useEffect(() => {
    const checkToken = localStorage.getItem('token');
    if (checkToken) {
      setLoggedIn(true);
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    const uToken = localStorage.getItem('token')
    const response = await fetch('http://localhost:4000/dashboard', {
      headers: {
        'Authorization': `Bearer ${uToken}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    let username = data.data.username;
    const userArr = []
    for (let i in username) {
      if (i == 0) {
        userArr[i] = username[i];
        continue;
      }
      userArr[i] = username[i].toLowerCase();
    }
    username = userArr.join('');
    setCurrentUser({ name: username });
  };

  return (
    <div className="app-layout">
      <nav className="top-navbar">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>SAIP</Link>

        <div className="nav-actions">

          {!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/signup' ? (<Link to='/login'>
            <button className='btn-login-nav'>Login</button></Link>)
            : isLoggedIn && location.pathname !== '/user' ? (<Link to='/user'>
              <button className='btn-login-nav'>{currentUser.name}</button>
            </Link>)
              : null}

          <div className="dropdown">
            <button className="dropbtn">⋮</button>
            <div className="dropdown-content">
              <a href="#ayuda">Ayuda</a>
              <a href="#soporte">Soporte Técnico</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="center-wrapper">
        <div className="auth-card">
          <Routes>
            <Route path="/" element={<Tracking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/user' element={<User />} />
          </Routes>
        </div>

        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">SAIP</h1>
            <p className="hero-subtitle">Sistema Profesional de Logística Integrada</p>
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
              alt="Almacén Logístico Profesional SAIP"
              className="hero-image"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;