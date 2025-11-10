import React from 'react'
import BannerCarousel from '../components/BannerCarousel'
import TopPartners from '../components/TopPartners'

export default function Home() {
  return (
    <div>
      <BannerCarousel />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Top Study Partners</h2>
        <TopPartners />
      </div>

      <section className="mt-10">
        <h3 className="text-xl font-semibold">How It Works</h3>
        <ol className="list-decimal ml-6 mt-3">
          <li>Create your study profile</li>
          <li>Search or filter partners</li>
          <li>Send connection requests and study together</li>
        </ol>
      </section>

      <section className="mt-8">
        <h3 className="text-xl font-semibold">Testimonials</h3>
        <div className="mt-3">“StudyMate helped me find a great study partner!” — A student</div>
      </section>
    </div>
  )
}
