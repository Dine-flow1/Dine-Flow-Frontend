"use client";
import TestimonialCard from "./TestimonialCard";

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
      <SectionHeader />
      <TestimonialsList testimonials={testimonials} />
      <CallToActionSection />
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="mb-16 text-center">
      <div className="inline-block px-4 py-2 mb-4 font-medium text-yellow-800 bg-yellow-100 rounded-full">
        ⭐ Loved by Restaurants
      </div>
      <h2 className="mb-4 text-4xl font-bold text-gray-900">
        What Restaurant Owners Say
      </h2>
      <p className="max-w-2xl mx-auto text-lg text-gray-600">
        Join thousands of happy restaurant owners who have transformed their business with RestroHub.
      </p>
    </div>
  );
}

interface Testimonial {
  name: string;
  role: string;
  feedback: string;
}

function TestimonialsList({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 px-8 mx-auto md:grid-cols-3 sm:grid-cols-2 max-w-7xl">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} index={index} />
      ))}
    </div>
  );
}

function CallToActionSection() {
  return (
    <div className="mt-20 text-center">
      <h3 className="mb-4 text-3xl font-bold text-gray-900">
        Join 5,000+ Restaurants Today
      </h3>
      <p className="mb-6 text-gray-600">
        Start your free 30-day trial. No credit card required. No long-term contract.
      </p>
      <button className="px-8 py-3 font-semibold text-white transition-all rounded-full shadow-md bg-linear-to-r from-yellow-400 to-yellow-600 hover:shadow-lg">
        Start Your Free Trial
      </button>
    </div>
  );
}
