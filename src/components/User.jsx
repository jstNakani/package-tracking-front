import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SharedFormStyles.css';

export default function User() {
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

    const remove = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    };

    return (
        <div className='form-group'>
            <p>Placeholder usuario</p>
            <button className='btn-primary' onClick={remove}>Sign out</button>
        </div>
    )
}
