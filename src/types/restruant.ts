export interface OwnerInfo {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  isAccountVerified: boolean;
}

export interface RestaurantData {
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
}