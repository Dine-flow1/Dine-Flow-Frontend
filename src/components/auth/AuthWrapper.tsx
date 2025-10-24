"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const container = useRef(null);

  useEffect(() => {
    gsap.from(container.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div ref={container} className="bg-white shadow-lg rounded-2xl p-8 w-[95%] sm:w-96">
        {children}
      </div>
    </div>
  );
}
