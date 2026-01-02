"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative w-full min-h-[80vh] bg-white text-black px-6 md:px-20 py-24 flex flex-col justify-between"
      id="about"
    >
      
    

      {/* GRID LAYOUT FOR HEADLINE & PARAGRAPH */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-0 h-full items-end">
        
        {/* 2. LARGE HEADLINE (Left Side - Spanning 8 columns) */}
        <div className="md:col-span-8 flex flex-col justify-center">
          <h2 className="text-[11vw] md:text-[5.5rem] leading-[0.9] font-medium tracking-tighter text-[#1a1a1a]">
            <MaskedLine text="Where ideas meet" delay={0.2} />
            <MaskedLine text="impact crafting stories" delay={0.3} />
            <MaskedLine text="that inspire designing" delay={0.4} />
            <MaskedLine text="with purpose" delay={0.5} />
          </h2>
        </div>

        {/* 3. PARAGRAPH (Right Side - Spanning 4 columns, Pushed to bottom) */}
        <div className="md:col-span-4 flex flex-col justify-end items-start md:pl-10 pb-2">
           <RevealText delay={0.8}>
            <p className="text-base md:text-lg text-gray-800 leading-relaxed font-normal max-w-sm">
              Founded on integrity and excellence, our company has always believed that success comes from consistency and dedication.
            </p>
           </RevealText>
        </div>

      </div>
    </section>
  );
}

// --- SUBCOMPONENT: Masked Line Animation (Text slides up) ---
function MaskedLine({ text, delay }: { text: string, delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: "0%" } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: delay }}
      >
        {text}
      </motion.div>
    </div>
  );
}

// --- SUBCOMPONENT: Simple Fade Reveal ---
function RevealText({ children, delay }: { children: React.ReactNode, delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: delay }}
    >
      {children}
    </motion.div>
  );
}