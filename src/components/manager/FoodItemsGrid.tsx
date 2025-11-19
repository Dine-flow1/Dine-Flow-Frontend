import { FoodItem } from '../../types/manager';

interface FoodItemsGridProps {
  items: FoodItem[];
  onEditItem: (item: FoodItem) => void;
  onDeleteItem: (id: string) => void;
}

export const FoodItemsGrid = ({ items, onEditItem, onDeleteItem }: FoodItemsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-3">
            <div className="text-4xl">{item.image}</div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEditItem(item)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteItem(item.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
          
          <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{item.category}</p>
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">{item.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-green-600">${item.price}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.isAvailable 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {item.isAvailable ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};