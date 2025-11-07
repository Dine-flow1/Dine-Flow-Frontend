"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period."
  },
  {
    question: "Do you offer a free trial?",
    answer: "We offer a 7-day free trial for all our premium plans. No credit card required to start your trial."
  },
  {
    question: "Can I switch between plans?",
    answer: "Absolutely! You can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle."
  },
  {
    question: "Is there a family plan?",
    answer: "Currently, we offer individual plans. Each subscription is for one user account."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and in some regions, Apple Pay and Google Pay."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="mb-12 text-3xl font-bold text-center text-gray-900">
        Frequently Asked Questions
      </h3>
      
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="bg-white border border-gray-100 shadow-lg rounded-2xl">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex items-center justify-between w-full px-6 py-4 text-left transition-colors hover:bg-gray-50 rounded-2xl"
            >
              <span className="text-lg font-semibold text-gray-900">
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <p className="leading-relaxed text-gray-600">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}