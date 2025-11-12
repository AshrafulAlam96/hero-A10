import React from 'react'
import HeroBanner from '../components/HeroSlider'
import TopPartners from '../components/TopPartners'
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div>

      {/* Hero / Banner */}
      <HeroBanner />

      {/* Top Study Partners */}
        <TopPartners />

      
        {/* How It Works */}
        <HowItWorks />

        {/* Testimonials */}
      <Testimonials />
      
    </div>
  )
}
