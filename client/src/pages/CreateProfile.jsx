import React, { useState } from 'react'
import { createPartner } from '../services/api'
import { useAuth } from '../context/AuthProvider'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

export default function CreateProfile() {
  const { user } = useAuth()
  const [form, setForm] = useState({
    name: user?.displayName || '',
    profileimage: '',
    subject: '',
    studyMode: 'Online',
    availabilityTime: '',
    location: '',
    experienceLevel: 'Beginner',
    rating: 0,
    partnerCount: 0,
    email: user?.email || '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return toast.error('Please log in first')
    try {
      setLoading(true)
      await createPartner({ ...form, email: user.email })
      toast.success('Profile created successfully')
      setForm({ ...form, subject: '', availabilityTime: '', location: '' })
    } catch (err) {
      toast.error('Error creating profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" value={form.name} onChange={handleChange} className="input input-bordered w-full" placeholder="Full name" required />
        <input name="profileimage" value={form.profileimage} onChange={handleChange} className="input input-bordered w-full" placeholder="Profile image URL" />
        <input name="subject" value={form.subject} onChange={handleChange} className="input input-bordered w-full" placeholder="Subject" required />
        <select name="studyMode" value={form.studyMode} onChange={handleChange} className="select select-bordered w-full">
          <option>Online</option><option>Offline</option>
        </select>
        <input name="availabilityTime" value={form.availabilityTime} onChange={handleChange} className="input input-bordered w-full" placeholder="Availability" />
        <input name="location" value={form.location} onChange={handleChange} className="input input-bordered w-full" placeholder="Location" />
        <select name="experienceLevel" value={form.experienceLevel} onChange={handleChange} className="select select-bordered w-full">
          <option>Beginner</option><option>Intermediate</option><option>Expert</option>
        </select>
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? 'Saving...' : 'Create Profile'}
        </button>
      </form>
    </div>
  )
}
