
import { MenuItem, RestaurantData, TableBooking } from '../types/restaurant';
import { ApiOrder } from '../types/order';
import { User } from '../types/manager';

const API_BASE_URL = 'http://localhost:3001';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async fetchData(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}/${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    if (config.body && typeof config.body !== 'string') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  // Restaurant operations - with transformation
  async getRestaurants(): Promise<RestaurantData[]> {
    const restaurants = await this.fetchData('restaurants');
    return restaurants.map((restaurant: any) => this.transformRestaurant(restaurant));
  }

  async getRestaurant(id: string): Promise<RestaurantData | null> {
    try {
      const restaurant = await this.fetchData(`restaurants/${id}`);
      return this.transformRestaurant(restaurant);
    } catch (error: any) {
      if (error.message && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  // Menu operations - with transformation
  async getMenuItems(restaurantId: string): Promise<MenuItem[]> {
    const menuItems = await this.fetchData(`menuItems?restaurantId=${restaurantId}`);
    return menuItems.map((item: any) => this.transformMenuItem(item));
  }

  async createMenuItem(itemData: Partial<MenuItem>): Promise<MenuItem> {
    const createdItem = await this.fetchData('menuItems', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
    return this.transformMenuItem(createdItem);
  }

  async updateMenuItem(id: string, itemData: Partial<MenuItem>): Promise<MenuItem> {
    const updatedItem = await this.fetchData(`menuItems/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(itemData),
    });
    return this.transformMenuItem(updatedItem);
  }

  // Transformation helpers
  private transformRestaurant(restaurant: any): RestaurantData {
    return {
      ...restaurant,
      id: restaurant._id,
      cuisine: restaurant.restaurantType,
      location: restaurant.address,
      image: restaurant.bannerImage || restaurant.logo,
    };
  }

  private transformMenuItem(item: any): MenuItem {
    return {
      ...item,
      id: item._id,
    };
  }

  // ... rest of your methods remain the same
  async getOrders(userId?: string, restaurantId?: string): Promise<ApiOrder[]> {
    let url = 'orders';
    const params = new URLSearchParams();
    if (userId) params.append('customer.customerId', userId);
    if (restaurantId) params.append('restaurant.restaurantId', restaurantId);
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
    return this.fetchData(url);
  }

  async createOrder(orderData: Partial<ApiOrder>): Promise<ApiOrder> {
    return this.fetchData('orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async updateOrderStatus(orderId: string, status: string): Promise<ApiOrder> {
    const order = await this.fetchData(`orders/${orderId}`);
    return this.fetchData(`orders/${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        orderStatus: {
          ...order.orderStatus,
          [status]: new Date().toISOString()
        }
      }),
    });
  }

  // Table bookings
  async getTableBookings(restaurantId: string): Promise<TableBooking[]> {
    return this.fetchData(`tableBookings?restaurantId=${restaurantId}`);
  }

  async createTableBooking(bookingData: any): Promise<TableBooking> {
    return this.fetchData('tableBookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  // Users
  async getUsers(): Promise<User[]> {
    return this.fetchData('users');
  }

  async getUser(id: string): Promise<User> {
    return this.fetchData(`users/${id}`);
  }

  // Payments
  async createPayment(paymentData: any): Promise<any> {
    return this.fetchData('payments', {
      method: 'POST',
      body: paymentData,
    });
  }

  // Menu Categories
  async getMenuCategories(restaurantId: string): Promise<any[]> {
    return this.fetchData(`menuCategories?restaurantId=${restaurantId}`);
  }

  // Subscriptions
  async getSubscriptions(restaurantId: string): Promise<any[]> {
    return this.fetchData(`subscriptions?restaurantId=${restaurantId}`);
  }
}

export const apiService = new ApiService();