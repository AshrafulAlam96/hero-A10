import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import AuthProvider from "./context/AuthContext";
import { Toaster } from 'react-hot-toast'   // ✅ Import toast container

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster position="top-center" reverseOrder={false} /> {/* ✅ Added here */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
