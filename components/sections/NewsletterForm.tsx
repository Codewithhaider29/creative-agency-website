"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="w-full px-4 py-12 md:py-20 flex justify-center bg-white">
      {/* Black Container Card */}
      <div className="relative w-full max-w-[1200px] bg-black rounded-[2.5rem] overflow-hidden min-h-[500px] flex items-center">
        
        {/* Left Side: Content */}
        <div className="relative z-10 w-full lg:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col items-start justify-center">
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white leading-[0.9] mb-6"
          >
            LET'S CREATE
            <br />
            TOGETHER
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-md mb-10 font-light"
          >
            Collaborate with our team to craft designs that inspire and deliver real results.
          </motion.p>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="/contact" 
              className="bg-[#ff4400] hover:bg-[#ff5500] text-white text-lg font-medium py-4 px-8 rounded-full transition-colors duration-300 inline-block"
            >
              Get started
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Abstract Building Image */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 h-full z-0 opacity-80 lg:opacity-100">
           {/* Note: Replace the src below with your specific golden building image.
              I have used a similar abstract architectural placeholder.
           */}
          <Image
            src="/n-i.webp" 
            alt="Abstract Architecture"
            fill
            className="object-cover object-right"
            priority
          />
          
          {/* Gradient Overlay to fade image into black on the left side */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent lg:via-black/20" />
        </div>

      </div>
    </section>
  );
}