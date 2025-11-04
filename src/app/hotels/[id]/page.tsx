import { restaurants } from "../../../data/restaurants";
import MenuItemCard from "@/src/components/MenuItemCard";

export default function RestaurantDetail({ params }: { params: { id: string } }) {
  const restaurant = restaurants.find((r) => r.id === Number(params.id));

  if (!restaurant)
    return <div className="p-10 text-center text-gray-500">Restaurant not found.</div>;

  return (
    <div className="min-h-screen py-10 bg-yellow-50">
      <div className="max-w-6xl px-6 mx-auto">
        <div className="flex flex-col items-center mb-10 overflow-hidden bg-white shadow-md md:flex-row rounded-2xl">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="object-cover w-full h-64 md:w-1/2"
          />
          <div className="p-6 md:w-1/2">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">{restaurant.name}</h2>
            <p className="mb-3 text-gray-500">{restaurant.description}</p>
            <p className="text-sm text-gray-600">
              <strong>Cuisine:</strong> {restaurant.cuisine}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Location:</strong> {restaurant.location}
            </p>
          </div>
        </div>

        <h3 className="mb-4 text-xl font-semibold text-gray-800">Menu</h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurant.menu.map((item: { id: any; }) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
