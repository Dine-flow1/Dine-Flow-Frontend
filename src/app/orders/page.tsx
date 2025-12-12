// Add to your existing types in orders/page.tsx
export interface CartItem {
  id: string;
  _id?: string; // API compatibility - menu item ID
  name: string;
  price: number;
  quantity: number;
  image: string;
  specialInstructions?: string;
  addons?: string[];
  // API menu item fields
  restaurantId?: string;
  restaurantName?: string;
  categoryId?: string;
  description?: string;
  isAvailable?: boolean;
  isVeg?: boolean;
  spiceLevel?: 'Mild' | 'Medium' | 'Hot';
  discount?: number;
  rating?: number;
  tags?: string[];
  category?: string;
  type?: 'veg' | 'non-veg';
  cuisine?: string;
  // Additional fields for cart
  originalPrice?: number; // Price before discount
  totalAddonPrice?: number;
  taxRate?: number;
  customizable?: boolean;
  maxQuantity?: number;
  preparationTime?: number; // in minutes
}