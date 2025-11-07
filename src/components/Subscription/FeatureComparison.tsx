"use client";
import { Check, X } from "lucide-react";

interface FeatureComparisonProps {
  features: { [key: string]: string[] };
}

export default function FeatureComparison({ features }: FeatureComparisonProps) {
  return (
    <div className="p-8 bg-white shadow-lg rounded-3xl">
      <h3 className="mb-8 text-2xl font-bold text-center text-gray-900">
        Everything You Get
      </h3>
      
      <div className="space-y-4">
        {Object.entries(features).map(([category, categoryFeatures]) => (
          <div key={category}>
            <h4 className="mb-3 font-semibold text-gray-800">{category}</h4>
            <div className="space-y-2">
              {categoryFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}