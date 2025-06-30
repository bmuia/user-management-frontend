import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import Features from './Features'
import Security from './Security'
import Footer from './Footer'
function LandingPage() {
  return (
    <div className="pt-10">
      <Navbar />
      <HeroSection />
      <Features />
      <Security />
      <Footer />
    </div>
  )
}

export default LandingPage