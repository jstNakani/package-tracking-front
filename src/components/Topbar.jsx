import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Topbar.css'
import userIcon from '../assets/icons/user.png'

export default function Topbar() {
  // Username, we don't need the whole user object, just the name.
  const [currentUser, setCurrentUser] = useState({
    name: null
  })
  const navigate = useNavigate();

  // Logged in status
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Loads a token from the storage, if it exists, the user is logged in.
  // Runs at the start of the app.
  useEffect(() => {
    const checkToken = localStorage.getItem('token');
    if (checkToken) {
      setLoggedIn(true);
      fetchUser();
    }
  }, []);

  // Fetches the user data from the backend, using the token for authentication.
  const fetchUser = async () => {
    // Assuming there's a token, maybe we could check for it here again, but we can assume it's there since we only call this function if the token exists.
    const uToken = localStorage.getItem('token')
    // Keep in mind, backend returns the whole user object, but we only need the username, so we can just extract that and set it to the state.
    const response = await fetch('http://localhost:4000/dashboard', {
      headers: {
        'Authorization': `Bearer ${uToken}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    let username = data.data.username;
    // The whole username is uppercased, we want to make it look nicer, so we can just lowercase the rest of the letters and keep the first letter uppercase.
    // This doesn't looks very nice, but it works, we can optimize it later if we want to.
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

  // Handles the log in status, if the user is not logged in, it redirects to the login page, if the user is logged in, it redirects to the user profile page.
  // This way we can reuse the same button for both log in and log out, depending on the user's status.
  const handleLogStatus = () => {
    if (!isLoggedIn) {
      navigate('/Login');
    } else {
      navigate('/User')
    }
  };

  // The top bar, it shows a welcome message with the user's name if they are logged in, and a default message if they are not. It also has a button that redirects to the login page or the user profile page depending on the user's status.
  return (
    <div id='top_bar'>
      <p id='wel_bar'>Welcome, {currentUser ? currentUser.name || 'Guest' : 'Guest'}!</p>
      <button id='log_bar' onClick={handleLogStatus}>
        <img src={userIcon} alt='Default user icon' id='icon_bar' />
      </button>
    </div>
  )
}

