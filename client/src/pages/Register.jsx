import React from 'react'

export default function Register() {
  return (
    <div className="max-w-md mx-auto border p-6 rounded">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form>
        <input className="input input-bordered w-full mb-3" placeholder="Name" />
        <input className="input input-bordered w-full mb-3" placeholder="Email" />
        <input className="input input-bordered w-full mb-3" placeholder="Photo URL" />
        <input className="input input-bordered w-full mb-3" type="password" placeholder="Password" />
        <button className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  )
}
