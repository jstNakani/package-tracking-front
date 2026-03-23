import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

// Just don't touch this, it renders the app, nothing more, nothing less.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <App />
    </div>
  </StrictMode>,
)
