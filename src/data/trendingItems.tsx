export interface TrendingItem {
  id: number;
  title: string;
  rating: number;
  orders: number;
  trending: boolean;
  imageUrl: string;
  description: string;
  price: string;
}

export const trendingItems: TrendingItem[] = [
  {
    id: 1,
    title: "Truffle Pasta",
    rating: 4.9,
    orders: 1247,
    trending: true,
    price: "$24.99",
    description: "Creamy pasta with black truffle",
    imageUrl: "/images/truffle-pasta.jpg"
  },
  {
    id: 2,
    title: "Wagyu Steak",
    rating: 4.8,
    orders: 892,
    trending: true,
    price: "$49.99",
    description: "Premium Japanese A5 wagyu",
    imageUrl: "/images/wagyu-steak.jpg"
  },
  {
    id: 3,
    title: "Chocolate Cake",
    rating: 4.7,
    orders: 1563,
    trending: true,
    price: "$12.99",
    description: "Decadent triple chocolate",
    imageUrl: "/images/chocolate-cake.jpg"
  },
  {
    id: 4,
    title: "Sushi Platter",
    rating: 4.6,
    orders: 734,
    trending: false,
    price: "$32.99",
    description: "Fresh chef's selection",
    imageUrl: "/images/sushi-platter.jpg"
  },
  {
    id: 5,
    title: "Avocado Toast",
    rating: 4.5,
    orders: 987,
    trending: false,
    price: "$16.99",
    description: "Artisan bread with smashed avocado",
    imageUrl: "/images/avocado-toast.jpg"
  },
  {
    id: 6,
    title: "Craft Cocktails",
    rating: 4.8,
    orders: 567,
    trending: true,
    price: "$14.99",
    description: "Signature mixologist creations",
    imageUrl: "/images/craft-cocktails.jpg"
  }
];