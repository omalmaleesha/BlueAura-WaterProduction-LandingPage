"use client"

import { useEffect, useRef, useState } from "react"

interface UseAnimationOnScrollProps {
  threshold?: number
  rootMargin?: string
}

export function useAnimationOnScroll({ threshold = 0.1, rootMargin = "0px" }: UseAnimationOnScrollProps = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      { threshold, rootMargin },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin])

  return { ref, isVisible }
}
