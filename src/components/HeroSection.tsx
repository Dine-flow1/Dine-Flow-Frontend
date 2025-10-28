"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Button from "./Buttons";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      gsap.fromTo(
        buttonsRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "back.out(1.7)" }
      );

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { scale: 0, opacity: 0, y: 100, rotation: -5 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.8,
            ease: "back.out(1.7)",
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // 🍝 Trending food items with images
  const trendingItems = [
    {
      name: "Truffle Pasta",
      orders: "1.2k",
      image:
        "https://images.unsplash.com/photo-1604908177522-fb4f9b4f62a2?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Wagyu Steak",
      orders: "894",
      image:
        "https://images.unsplash.com/photo-1604908554330-0184a4a9d2fc?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Chocolate Cake",
      orders: "1.5k",
      image:
        "https://images.unsplash.com/photo-1606312618531-9b9d5b41e9a5?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section
      ref={heroRef}
      className="flex items-center min-h-screen pt-16 bg-linear-to-br from-white via-blue-50/30 to-purple-50/30"
    >
      <div className="container grid items-center gap-12 px-4 mx-auto lg:grid-cols-2">
        {/* Left side - Text content */}
        <div className="flex flex-col justify-center">
          <div ref={textRef} className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 space-x-2 text-sm font-semibold border rounded-full bg-linear-to-r from-primary-50 to-blue-50 text-primary-700 border-primary-200">
              <span>✨</span>
              <span>The Future of Restaurant Management</span>
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              Grow Your Restaurant{" "}
              <span className="text-transparent bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text">
                Business with Ease
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
              Streamline your operations, increase efficiency, and boost profits
              with our comprehensive management platform designed for modern
              restaurants.
            </p>

            <div
              ref={buttonsRef}
              className="flex flex-col gap-4 pt-4 sm:flex-row text-amber-600"
            >
              <Button variant="primary" className="px-8 py-4 text-lg">
                Register Now
              </Button>
            </div>
          </div>
        </div>

        
        <div className="relative">
          <div
            ref={cardsRef}
            className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {trendingItems.map((item, index) => (
              <div
                key={item.name}
                className="relative overflow-hidden transition-all duration-300 transform shadow-2xl rounded-2xl hover:scale-105 hover:rotate-1"
                style={{
                  rotate: `${index % 2 === 0 ? -2 : 2}deg`,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-48 transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white/20">
                      🔥 Trending
                    </span>
                    <span className="text-sm text-white/80">
                      ⭐ {item.orders}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>

          
          <div className="absolute w-20 h-20 bg-yellow-400 rounded-full -top-4 -right-4 opacity-10 animate-float" />
          <div className="absolute w-16 h-16 delay-1000 bg-blue-400 rounded-full -bottom-8 -left-8 opacity-10 animate-float" />
          <div className="absolute w-12 h-12 delay-500 bg-purple-400 rounded-full top-1/2 -right-12 opacity-10 animate-float" /> 
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
