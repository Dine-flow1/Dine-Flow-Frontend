// services/restaurantService.ts
import axios from "axios";
import { RestaurantData } from "../../types/restaurant";

type RestaurantsResponse = {
  data: RestaurantData[];
};

export const getRestaurants = async (): Promise<RestaurantData[]> => {
<<<<<<< Updated upstream
  try {
    const res = await axios.get<RestaurantsResponse>(
      "http://localhost:9999/api/restaurants/restaurants",
      {
        withCredentials: true, 
      }
    );
=======
  const res = await fetch("http://localhost:9999/api/restaurants/restaurants", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
>>>>>>> Stashed changes

    console.debug("restaurants response", res.data);

    return res.data?.data ?? [];
  } catch (error: any) {
    throw new Error(
      `Failed to fetch restaurants: ${error.response?.status} ${error.response?.statusText}`
    );
  }
};
