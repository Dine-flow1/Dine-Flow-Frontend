// src/data/featuresData.ts
export interface Feature {
  icon: string;
  title: string;
  description: string;
}
export interface Feature {
  icon: string;
  title: string;
  description: string;
  cta?: Feature;
}

export const features: Feature[] = [
  {
    icon: "⚡",
    title: "Advanced POS System",
    description:
      "Fast, reliable point-of-sale system with inventory management and staff tracking.",
  },
  {
    icon: "🛒",
    title: "Online Ordering",
    description:
      "Accept orders from customers with delivery tracking and seamless payment integration.",
  },
  {
    icon: "📅",
    title: "Table Reservations",
    description:
      "Manage bookings efficiently with automated confirmations and customer management.",
  },
  {
    icon: "📊",
    title: "Advanced Analytics",
    description:
      "Gain insights into sales, customer behavior, and inventory with detailed reports.",
  },
  {
    icon: "👥",
    title: "Staff Management",
    description:
      "Schedule shifts, track performance, and manage payroll all in one place.",
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    description:
      "Bank-level encryption and compliance with industry standards for data protection.",
  },
];
