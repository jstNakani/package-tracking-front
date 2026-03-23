import React from 'react'

export default function Landing() {

  // Fetch user data from the backend using the token stored in localStorage
  // I still don't know if we really need this here, keep it for now.
  const fetchUser = async () => {
    const uToken = localStorage.getItem('token')
    const response = await fetch('http://localhost:4000/dashboard', {
      headers: {
        'Authorization': `Bearer ${uToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
  };

  // This should be our main page, placeholder just to know if it actually works, we can remove it later and replace it with the actual landing page.
  return (
    <div>
      <p>somethi</p>
    </div>
  )
}
