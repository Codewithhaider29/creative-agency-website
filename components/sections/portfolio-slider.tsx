"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

// --- DATA ---
const projects = [
  {
    id: 1,
    title: "VICTORIA",
    category: "Design",
    src: "/p-1.webp",
    tags: ["Logo", "Identity"],
    year: "2024",
  },
  {
    id: 2,
    title: "ZABANIA",
    category: "Branding",
    src: "/p-2.webp",
    tags: ["Frontend", "Guideline"],
    year: "2023",
  },
  {
    id: 3,
    title: "MOXIES",
    category: "Development",
    src: "/p-3.webp",
    tags: ["SEO", "Logo"],
    year: "2024",
  },
  {
    id: 4,
    title: "FOXTLY",
    category: "Marketing",
    src: "/p-4.webp",
    tags: ["Ads", "Social"],
    year: "2022",
  },
];

export default function VerticalProjects() {
  const containerRef = useRef<HTMLElement>(null);

  // 1. Framer Motion Scroll Logic
  // Target: Pura section track karega
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Jab section screen pe enter ho tab start
  });

  // 2. Opacity Transform based on scroll
  // 0% scroll par opacity 0, beech mein 1, aur end mein wapis 0
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-white text-black py-20 overflow-hidden"
      id="project"
    >
      {/* 3. FIXED BACKGROUND TITLE (Controlled by Motion) */}
      <motion.div
        style={{ opacity }} // Direct link to scroll progress
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-0 overflow-hidden"
      >
        <h1 className="text-[15vw] md:text-[20vw] font-bold text-black/[0.08] tracking-tighter select-none whitespace-nowrap">
          PORTFOLIO
        </h1>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* INTRO TEXT */}
        <div className="max-w-2xl mb-24 pt-10">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-black">
            Our <span className="text-neutral-400">Selected</span> <br /> Projects
          </h2>
          <p className="text-neutral-600 text-lg max-w-md font-medium">
            Explore our latest work. We craft bold digital solutions that help brands stand out.
          </p>
        </div>

        {/* LIST OF CARDS */}
        <div className="flex flex-col items-center gap-20 md:gap-32 pb-20">
          {projects.map((project, index) => (
            <ParallaxCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

// --- CARD DESIGN COMPONENT ---
const ParallaxCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: true, margin: "-10%" }}
      className="group relative w-full max-w-[800px] h-[60vh] md:h-[600px] flex-shrink-0 cursor-pointer"
    >
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-black/5 shadow-2xl shadow-black/5 bg-gray-100">
        
        {/* Image */}
        <Image
          src={project.src}
          alt={project.title}
          fill
          className="object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, 800px"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start">
            <span className="font-mono text-white/70 border border-white/20 px-3 py-1 rounded-full text-xs backdrop-blur-md">
              {project.year}
            </span>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-lg">
              <ArrowUpRight className="text-black w-5 h-5" />
            </div>
          </div>
          <div>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-sm text-neutral-200 font-medium border border-white/20 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};