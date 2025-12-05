// services/restaurantService.ts
import { RestaurantData } from "../../types/restaurant";

type RestaurantsResponse = {
  data: RestaurantData[];
};

export const getRestaurants = async (): Promise<RestaurantData[]> => {
  const res = await fetch("http://localhost:9999/api/restaurants/restaurants", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch restaurants: ${res.status} ${res.statusText}`);
  }

  const data: RestaurantsResponse = await res.json();

  console.debug("restaurants response", data);

  return data?.data ?? [];
};
