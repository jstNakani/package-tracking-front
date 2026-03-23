import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SharedFormStyles.css';
import loadingAnim from '../assets/icons/login/loading_anim.gif'
import { useNavigate } from 'react-router-dom';

import placeIsVissible from '../assets/icons/user.png'
import placeIsNotVissible from '../assets/react.svg'

export default function Login() {
  const navigate = useNavigate()
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/

  const handleChange = async (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    setErrorMessage(null);
  }

  const [currentUser, setCurrentUser] = useState({
    email: null,
    password: null
  });

  const [isVissible, setVissible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const login = async (e) => {
    setLoading(true);
    let data = {
      message: null
    };
    try {
      if (currentUser.email == null || currentUser.password == null) {
        data.message = 'Password or email cannot be empty.'
        throw new Error();
      }
      if (!emailRegex.test(currentUser.email)){
        data.message = 'Invalid Email'
        throw new Error();
      }
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentUser.email, password: currentUser.password })
      });

      data = await response.json();
      if (response.status != 200) {
        throw new Error(data.message);
      }
      localStorage.setItem('token', data.userToken);
      setLoading(false);
      navigate('/');
      window.location.reload();
    } catch (error) {
      setLoading(false);
      setErrorMessage(data.message);
    }
  };

  return (
    <div className="form-group">
      <h2>Inicia Sesión</h2>
      <p>Bienvenido de nuevo al sistema</p>
      <input name='email' placeholder='example@domain.com' onChange={handleChange}></input>
      <input className='user_input' name='password' type={isVissible ? null : 'password'} placeholder='Password' onChange={handleChange} />
      <img src={isVissible ? placeIsVissible : placeIsNotVissible} id='toggle_view' onClick={() => setVissible(!isVissible)} />
      <button className="btn-primary" onClick={login} type='submit'>Ingresar</button>
      {errorMessage ? <h1 id='error'>{errorMessage}</h1> : null}
      {isLoading ? <img id='loading' src={loadingAnim}></img> : null}
      <p className="switch-text">
        ¿No tienes cuenta? <Link to="/signup">Regístrate aquí</Link>
      </p>
    </div>
  );
}