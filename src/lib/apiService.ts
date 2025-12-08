import { MenuItem, RestaurantData, TableBooking } from "../types/restaurant";
import { ApiOrder } from "../types/order";
import { User } from "../types/manager";

const API_BASE_URL = "http://localhost:9999";

class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async fetchData(endpoint: string, options: { body?: any; [key: string]: any } = {}) {
    // normalize base and endpoint to avoid double slashes and allow absolute URLs
    const trimmedBase = this.baseURL.replace(/\/+$/, "");
    const trimmedEndpoint = endpoint.replace(/^\/+/, "");
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${trimmedBase}/${trimmedEndpoint}`;

    // get token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const config: RequestInit & { body?: any } = {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
          // throw typed error so callers can handle auth failures
          throw new ApiError("Unauthorized. Please login again.", 401);
        }
        throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
      }

      // handle No Content and non-JSON responses safely
      if (response.status === 204) return null;
      const text = await response.text();
      if (!text) return null;
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
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
      // handle both string-message and typed ApiError cases
      const status = error?.status ?? (typeof error?.message === "string" && error.message.includes("401") ? 401 : undefined);
      if (status === 404 || status === 401) return null;
      throw error;
    }
  }

  async getMenuItems(restaurantId: string): Promise<MenuItem[]> {
    const response = await this.fetchData(`api/menu/fullmenu/${restaurantId}`);
    // support multiple response shapes: { data: { menu: [...] } } or { menu: [...] }
    const menu = response?.data?.menu ?? response?.menu ?? [];
    const items = (menu || []).flatMap((section: any) =>
      (section.items || []).map((item: any) => ({
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

  private transformMenuItem(item: any): MenuItem {
    return {
      ...item,
      id: item._id,
    };
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
