// services/restaurantService.ts
import axios from "axios";
import { RestaurantData } from "../../types/restaurant";

type RestaurantsResponse = {
  data: RestaurantData[];
};

export const getRestaurants = async (): Promise<RestaurantData[]> => {
  try {
    const res = await axios.get<RestaurantsResponse>(
      "http://localhost:9999/api/restaurants/restaurants",
      {
        withCredentials: true, 
      }
    );

    console.debug("restaurants response", res.data);

    return res.data?.data ?? [];
  } catch (error: any) {
    throw new Error(
      `Failed to fetch restaurants: ${error.response?.status} ${error.response?.statusText}`
    );
  }
};
