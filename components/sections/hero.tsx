"use client";

import { useRef, useState, useEffect } from "react";
import { 
  motion, 
  useTransform, 
  useMotionValue, 
  AnimatePresence 
} from "framer-motion";

const cardData = [
  {
    id: 1,
    src: "/1-hero.webp",
    alt: "Abstract Fluid",
    className: "w-52 h-52 md:w-[22rem] md:h-[22rem] top-[5%] left-[5%] rotate-[-12deg]",
    zIndex: 20, // Relative inside container
    speed: 1.5,
  },
  {
    id: 2,
    src: "/2-hero.webp",
    alt: "Glass Object",
    className: "w-64 h-64 md:w-[28rem] md:h-[28rem] top-[25%] right-[10%] rotate-[15deg]",
    zIndex: 10,
    speed: 2,
  },
  {
    id: 3,
    src: "/3-hero.webp",
    alt: "Neon Texture",
    className: "w-44 h-44 md:w-[19rem] md:h-[19rem] bottom-[5%] left-[20%] rotate-[-6deg]",
    zIndex: 30,
    speed: 1,
  },
  
];

const trailImagesSource = [
  "1-h.webp",
  "2-h.webp",
  "3-h.webp",
  "4-h.webp",
  "5-h.webp",
];

export default function HeroUpgrade() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [trail, setTrail] = useState<{ id: number; x: number; y: number; src: string; rotation: number }[]>([]);
  const lastCursorPos = useRef({ x: 0, y: 0 });
  const imageIndex = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    
    const x = (clientX / width - 0.5) * 20; 
    const y = (clientY / height - 0.5) * 20;
    mouseX.set(x);
    mouseY.set(y);

    const distance = Math.hypot(
      clientX - lastCursorPos.current.x,
      clientY - lastCursorPos.current.y
    );

    if (distance > 50) {
      const newId = Date.now();
      const randomRotation = Math.random() * 20 - 10;
      
      const newTrailItem = {
        id: newId,
        x: clientX,
        y: clientY,
        src: trailImagesSource[imageIndex.current % trailImagesSource.length],
        rotation: randomRotation,
      };

      imageIndex.current += 1;
      lastCursorPos.current = { x: clientX, y: clientY };
      setTrail((prev) => [...prev, newTrailItem].slice(-6));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (trail.length > 0) {
        setTrail((prev) => prev.slice(1));
      }
    }, 200); 
    return () => clearInterval(interval);
  }, [trail.length]);

  return (
    <section 
      ref={containerRef}
      id="home"
      onMouseMove={handleMouseMove}
      // Added z-0 here to ensure the whole section is at base level
      className="relative z-0 w-full h-screen bg-[#f8f8f8] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* --- BACKGROUND TEXTURE --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* --- TRAIL LAYER --- */}
      {/* FIX 1: Changed z-30 to z-0 so it stays behind everything */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {trail.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.4, x: item.x - 40, y: item.y - 56, rotate: item.rotation }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute w-20 h-28 md:w-24 md:h-32"
              style={{ left: 0, top: 0 }}
            >
              <img 
                src={item.src} 
                alt="trail" 
                className="w-full h-full object-cover rounded-lg shadow-md border border-white/40"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- FLOATING IMAGES --- */}
      {/* FIX 2: Changed z-50 to z-10. This is the main fix. It puts images below the text and Menu. */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {cardData.map((card) => (
          <FloatingCard key={card.id} card={card} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      {/* --- CENTER TEXT CONTENT --- */}
      {/* FIX 3: Changed z-40 to z-20. Keeps text above images but below Menu (z-50/60) */}
      <div className="relative z-20 text-center flex flex-col items-center mix-blend-difference text-white">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="uppercase tracking-[0.4em] text-xs md:text-sm font-medium mb-4 text-gray-300"
        >
          Creative Agency
        </motion.span>

        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[20vw] leading-[0.8] font-black tracking-tighter text-white mix-blend-difference select-none"
        >
          FOCUS
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-md text-sm md:text-base text-gray-300 leading-relaxed font-light tracking-wide"
        >
          Crafting bold digital experiences that help brands grow and stand out. 
          From strategy into impactful digital solutions.
        </motion.p>
      </div>

    </section>
  );
}

// --- SUBCOMPONENT: Floating Card ---
function FloatingCard({ card, mouseX, mouseY }: { card: any, mouseX: any, mouseY: any }) {
  const x = useTransform(mouseX, (val: number) => val * -card.speed);
  const y = useTransform(mouseY, (val: number) => val * -card.speed);

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.5, y: 100 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotate: [card.rotate, card.rotate + 5, card.rotate],
        translateY: [0, -20, 0]
      }}
      transition={{ 
        opacity: { duration: 0.8, delay: 0.3 },
        scale: { duration: 0.8, delay: 0.3 },
        y: { duration: 0.8, delay: 0.3 },
        rotate: { repeat: Infinity, duration: 8, ease: "easeInOut" },
        translateY: { repeat: Infinity, duration: 6, ease: "easeInOut" }
      }}
      className={`absolute ${card.className}`}
    >
      <div className="relative w-[50%] h-[50%] overflow-hidden rounded-[2rem] shadow-2xl border-[1px] border-white/40 bg-white/20 backdrop-blur-sm group">
        <motion.img 
          src={card.src} 
          alt={card.alt} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-50 mix-blend-overlay"></div>
      </div>
    </motion.div>
  );
}