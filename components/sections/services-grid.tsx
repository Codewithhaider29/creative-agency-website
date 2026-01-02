"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react"; 

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Branding",
    description: "We craft a strong and consistent brand identity that captures your values and tells your story.",
    tags: ["Logo", "Identity", "Guideline"],
    src: "/s-1.webp", 
    color: "#F3F4F6" 
  },
  {
    id: 2,
    title: "Website",
    description: "We design and build modern, responsive, and user-friendly websites that drive conversions.",
    tags: ["Frontend", "Responsive", "WebGL"],
    src: "/s-2.webp",
    color: "#E5E7EB" 
  },
  {
    id: 3,
    title: "Creative",
    description: "We produce compelling visuals and storytelling assets that engage audiences across all platforms.",
    tags: ["Motion", "Video", "Photo"],
    src: "/s-3.webp",
    color: "#D1D5DB" 
  },
  {
    id: 4,
    title: "Strategy",
    description: "We build smart digital strategies that connect your brand with the right audience at the right time.",
    tags: ["SEO", "Social", "Ads"],
    src: "/s-4.webp",
    color: "#9CA3AF" 
  },
];

interface CardContentProps {
  title: string;
  description: string;
  src: string;
  tags: string[];
  color: string;
  index: number;
}


// --- 1. TEXT COMPONENT ---
const ScrollFloatText = () => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const text = "We craft bold digital solutions through strategy, design, development, and communication.";
  const words = text.split(" ");

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const wordSpans = el.querySelectorAll<HTMLSpanElement>(".word-span");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordSpans,
        { opacity: 0.2, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="container mx-auto px-6 md:px-12 py-32 md:py-48" id="service">
      <div className="max-w-6xl" ref={textRef}>
        <h2 className="text-5xl md:text-8xl font-semibold leading-[0.95] tracking-tighter flex flex-wrap gap-x-4 gap-y-2 text-neutral-900">
          {words.map((word, i) => (
            <span key={i} className="word-span inline-block will-change-transform">{word}</span>
          ))}
        </h2>
        <div className="mt-12 h-[1px] w-full bg-neutral-200" />
      </div>
    </div>
  );
};

// --- 2. MAIN COMPONENT (FIXED) ---
export default function ServicesScrollStack() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 10%", // FIX: Top se 10% gap (Header ke liye jagah)
          pin: true,
          pinSpacing: false,
        });

        const nextCard = cards[i + 1];
        if (nextCard) {
          gsap.to(card, {
            scale: 0.92,
            opacity: 0,
            filter: "blur(20px)",
            y: -50,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: nextCard,
              start: "top bottom",
              end: "top 10%", // FIX: Match start position
              scrub: true,
            },
          });
        }
      });
    }, containerRef); 

    return () => ctx.revert(); 
  }, []);

  return (
    <section className="bg-white text-black min-h-screen">
      <ScrollFloatText />
      <div ref={containerRef} className="pb-32 relative"> 
        {services.map((service, index) => (
           <div 
             key={service.id} 
             // FIX: Removed 'sticky top-0' to let GSAP handle pinning without conflict
             className="stack-card h-screen flex items-center justify-center"
           >
             <CardContent {...service} index={index} />
           </div>
        ))}
      </div>
    </section>
  );
}

// --- 3. CARD CONTENT UI ---
const CardContent = ({
  title,
  description,
  src,
  tags,
  color,
  index,
}: CardContentProps) => {
  return (
    <div 
      style={{ backgroundColor: color }} 
      className="relative flex flex-col md:flex-row w-[95%] md:w-[1300px] h-[75vh] md:h-[650px] rounded-[2.5rem] border border-neutral-900/5 overflow-hidden shadow-2xl shadow-neutral-900/10 group"
    >
      {/* NOISE TEXTURE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")` }} 
      />

      {/* LEFT: Content */}
      <div className="flex flex-col justify-between p-8 md:p-16 md:w-[45%] h-full relative z-10">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-black/10 pb-8">
           <span className="font-mono text-sm tracking-widest text-neutral-500">
             (0{index + 1})
           </span>
           <div className="h-12 w-12 rounded-full border border-black/10 flex items-center justify-center bg-white/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
              <ArrowUpRight className="w-5 h-5 opacity-70" />
           </div>
        </div>

        {/* Main Text */}
        <div className="py-8">
           <h2 className="text-6xl md:text-8xl font-semibold tracking-tighter mb-6 text-neutral-800">
            {title}
           </h2>
           <p className="text-lg md:text-xl text-neutral-600 font-normal leading-relaxed max-w-md">
            {description}
           </p>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-3 mt-auto">
          {tags.map((tag, idx) => (
            <span key={idx} className="px-5 py-2.5 bg-white/40 backdrop-blur-md rounded-full text-xs font-mono uppercase tracking-wider border border-black/5 text-neutral-700 hover:bg-white transition-colors duration-300 cursor-default">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT: Image */}
      <div className="relative md:w-[55%] h-full p-4 md:p-6">
        <div className="w-full h-full overflow-hidden rounded-[2rem] relative">
          <img 
            src={src} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] rounded-[2rem] pointer-events-none" />
        </div>
      </div>
    </div>
  )
}