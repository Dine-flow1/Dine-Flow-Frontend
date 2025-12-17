import { MenuItem, RestaurantData, TableBooking } from "../types/restaurant";
import { ApiOrder } from "../types/order";
import { User } from "../types/manager";

const API_BASE_URL = "http://localhost:9999";

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async fetchData(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}/${endpoint}`;

    const config: RequestInit = {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      credentials: "include", // ✅ send cookies automatically
      ...options,
    };

    if (config.body && typeof config.body !== "string") {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized. Please login again.");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  }

  // ----------------------------
  // RESTAURANTS
  // ----------------------------
  async getRestaurants(): Promise<RestaurantData[]> {
    const restaurants = await this.fetchData("api/restaurants");
    return restaurants.map((restaurant: any) =>
      this.transformRestaurant(restaurant)
    );
  }

  async getRestaurant(id: string): Promise<RestaurantData | null> {
    try {
      const restaurant = await this.fetchData(`api/restaurants/${id}`);
      return this.transformRestaurant(restaurant);
    } catch (error: any) {
      if (error.message.includes("404")) return null;
      throw error;
    }
  }

  async getMenuItems(restaurantId: string): Promise<MenuItem[]> {
    const response = await this.fetchData(`api/menu/fullmenu/${restaurantId}`);
    const menu = response.data.menu || [];
    const items = menu.flatMap((section: any) =>
      section.items.map((item: any) => ({
        ...item,
        category: section.category?.name || "Main Courses",
      }))
    );

    return items;
  }

  async createMenuItem(itemData: Partial<MenuItem>): Promise<MenuItem> {
    const createdItem = await this.fetchData("/api/menuItems", {
      method: "POST",
      body: itemData,
    });
    return this.transformMenuItem(createdItem);
  }

  async updateMenuItem(
    id: string,
    itemData: Partial<MenuItem>
  ): Promise<MenuItem> {
    const updatedItem = await this.fetchData(`/api/menuItems/${id}`, {
      method: "PATCH",
      body: itemData,
    });
    return this.transformMenuItem(updatedItem);
  }

  // ----------------------------
  // TRANSFORMERS
  // ----------------------------
  private transformRestaurant(restaurant: any): RestaurantData {
    return {
      ...restaurant,
      id: restaurant._id,
      cuisine: restaurant.restaurantType,
      location: restaurant.address,
      image: restaurant.bannerImage || restaurant.logo,
    };
  }

  public async updateRestaurant(id: string, data: any): Promise<any> {
    return this.handleRequest(`/restaurants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ----------------------------
  // ORDERS
  // ----------------------------
  async getOrders(userId?: string, restaurantId?: string): Promise<ApiOrder[]> {
    let url = "orders";
    const params = new URLSearchParams();
    if (userId) params.append("customer.customerId", userId);
    if (restaurantId) params.append("restaurant.restaurantId", restaurantId);
    const qs = params.toString();
    if (qs) url += `?${qs}`;
    return this.fetchData(url);
  }

  async createOrder(orderData: Partial<ApiOrder>): Promise<ApiOrder> {
    return this.fetchData("orders", { method: "POST", body: orderData });
  }

  async updateOrderStatus(orderId: string, status: string): Promise<ApiOrder> {
    const order = await this.fetchData(`orders/${orderId}`);
    return this.fetchData(`orders/${orderId}`, {
      method: "PATCH",
      body: {
        orderStatus: {
          ...order.orderStatus,
          [status]: new Date().toISOString(),
        },
      },
    });
  }

  // ----------------------------
  // TABLE BOOKINGS
  // ----------------------------
  async getTableBookings(restaurantId: string): Promise<TableBooking[]> {
    return this.fetchData(`tableBookings?restaurantId=${restaurantId}`);
  }

  async createTableBooking(bookingData: any): Promise<TableBooking> {
    return this.fetchData("tableBookings", {
      method: "POST",
      body: bookingData,
    });
  }

  // ----------------------------
  // USERS
  // ----------------------------
  async getUsers(): Promise<User[]> {
    return this.fetchData("users");
  }

  async getUser(id: string): Promise<User> {
    return this.fetchData(`users/${id}`);
  }

  // ----------------------------
  // PAYMENTS
  // ----------------------------
  async createPayment(paymentData: any): Promise<any> {
    return this.fetchData("payments", { method: "POST", body: paymentData });
  }

  // ----------------------------
  // MENU CATEGORIES
  // ----------------------------
  async getMenuCategories(restaurantId: string): Promise<any[]> {
    return this.fetchData(`menuCategories?restaurantId=${restaurantId}`);
  }

  // ----------------------------
  // SUBSCRIPTIONS
  // ----------------------------
  async getSubscriptions(restaurantId: string): Promise<any[]> {
    return this.fetchData(`subscriptions?restaurantId=${restaurantId}`);
  }
}

export const apiService = new ApiService();
