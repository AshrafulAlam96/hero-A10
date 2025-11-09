import React from 'react'

const slides = [
  { title: 'Find study partners near you', desc: 'Connect by subject and availability.' },
  { title: 'Study together online or offline', desc: 'Choose the mode that fits you.' },
  { title: 'Improve learning outcomes', desc: 'Practice, review, and succeed.' },
]

export default function BannerCarousel() {
  return (
    <div className="bg-base-200 p-6 rounded">
      <div className="space-y-4">
        {slides.map((s, i) => (
          <div key={i} className="p-6 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
