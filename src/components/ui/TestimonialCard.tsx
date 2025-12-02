import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  feedback: string;
}

interface Props {
  testimonial: Testimonial;
  index: number;
}

export default function TestimonialCard({ testimonial, index }: Props) {
  return (
    <motion.div
      key={index}
      whileHover={{ y: -5 }}
      className="p-6 transition-all duration-300 bg-white border border-yellow-300 shadow-md rounded-2xl hover:shadow-lg"
    >
      <div className="flex mb-3 text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} fill="currentColor" />
        ))}
      </div>
      <p className="mb-6 leading-relaxed text-gray-700">
        "{testimonial.feedback}"
      </p>
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-linear-to-tr from-yellow-400 to-red-500">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}
