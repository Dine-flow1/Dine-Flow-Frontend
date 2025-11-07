"use client";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon?: string;
}

export default function SectionHeader({ title, subtitle, icon = "⚡" }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-[#3b2600] flex items-center justify-center gap-3 mb-4"
      >
        <span className="text-3xl text-amber-500">{icon}</span> 
        {title}
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-gray-600"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}