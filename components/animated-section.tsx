"use client"

import type React from "react"

import { useAnimationOnScroll } from "@/hooks/use-animation"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade-in-up" | "fade-in-left" | "fade-in-right" | "scale-in"
  delay?: number
}

export function AnimatedSection({
  children,
  className = "",
  animation = "fade-in-up",
  delay = 0,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useAnimationOnScroll()

  // Safely construct the className string
  const animationClass = animation || "fade-in-up"
  const visibilityClass = isVisible ? "animate-active" : ""

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(animationClass, visibilityClass, className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
