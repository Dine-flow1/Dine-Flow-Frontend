// src/components/manager/TopFoodItems.tsx
import { TopFoodItem } from '../../types/manager';

interface TopFoodItemsProps {
  items: TopFoodItem[];
}

export const TopFoodItems = ({ items }: TopFoodItemsProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Top Selling Items This Month</h3>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                {index + 1}
              </div>
              
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-lg flex items-center justify-center text-2xl">
                {item.image}
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.category}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-gray-500">{item.sales} sold</span>
                  <span className="text-sm font-medium text-green-600">${item.revenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ 
                    width: `${(item.sales / Math.max(...items.map(i => i.sales))) * 100}%` 
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700 w-12 text-right">
                {Math.round((item.sales / Math.max(...items.map(i => i.sales))) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};