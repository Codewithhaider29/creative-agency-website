"use client"

import { useEffect, useRef } from "react"

interface FloatingElementProps {
  className?: string
  depth?: number
  color?: string
}

export default function FloatingElement({
  className = "",
  depth = 1,
  color = "rgba(251, 146, 60, 0.1)",
}: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Set initial animation
    const randomDelay = Math.random() * 2
    const randomDuration = 4 + Math.random() * 4

    element.style.animation = `float ${randomDuration}s ease-in-out ${randomDelay}s infinite`
  }, [])

  return (
    <div
      ref={elementRef}
      data-floating="true"
      data-depth={depth}
      className={`rounded-3xl transition-transform duration-500 ease-out ${className}`}
      style={{
        background: color,
        backdropFilter: "blur(10px)",
      }}
    />
  )
}
