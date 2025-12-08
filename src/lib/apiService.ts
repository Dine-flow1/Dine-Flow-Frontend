import axios, { AxiosInstance } from "axios";
import { MenuItem, RestaurantData, TableBooking } from "../types/restaurant";
import { ApiOrder } from "../types/order";
import { User } from "../types/manager";

const API_BASE_URL = "http://localhost:9999/api";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true, // ✅ important for cookies
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private async request(endpoint: string, options: any = {}) {
    try {
      const res = await this.api.request({
        url: endpoint,
        method: options.method || "GET",
        data: options.body || undefined,
        params: options.params || undefined,
        headers: {
          ...options.headers,
        },
      });

      return res.data.data || res.data; 
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      throw error.response?.data || error;
    }
  }

  // -------------------------------
  // RESTAURANTS
  // -------------------------------
  async getRestaurants(): Promise<RestaurantData[]> {
    const restaurants = await this.request("/restaurants");

    
    return restaurants.map((r: any) => this.transformRestaurant(r));
  }

  async getRestaurant(id: string): Promise<RestaurantData | null> {
    try {
      const restaurant = await this.request(`/restaurants/${id}`);
          // console.log("dsfkjsdlkfjsa",restaurant);
      return this.transformRestaurant(restaurant);
    } catch (error: any) {
      if (error.message.includes("404")) return null;
      throw error;
    }
  }

  // -------------------------------
  // MENU
  // -------------------------------
  async getMenuItems(restaurantId: string): Promise<MenuItem[]> {
    const response = await this.request(`/menu/fullmenu/${restaurantId}`);
    const menu = response.menu || []; // adjusted if backend sends { menu: [...] }

    const items = menu.flatMap((section: any) =>
      section.items.map((item: any) => ({
        ...item,
        category: section.category?.name || "Main Courses",
      }))
    );

    return items;
  }

  // -------------------------------
  // ORDERS
  // -------------------------------
  async getOrders(userId?: string, restaurantId?: string): Promise<ApiOrder[]> {
    const params: any = {};
    if (userId) params["customer.customerId"] = userId;
    if (restaurantId) params["restaurant.restaurantId"] = restaurantId;

    return this.request(`/order`, { params });
  }

  async createOrder(orderData: Partial<ApiOrder>): Promise<ApiOrder> {
    return this.request(`/order`, { method: "POST", body: orderData });
  }

  // -------------------------------
  // TABLE BOOKINGS
  // -------------------------------
  async getTableBookings(restaurantId: string): Promise<TableBooking[]> {
    return this.request(`/tableBooking`, {
      params: { restaurantId },
    });
  }

  async createTableBooking(bookingData: any): Promise<TableBooking> {
    return this.request(`/tableBooking`, {
      method: "POST",
      body: bookingData,
    });
  }

  // -------------------------------
  // USERS
  // -------------------------------
  async getUsers(): Promise<User[]> {
    return this.request(`/auth/users`);
  }

  async getUser(id: string): Promise<User> {
    return this.request(`/auth/users/${id}`);
  }

  // -------------------------------
  // PAYMENTS
  // -------------------------------
  async createPayment(paymentData: any): Promise<any> {
    return this.request(`/payments`, {
      method: "POST",
      body: paymentData,
    });
  }

  // -------------------------------
  // TRANSFORMERS
  // -------------------------------
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
}

export const apiService = new ApiService();
