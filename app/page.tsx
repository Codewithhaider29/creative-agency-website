"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

// --- Import the separate Preloader ---
import Preloader from "@/components/preloader" 

// --- Section Imports ---
import HeroSection from "@/components/sections/hero"
import NavigationSection from "@/components/sections/navigation"
import CardsSlider from "@/components/sections/cards-slider"
import About from "@/components/sections/about"
import ServicesGrid from "@/components/sections/services-grid"
import PortfolioSlider from "@/components/sections/portfolio-slider"
import TeamSection from "@/components/sections/team"
import NewsletterForm from "@/components/sections/NewsletterForm" 
import FooterSection from "@/components/sections/footer"

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 2.5 seconds delay for loading animation
    const timer = setTimeout(() => {
      setIsLoading(false)
      window.scrollTo(0, 0)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full bg-white">
      <AnimatePresence mode="wait">
        
        {/* Check Loading State */}
        {isLoading ? (
          <Preloader key="preloader" />
        ) : (
          <motion.main
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full overflow-hidden"
          >
            <NavigationSection />
            <HeroSection />
            <CardsSlider />
            <About />
            <ServicesGrid />
            <PortfolioSlider />
            <TeamSection />
            <NewsletterForm />
            <FooterSection />
          </motion.main>
        )}
        
      </AnimatePresence>
    </div>
  )
}