"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import * as FiIcons from "react-icons/fi";

const { FiHome, FiBarChart2, FiSettings, FiUser, FiMenu } = FiIcons;

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavbarProps {
  userRole?: "admin" | "restaurant" | "guest";
}

const Navbar: React.FC<NavbarProps> = ({ userRole = "guest" }) => {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const getNavItems = (): NavItem[] => {
    switch (userRole) {
      case "admin":
        return [
          { path: "/dashboard", label: "Dashboard", icon: FiHome },
          { path: "/analytics", label: "Analytics", icon: FiBarChart2 },
          { path: "/settings", label: "Settings", icon: FiSettings },
        ];
      case "restaurant":
        return [
          { path: "/restaurant", label: "Restaurant", icon: FiHome },
          { path: "/menu", label: "Menu", icon: FiMenu },
          { path: "/analytics", label: "Analytics", icon: FiBarChart2 },
        ];
      default:
        return [
          { path: "/", label: "Home", icon: FiHome },
          { path: "/auth", label: "Login", icon: FiUser },
        ];
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar slide down animation
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      // Logo animation
      gsap.fromTo(
        logoRef.current,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.2,
        }
      );

      // Nav items stagger animation
      if (navItemsRef.current) {
        gsap.fromTo(
          navItemsRef.current.children,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.4,
            ease: "power2.out",
          }
        );
      }

      // Profile animation
      gsap.fromTo(
        profileRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.5, delay: 0.8, ease: "power1.in" }
      );
    });

    return () => ctx.revert();
  }, []);

  // Hover animation for nav items
  const handleNavItemHover = (element: HTMLElement) => {
    gsap.to(element, {
      y: -2,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleNavItemHoverOut = (element: HTMLElement) => {
    gsap.to(element, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const SafeIcon = ({
    icon: Icon,
    className,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    className?: string;
  }) => {
    return <Icon className={className} />;
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 border-b shadow-lg bg-linear-to-br from-[#6b2c3e] to-[#4a1f2d]"
    >
      <div className="px-6 py-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link ref={logoRef} href="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
              <span className="text-xl font-bold text-red-950">D</span>
            </div>
            <h1 className="text-2xl font-semibold text-white">DineFlow</h1>
          </Link>

          {/* Navigation Items */}
          <div
            ref={navItemsRef}
            className="items-center hidden space-x-8 md:flex"
          >
            {getNavItems().map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  pathname === item.path
                    ? "text-white border-b-2 border-gray-400"
                    : "text-white hover:text-white-500"
                }`}
                onMouseEnter={(e) => handleNavItemHover(e.currentTarget)}
                onMouseLeave={(e) => handleNavItemHoverOut(e.currentTarget)}
              >
                <SafeIcon icon={item.icon} className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Profile */}
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer">
            <SafeIcon icon={FiUser} className="w-5 h-5 text-red-950" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
