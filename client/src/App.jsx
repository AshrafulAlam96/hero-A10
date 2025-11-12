import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MyConnections from "./pages/MyConnections";
import PrivateRoute from './routes/PrivateRoute'   // ✅ Add this import

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import FindPartners from './pages/FindPartners'
import Profile from "./pages/Profile"
import CreateProfile from "./pages/CreateProfile"
import Dashboard from "./pages/Dashboard";

import Login from './pages/Login'
import Register from './pages/Register'


export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* ✅ Protected route */}
          <Route
            path="/my-connections"
            element={
              <PrivateRoute>
                <MyConnections />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
          />

          <Route path="/find-partners" element={<FindPartners />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-profile" element={<CreateProfile />} />


          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="*"
            element={<div className="p-8 text-center text-xl">404 — Not Found</div>}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
