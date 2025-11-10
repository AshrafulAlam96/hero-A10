import React from 'react'
import { Link } from 'react-router-dom'

const dummy = [
  { id: '1', name: 'Aisha Rahman', subject: 'Mathematics', rating: 4.8, profileimage: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: '2', name: 'Rafi Ahmed', subject: 'Physics', rating: 4.7, profileimage: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '3', name: 'Mina Khan', subject: 'English', rating: 4.6, profileimage: 'https://randomuser.me/api/portraits/women/22.jpg' },
]

export default function TopPartners() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {dummy.map(p => (
        <div key={p.id} className="card bg-white shadow p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full">
              <img src={p.profileimage} alt="" className='w-12 h-12 bg-gray-200 rounded-full' />
            </div>
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm">{p.subject}</div>
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div>⭐ {p.rating}</div>
            <Link to={`/partner/${p.id}`} className="btn btn-sm">View Profile</Link>
          </div>
        </div>
      ))}
    </div>
  )
}
