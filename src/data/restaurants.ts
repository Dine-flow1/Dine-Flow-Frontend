import { ReactNode } from "react";

export interface Restaurant {
  cuisine: ReactNode;
  location: ReactNode;
  menu: any;
  id: string;
  name: string;
  description: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  category: string;
  isOpen: boolean;
  menuItems?: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
}

export const restaurants: Restaurant[] = [
  {
      id: "1",
      name: "Burger Palace",
      description: "Juicy burgers and crispy fries",
      rating: 4.5,
      deliveryTime: "20-30 min",
      deliveryFee: 2.99,
      image: "/restaurants/burger-palace.jpg",
      category: "Fast Food",
      isOpen: true,
      cuisine: undefined,
      location: undefined,
      menu: undefined
  },
  {
      id: "2",
      name: "Pizza Paradise",
      description: "Authentic Italian pizzas",
      rating: 4.7,
      deliveryTime: "25-35 min",
      deliveryFee: 3.49,
      image: "/restaurants/pizza-paradise.jpg",
      category: "Italian",
      isOpen: true,
      cuisine: undefined,
      location: undefined,
      menu: undefined
  },
  {
      id: "3",
      name: "Sushi Master",
      description: "Fresh sushi and Japanese cuisine",
      rating: 4.8,
      deliveryTime: "30-40 min",
      deliveryFee: 4.99,
      image: "/restaurants/sushi-master.jpg",
      category: "Japanese",
      isOpen: true,
      cuisine: undefined,
      location: undefined,
      menu: undefined
  },
  {
      id: "4",
      name: "Green Leaf",
      description: "Healthy salads and bowls",
      rating: 4.3,
      deliveryTime: "15-25 min",
      deliveryFee: 1.99,
      image: "/restaurants/green-leaf.jpg",
      category: "Healthy",
      isOpen: true,
      cuisine: undefined,
      location: undefined,
      menu: undefined
  },
  {
      id: "5",
      name: "Taco Fiesta",
      description: "Mexican street food",
      rating: 4.4,
      deliveryTime: "20-30 min",
      deliveryFee: 2.49,
      image: "/restaurants/taco-fiesta.jpg",
      category: "Mexican",
      isOpen: true,
      cuisine: undefined,
      location: undefined,
      menu: undefined
  },
];

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id);
};

export const getRestaurantsByCategory = (category: string): Restaurant[] => {
  return restaurants.filter(restaurant => restaurant.category === category);
};

export const getOpenRestaurants = (): Restaurant[] => {
  return restaurants.filter(restaurant => restaurant.isOpen);
};

export default restaurants;