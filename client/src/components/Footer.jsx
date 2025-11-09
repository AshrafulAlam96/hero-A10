import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-base-200 mt-8">
      <div className="container mx-auto px-4 py-6 text-center">
        <h3 className="font-bold text-lg">StudyMate</h3>
        <p className="mt-2 text-sm">Find your perfect study partner. Connect, learn, succeed.</p>
        <div className="mt-3 text-xs">© {new Date().getFullYear()} StudyMate</div>
      </div>
    </footer>
  )
}
