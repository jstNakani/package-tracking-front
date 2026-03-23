import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SharedFormStyles.css';
import placeVissible from '../assets/icons/user.png'
import placeNotVissible from '../assets/react.svg'

export default function Signup() {
    const [isVissible, setVissible] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        usernamename: 'any',
        name: null,
        father: null,
        mother: null,
        email: null,
        phone: 0,
        password: null
    })

    const handleChange = async (e) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
        
        console.log(currentUser);
    }

    return (
        <div className="form-group">
            <h2>Registro</h2>
            <p>Crea tu cuenta capturando tus datos</p>
            <input name='name' type="text" placeholder='Nombre(s)' onChange={handleChange} />
            <input name='father' tyle='text' placeholder='Apellido paterno' onChange={handleChange} />
            <input name='mother' tyle='text' placeholder='Apellido materno' onChange={handleChange} />
            <input name='email' type="email" placeholder="Correo electrónico" onChange={handleChange} />
            <input name='phone' type='tel' placeholder='Numero telefonico (opcional)' onChange={handleChange} />
            <input name='password' type={isVissible ? 'text' : 'password'} placeholder="Contraseña" onChange={handleChange} />
            <img src={isVissible ? placeVissible : placeNotVissible} onClick={() => setVissible(!isVissible)} id='toggle_view'></img>
            <button className="btn-primary">Registrarme</button>
            <p className="switch-text">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    );
}