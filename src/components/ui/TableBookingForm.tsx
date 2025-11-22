interface TableBookingFormProps {
  restaurant: any;
  tables?: any[];
}

export default function TableBookingForm({ restaurant, tables }: TableBookingFormProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Book a Table at {restaurant.restaurantName}</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input 
            type="date" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
          <input 
            type="time" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option>1 person</option>
            <option>2 people</option>
            <option>3 people</option>
            <option>4 people</option>
            <option>5+ people</option>
          </select>
        </div>
        
        <button className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors font-semibold">
          Book Table
        </button>
      </div>
    </div>
  );
}