"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Feature } from "../../data/featuresData";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<Props> = ({ feature, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="p-6 transition-all duration-300 shadow-sm bg-linear-to-b from-orange-50 to-white rounded-2xl hover:shadow-md"
    >
      <div className="flex items-center justify-center w-12 h-12 mb-4 text-2xl text-white rounded-lg bg-linear-to-br from-orange-500 to-red-400">
        {feature.icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-800">
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-600">
        {feature.description}
      </p>
    </div>
  );
};

export default FeatureCard;
