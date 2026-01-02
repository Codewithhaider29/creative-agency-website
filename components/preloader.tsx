"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500); // Wait a bit at 100%
          return 100;
        }
        // Random increment for realistic loading feel
        return prev + Math.floor(Math.random() * 10) + 1; 
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }} // Slide up slightly on exit
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-black"
        >
          {/* --- SVG CUBE (Code based shape) --- */}
          <motion.div
            animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1] // Subtle breathing effect
            }}
            transition={{
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-24 h-24 md:w-32 md:h-32 mb-6"
          >
            {/* Drawing the Cube using SVG Paths */}
            <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" // Thick lines like your image
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-full h-full text-black"
            >
                {/* Outer Hexagon Shape */}
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                
                {/* Inner Y Shape to make it look 3D */}
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </motion.div>

          {/* --- PERCENTAGE COUNTER --- */}
          <div className="overflow-hidden h-8 flex items-center justify-center">
            <motion.span 
              key={progress} // Key change triggers animation on number update
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-xl md:text-2xl font-bold tracking-widest text-neutral-400 font-mono"
            >
              {Math.min(progress, 100)}%
            </motion.span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}