import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MyConnections from "./pages/MyConnections";
import Home from './pages/Home'
import FindPartners from './pages/FindPartners'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-connections" element={<MyConnections />} />
          <Route path="/find-partners" element={<FindPartners />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div className="p-8 text-center text-xl">404 — Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
