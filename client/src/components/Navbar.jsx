import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-blue-950 shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">StudyMate</Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/find-partners" className="hover:text-primary">Find Partners</Link>
          <Link to="/login" className="btn btn-ghost">Login</Link>
          <Link to="/register" className="btn btn-primary">Register</Link>
        </div>
      </div>
    </nav>
  )
}
