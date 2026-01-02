"use client";

import { useRef, useEffect, useState } from "react";
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useSpring, 
  useAnimationFrame 
} from "framer-motion";

const cards = [
  {
    id: 1,
    url: "/1-h.webp",
    title: "Abstract Liquid",
    category: "3D RENDER",
  },
  {
    id: 2,
    url: "/2-h.webp",
    title: "Molecular Bond",
    category: "SCIENCE",
  },
  {
    id: 3,
    url: "/3-h.webp",
    title: "Geometric Shapes",
    category: "ARCHITECTURE",
  },
  {
    id: 4,
    url: "/4-h.webp",
    title: "Nature & Life",
    category: "PHOTOGRAPHY",
  },
  {
    id: 5,
    url: "/5-h.webp",
    title: "Neon Cyberpunk",
    category: "DIGITAL ART",
  },
  {
    id: 6,
    url: "/6-h.webp",
    title: "Urban Decay",
    category: "STREET",
  },
  {
    id: 7,
    url: "/7-h.webp",
    title: "Future Grid",
    category: "TECH",
  },
  {
    id: 8,
    url: "/8-h.webp",
    title: "Minimal Space",
    category: "MINIMAL",
  },
  {
    id: 9,
    url: "/9-h.webp",
    title: "Color Waves",
    category: "ABSTRACT",
  },
  {
    id: 10,
    url: "/10-h.webp",
    title: "Dark Matter",
    category: "CONCEPT",
  },
  {
    id: 11,
    url: "/11-h.webp",
    title: "Light & Shadow",
    category: "ART DIRECTION",
  },
];


// --- Duplicate cards for Infinite Loop ---
const displayCards = [...cards, ...cards]; 

export default function ImageGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false); // Track dragging state

  // Motion values
  const x = useMotionValue(0);
  
  // Progress bar logic (Adjusted for infinite loop visual)
  const progress = useTransform(x, [-width / 2, 0], ["100%", "0%"]);
  
  // Skew effect
  const xVelocity = useMotionValue(0);
  const skewVelocity = useTransform(xVelocity, [-1000, 1000], [10, -10]);
  const skewSpring = useSpring(skewVelocity, { stiffness: 400, damping: 30 });

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      // Calculate total scrollable width
      setWidth(contentRef.current.scrollWidth - containerRef.current.offsetWidth);
    }
  }, []);

  // --- AUTO SCROLL LOGIC ---
  useAnimationFrame((t, delta) => {
    if (!isDragging && width > 0) {
      const moveBy = 0.5; // Speed of auto scroll (Adjust this number to change speed)
      let newX = x.get() - moveBy;

      // Infinite Loop Reset:
      // Jab hum aadha scroll kar lein (original cards khatam ho jayein), wapis 0 par jump karo
      // This creates the seamless loop illusion
      if (newX <= -(width / 2)) {
         newX = 0;
      }
      
      x.set(newX);
    }
  });

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  const handleDrag = () => {
    xVelocity.set(x.getVelocity());
  };

  return (
    <section className=" py-24 overflow-hidden min-h-screen flex flex-col justify-center">
      
     

      {/* Draggable Carousel Area */}
      <div 
        ref={containerRef} 
        className="w-full relative cursor-grab active:cursor-grabbing z-10"
      >
        <motion.div
          ref={contentRef}
          style={{ x, skewX: skewSpring }}
          drag="x"
          // Constraints set to allow dragging through the duplicated list
          dragConstraints={{ right: 0, left: -width }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrag={handleDrag}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-8 px-6 md:px-20 w-max"
        >
          {/* Mapping over doubled array */}
          {displayCards.map((card, index) => (
            <GalleryItem 
                // Using index in key because IDs are duplicated
                key={`${card.id}-${index}`} 
                card={card} 
                index={index % cards.length} // Show original index number
            />
          ))}
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="container mx-auto px-6 md:px-20 mt-16">
        <div className="w-full h-[1px] bg-neutral-800 relative overflow-hidden">
            <motion.div 
                style={{ width: progress }}
                className="absolute right-0 top-0 h-full bg-white"
            />
        </div>
      </div>
    </section>
  );
}

function GalleryItem({ card, index }: { card: any, index: number }) {
  return (
    <div className="relative group h-[400px] w-[300px] md:h-[500px] md:w-[400px]">
      
      <div className="w-full h-full overflow-hidden bg-neutral-900 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out">
        <img
          src={card.url}
          alt={card.title}
          className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-in-out"
          draggable="false"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end">
        <div className="overflow-hidden mb-2">
            <span className="block text-xs font-mono text-neutral-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                {String(index + 1).padStart(2, '0')}
            </span>
        </div>

        <h3 className="text-2xl text-white font-medium tracking-tight mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75">
          {card.title}
        </h3>

        <div className="w-full h-[1px] bg-neutral-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out delay-100 my-3" />

        <div className="overflow-hidden">
            <p className="text-xs font-bold text-neutral-300 uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out delay-150">
                {card.category}
            </p>
        </div>
      </div>
    </div>
  );
}