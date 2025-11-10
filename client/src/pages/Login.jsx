import React from 'react'

export default function Login() {
  return (
    <div className="max-w-md mx-auto border p-6 rounded">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form>
        <input className="input input-bordered w-full mb-3" placeholder="Email" />
        <input className="input input-bordered w-full mb-3" type="password" placeholder="Password" />
        <button className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  )
}
