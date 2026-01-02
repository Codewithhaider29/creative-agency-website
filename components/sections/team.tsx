"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowUpRight, Linkedin, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

const team = [
  {
    name: "Alex Chen",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Sarah Johnson",
    role: "Brand Strategist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Marcus Webb",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Elena Rodriguez",
    role: "UX/UI Designer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  },
];

export default function TeamEditorial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Scroll Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create a spring for smoother parallax
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Odd columns go up, Even columns go down (Subtle Parallax)
  const yOdd = useTransform(smoothProgress, [0, 1], [0, -50]);
  const yEven = useTransform(smoothProgress, [0, 1], [0, 50]);

  return (
    <section ref={containerRef} className="w-full py-32 bg-white text-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-neutral-200 pb-8">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-4"
            >
              The Minds Behind
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-black"
            >
              OUR TEAM
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 text-neutral-500"
          >
            <p className="text-right text-sm max-w-[200px] leading-relaxed hidden md:block">
              We are a collective of creators shaping the digital future.
            </p>
            <div className="h-12 w-[1px] bg-neutral-200 hidden md:block" />
            <span className="text-4xl font-light">04</span>
          </motion.div>
        </div>

        {/* --- GRID WITH SPOTLIGHT EFFECT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => {
             // Apply parallax based on index (Even/Odd)
             const isEven = index % 2 === 0;
             return (
               <motion.div
                 key={index}
                 style={{ y: isEven ? yEven : yOdd }} // Apply Parallax
                 onMouseEnter={() => setHoveredIndex(index)}
                 onMouseLeave={() => setHoveredIndex(null)}
                 className={`relative transition-all duration-500 ease-in-out ${
                   hoveredIndex !== null && hoveredIndex !== index 
                     ? "opacity-40 blur-[2px] scale-95" // Dim others
                     : "opacity-100 blur-0 scale-100"   // Focus current
                 }`}
               >
                 <TeamCard member={member} />
               </motion.div>
             );
          })}
        </div>

      </div>
    </section>
  );
}

// --- CARD COMPONENT ---
function TeamCard({ member }: { member: any }) {
  return (
    <div className="group relative w-full cursor-pointer">
      
      {/* 1. IMAGE AREA */}
      <div className="relative aspect-[3/4.2] overflow-hidden bg-neutral-100 mb-6">
        
        {/* Image Scale Effect */}
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-1000 ease-[0.25,1,0.5,1] group-hover:scale-110 grayscale group-hover:grayscale-0"
        />

        {/* Glassmorphism Social Pill (Slides Up) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
          <div className="flex items-center justify-center gap-6 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full shadow-2xl">
            <SocialLink icon={<Twitter size={18} />} />
            <div className="w-[1px] h-4 bg-white/20" />
            <SocialLink icon={<Linkedin size={18} />} />
            <div className="w-[1px] h-4 bg-white/20" />
            <SocialLink icon={<Instagram size={18} />} />
          </div>
        </div>
        
        {/* Dark Gradient Overlay on Hover for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* 2. TEXT INFO (Editorial Style) */}
      <div className="flex flex-col gap-1 px-1">
        
        {/* Role Top (Mono) */}
        <div className="flex items-center justify-between overflow-hidden">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            {member.role}
            </span>
            {/* Arrow slides in from left */}
            <div className="-translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                 <ArrowUpRight className="w-4 h-4 text-black" />
            </div>
        </div>

        {/* Name Bottom (Bold) */}
        <h3 className="text-2xl font-bold text-black mt-2 relative inline-block">
          {member.name}
          {/* Underline Animation */}
          <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
        </h3>
      </div>
    </div>
  );
}

// Social Icon Helper
function SocialLink({ icon }: { icon: React.ReactNode }) {
    return (
        <a href="#" className="hover:text-orange-400 hover:scale-110 transition-all duration-300">
            {icon}
        </a>
    )
}