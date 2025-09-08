import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Features from "./Features";
import UseCases from "./UseCases";
import Team from "./Team";
import Contact from "./Contact";
import Footer from "./Footer";

function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />

      {/* Content with yellow shape */}
      <div className="relative overflow-hidden">
        {/* Yellow glowing diamond */}
        <div className="absolute top-[-6rem] left-[20%] h-120 w-120
                        bg-yellow-300 opacity-40 blur-3xl 
                        rounded-3xl rotate-45"></div>

   
        <main className="relative z-10">
          <HeroSection />
          <Features />
          <UseCases />
          <Team />
          <Contact />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
