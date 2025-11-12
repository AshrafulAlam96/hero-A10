import React from 'react'
import HeroBanner from '../components/HeroSlider'
import TopPartners from '../components/TopPartners'
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Top Study Partners</h2>
        <TopPartners />
      </div>

      <section className="mt-10">
        {/* How It Works */}
        <HowItWorks />
      </section>

      <section className="mt-8 text-center">
        {/* Testimonials */}
        <Testimonials />
      </section>
    </div>
  )
}
