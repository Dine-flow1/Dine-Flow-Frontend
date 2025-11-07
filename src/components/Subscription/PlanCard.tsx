"use client";
import { motion } from "framer-motion";
import { SubscriptionPlan } from "../../types/subscription";
import { Check, Crown, Star } from "lucide-react";

interface PlanCardProps {
  plan: SubscriptionPlan;
  isSelected: boolean;
  onSelect: (planId: string) => void;
}

export default function PlanCard({ plan, onSelect, isSelected }: PlanCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative p-8 rounded-3xl border-2 transition-all duration-300 ${
        plan.popular 
          ? 'border-amber-300 bg-linear-to-br from-amber-50 to-orange-50 shadow-2xl' 
          : isSelected
          ? 'border-amber-200 bg-white shadow-xl'
          : 'border-gray-200 bg-white shadow-lg hover:shadow-xl'
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute transform -translate-x-1/2 -top-4 left-1/2">
          <div className="flex items-center gap-1 px-4 py-2 font-bold text-white rounded-full shadow-lg bg-linear-to-r from-amber-500 to-orange-500">
            <Crown className="w-4 h-4" />
            <span className="text-sm">{plan.badge}</span>
          </div>
        </div>
      )}

      <div className="mb-6 text-center">
        <h3 className="mb-2 text-2xl font-bold text-gray-900">{plan.name}</h3>
        <p className="text-gray-600">{plan.description}</p>
      </div>

      {/* Pricing */}
      <div className="mb-6 text-center">
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-4xl font-bold text-gray-900">
            ${plan.price}
          </span>
          {plan.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              ${plan.originalPrice}
            </span>
          )}
        </div>
        <p className="text-gray-600 capitalize">
          per {plan.period === 'yearly' ? 'year' : 'month'}
        </p>
      </div>

      {/* Features */}
      <div className="mb-8 space-y-3">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <span className="text-sm text-gray-700">{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={() => onSelect(plan.id)}
        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
          plan.popular
            ? 'bg-linear-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:scale-105'
            : isSelected
            ? 'bg-amber-500 text-white hover:bg-amber-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {isSelected ? 'Selected' : 'Get Started'}
      </button>
    </motion.div>
  );
}