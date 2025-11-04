import React from "react";
import FadeInAnimation from "../animations/FadeInAnimation";

interface FormHeaderProps {
  title: string;
  subtitle: string;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
}

const FormHeader = ({ 
  title, 
  subtitle, 
  delay = 0,
  direction = "down"
}: FormHeaderProps) => (
  <FadeInAnimation delay={delay} direction={direction}>
    <div className="mb-8 text-center">
      <h1 className="mb-2 text-4xl font-bold text-gray-900">
        {title}
      </h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  </FadeInAnimation>
);

export default FormHeader;