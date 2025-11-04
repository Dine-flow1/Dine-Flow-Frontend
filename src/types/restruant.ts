import { ReactNode } from "react";

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: string;
}

export interface OwnerInfo {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  isAccountVerified: boolean;
}

export interface RestaurantData {
  id: number;
  image: string | Blob | undefined;
  name: string | undefined;
  cuisine: ReactNode;
  location: ReactNode;
  restaurantName: string;
  restaurantType: string;
  description: string;
  logo: string;
  bannerImage: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  geolocation: string;
  openingHours: string;
  deliveryRadius: string;
  owner: OwnerInfo;
  panNumber: string;
  gstinNumber: string;
  fssaiNumber: string;
  registrationNumber: string;
  createdAt?: string;
  menu: MenuItem[];
  
}
