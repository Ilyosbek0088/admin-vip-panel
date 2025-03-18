import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'  // <- Make sure this is imported!
import Dashboard from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
)
