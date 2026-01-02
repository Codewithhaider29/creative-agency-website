"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Change 1: Import Link
import { motion, AnimatePresence, Variants } from "framer-motion";

// Change 2: Added href paths for navigation
const menuItems = [
  { id: "home", label: "HOME", href: "/" },
  { id: "about", label: "ABOUT US", href: "#about" },
  { id: "service", label: "SERVICE", href: "#service" },
  { id: "project", label: "PROJECT", href: "#project" },
];

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(menuItems[0]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const menuVariants: Variants = {
    initial: { scaleY: 0 },
    animate: {
      scaleY: 1,
      transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] }
    },
    exit: {
      scaleY: 0,
      transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const containerVars: Variants = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } }
  };

  return (
    <>
      {/* --- HEADER (Fixed) --- */}
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-[60] pointer-events-none">
        
        
<div className="pointer-events-auto cursor-pointer">
  <Link href="/">
    <Image
      src="/dark-logo.webp"
      alt="Brand Logo"
      width={120}
      height={40}
      className="object-contain"
    />
  </Link>
</div>

        {/* Toggle Button */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto cursor-pointer flex items-center gap-2 group"
        >
          <div className="text-black p-3 transition-colors duration-300">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* --- FULL SCREEN MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-50 bg-white origin-top flex flex-col justify-center overflow-hidden"
          >
            <div className="w-full h-full px-6 md:px-20 py-10 flex flex-col md:flex-row max-w-7xl mx-auto">

              {/* LEFT: Menu Links */}
              <div className="flex-1 flex flex-col justify-center">
                <motion.div
                  variants={containerVars}
                  initial="initial"
                  animate="open"
                  exit="initial"
                  className="flex flex-col space-y-2"
                >
                  {menuItems.map((item) => (
                    <MenuLink
                      key={item.id}
                      item={item}
                      isActive={activeItem.id === item.id}
                      setActiveItem={setActiveItem}
                      // Change 3: Pass close function
                      closeMenu={() => setIsOpen(false)}
                    />
                  ))}
                </motion.div>
              </div>

              {/* RIGHT: PERMANENT VIDEO SECTION */}
              <div className="hidden lg:flex flex-1 items-center justify-center pl-20">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-2xl"
                >
                  <div className="absolute inset-0">
                    <video
                      src="/navbar-video.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                  <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full text-white">
                    <ArrowUpRight size={24} />
                  </div>
                </motion.div>
              </div>

            </div>

            {/* FOOTER: Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10 left-6 md:left-20 flex gap-6 text-sm font-medium uppercase tracking-widest text-gray-500"
            >
              {["Instagram", "Twitter", "LinkedIn"].map((social) => (
                <span key={social} className="cursor-pointer hover:text-black transition-colors duration-300">
                  {social}
                </span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- SUBCOMPONENT: Individual Link ---
function MenuLink({ item, isActive, setActiveItem, closeMenu }: { item: any, isActive: boolean, setActiveItem: any, closeMenu: () => void }) {
  const linkVariants: Variants = {
    initial: { y: 30, opacity: 0, transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
    open: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } }
  };

  return (
    <motion.div
      variants={linkVariants}
      className="relative overflow-hidden group"
      onMouseEnter={() => setActiveItem(item)}
    >
      {/* Change 4: Wrapped logic in Link & added onClick to close menu */}
      <Link href={item.href} onClick={closeMenu} className="relative flex items-center">
        
        {/* Active Indicator Dot */}
        <span className={`w-3 h-3 bg-black rounded-full mr-4 transition-transform duration-300 ${isActive ? "scale-100" : "scale-0"}`} />

        {/* Double Text Layer for Hover Effect */}
        <div className="relative h-[60px] md:h-[100px] overflow-hidden">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: isActive ? "-100%" : "0%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative"
          >
            {/* Original Text */}
            <h2 className="text-6xl md:text-8xl font-black text-gray-300 group-hover:text-transparent group-hover:text-stroke-black transition-colors duration-300">
              {item.label}
            </h2>
            {/* Hover Text (Black) */}
            <h2 className="absolute top-full left-0 text-6xl md:text-8xl font-black text-black">
              {item.label}
            </h2>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}