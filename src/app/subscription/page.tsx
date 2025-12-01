"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { subscriptionPlans, subscriptionFeatures } from "../../data/subscriptionPlans";
import PlanCard from "../../components/Subscription/PlanCard";
import FeatureComparison from "../../components/Subscription/FeatureComparison";
import FAQ from "../../components/Subscription/FAQ";
import { Crown, Shield, Users, Zap, Clock, Calendar } from "lucide-react";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer"
export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const features = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Premium Recipes",
      description: "Access exclusive recipes from world-class chefs"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Ad-Free Experience",
      description: "Cook without interruptions or distractions"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Access",
      description: "Join our exclusive community of food enthusiasts"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Priority Support",
      description: "Get help from our expert team whenever you need"
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      text: "Flexible durations to match your cooking journey"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      text: "Cancel anytime with no long-term commitment"
    },
    {
      icon: <Crown className="w-6 h-6" />,
      text: "Immediate access to all premium features"
    }
  ];

  return (
  <>
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <Navbar/>
      <section className="px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold rounded-full bg-amber-100 text-amber-700">
            <Crown className="w-4 h-4" />
            Choose Your Plan
          </div>
          
          <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
            Upgrade Your
            <span className="text-transparent bg-linear-to-r from-amber-500 to-orange-500 bg-clip-text">
              {" "}Cooking Experience
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-600">
            Select the plan that fits your cooking style and unlock premium features, exclusive recipes, and expert guidance.
          </p>

          {/* Benefits */}
          <div className="max-w-md mx-auto mb-12 space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-700">
                <div className="text-amber-500">
                  {benefit.icon}
                </div>
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid max-w-6xl grid-cols-1 gap-6 mx-auto mb-16 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <div key={index} className="p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-2xl text-amber-600">
                {feature.icon}
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the duration that works best for you. Both plans include all premium features.
            </p>
          </motion.div>
          
          <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto mb-20 lg:grid-cols-2">
            {subscriptionPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PlanCard
                  plan={plan}
                  isSelected={selectedPlan === plan.id}
                  onSelect={setSelectedPlan}
                />
              </motion.div>
            ))}
          </div>

          {/* Feature Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-20"
          >
            <FeatureComparison features={subscriptionFeatures} />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-20 bg-white">
        <div className="mx-auto max-w-7xl">
          <FAQ />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900">
            Ready to Start Your Premium Journey?
          </h2>
          <p className="mb-8 text-xl text-gray-600">
            Join thousands of home chefs who are already enjoying our premium features.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-linear-to-r from-amber-500 to-orange-500 rounded-2xl hover:shadow-lg hover:scale-105">
              Start Your Free Trial
            </button>
            <button className="px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 border-2 border-gray-300 rounded-2xl hover:border-amber-500 hover:text-amber-600">
              Compare Plans
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            7-day free trial • No credit card required • Cancel anytime
          </p>
        </motion.div>
      </section>
    </div>
      <Footer/>
    </>
  );
}