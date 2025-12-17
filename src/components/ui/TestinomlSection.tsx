"use client";
import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    name: "Marcus Chen",
    role: "Owner, Golden Dragon Restaurant",
    feedback:
      "RestroHub transformed how we manage operations. Our wait times dropped by 40% and customer satisfaction is at an all-time high.",
  },
  {
    name: "Sarah Williams",
    role: "Manager, La Bella Italia",
    feedback:
      "The online ordering system alone has increased our revenue by 25%. The support team is incredibly responsive and helpful.",
  },
  {
    name: "James Morrison",
    role: "Owner, The Grill House",
    feedback:
      "Best investment we made for our restaurant. The analytics feature helped us optimize our menu and pricing strategy.",
  },
  {
    name: "Emma Rodriguez",
    role: "Chef & Owner, Tapas Lounge",
    feedback:
      "Managing multiple locations is now effortless. The centralized dashboard gives me full visibility across all restaurants.",
  },
  {
    name: "David Thompson",
    role: "Operations Manager, Urban Bistro",
    feedback:
      "The staff scheduling feature alone saved us thousands in labor costs. RestroHub is a game-changer for restaurant management.",
  },
  {
    name: "Lisa Park",
    role: "Owner, Sakura Sushi",
    feedback:
      "Outstanding platform with exceptional customer support. They genuinely care about their customers' success.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mb-16 text-center">
        <div className="inline-block px-4 py-2 mb-4 font-medium text-yellow-800 bg-yellow-100 rounded-full">
          ⭐ Loved by Restaurants
        </div>
        <h2 className="mb-4 text-4xl font-bold text-gray-900">
          What Restaurant Owners Say
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Join thousands of happy restaurant owners who have transformed their
          business with RestroHub.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 px-8 mx-auto md:grid-cols-3 sm:grid-cols-2 max-w-7xl">
        {testimonials.map((testimonial, index) => (
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
              “{testimonial.feedback}”
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
        ))}
      </div>

      <div className="mt-20 text-center">
        <h3 className="mb-4 text-3xl font-bold text-gray-900">
          Join 5,000+ Restaurants Today
        </h3>
        <p className="mb-6 text-gray-600">
          Start your free 30-day trial. No credit card required. No long-term
          contract.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {/* Share Your Experience Button */}
          <Link
            href="/review"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-md bg-linear-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:from-blue-600 hover:to-purple-700"
          >
            <MessageSquare className="w-5 h-5" />
            Share Your Experience
          </Link>

          {/* Start Free Trial Button */}
          <button className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-md bg-linear-to-r from-yellow-400 to-yellow-600 hover:shadow-lg hover:from-yellow-500 hover:to-yellow-700">
            <Star className="w-5 h-5" />
            Start Your Free Trial
          </button>
        </div>
        
        {/* Alternative: Single row with both buttons side by side */}
        <div className="flex justify-center gap-4 mt-8">
          <Link
            href="/review"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 border-2 border-blue-500 rounded-full text-blue-600 hover:bg-blue-50 hover:border-blue-600"
          >
            <MessageSquare className="w-5 h-5" />
            Write a Review
          </Link>
          
          <button className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white transition-all duration-300 rounded-full bg-linear-to-r from-yellow-400 to-yellow-600 hover:shadow-lg">
            <Star className="w-5 h-5" />
            Try Free for 30 Days
          </button>
        </div>
      </div>
    </section>
  );
}