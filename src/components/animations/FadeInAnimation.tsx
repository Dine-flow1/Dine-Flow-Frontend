"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}

const FadeInAnimation = ({ 
  children, 
  delay = 0, 
  direction = "up",
  className = ""
}: FadeInProps) => {
  const compRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = compRef.current;
    if (!element) return;

    const startPosition: gsap.TweenVars = { opacity: 0 };
    switch (direction) {
      case "left": startPosition.x = -50; break;
      case "right": startPosition.x = 50; break;
      case "up": startPosition.y = 50; break;
      case "down": startPosition.y = -50; break;
    }

    gsap.fromTo(element, startPosition, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      delay,
      ease: "power2.out"
    });
  }, [delay, direction]);

  return (
    <div ref={compRef} className={className}>
      {children}
    </div>
  );
};

export default FadeInAnimation;