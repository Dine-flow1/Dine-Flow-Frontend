interface CardProps {
  title: string;
  rating: number;
  orders: number;
  trending?: boolean;
  imageUrl: string;
  description: string;
  price: string;
}

const Card = ({ 
  title, 
  rating, 
  orders, 
  trending = false, 
  imageUrl, 
  description,
  price 
}: CardProps) => {
  return (
    <div className="overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-xl rounded-2xl hover:scale-105 hover:shadow-2xl group">
      {/* Image Container with Trending Badge */}
      <div className="relative h-48 overflow-hidden">
        <div className="flex items-center justify-center w-full h-full bg-linear-to-br from-primary-100 to-secondary-100">
          <span className="text-4xl">🍽️</span>
        </div>
        
        {trending && (
          <div className="absolute flex items-center px-3 py-1 space-x-1 text-xs font-bold text-white rounded-full shadow-lg top-4 left-4 bg-linear-to-r from-red-500 to-pink-500">
            <span>🔥</span>
            <span>Trending</span>
          </div>
        )}
        
        {/* Price */}
        <div className="absolute px-3 py-1 text-sm font-bold text-gray-900 rounded-full shadow-lg top-4 right-4 bg-white/95 backdrop-blur-sm">
          {price}
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-10" />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="flex-1 font-serif text-xl font-bold text-gray-900">{title}</h3>
          <div className="flex items-center px-2 py-1 ml-2 space-x-1 rounded-full bg-yellow-50">
            <span className="text-sm text-yellow-500">⭐</span>
            <span className="text-sm font-semibold text-yellow-700">{rating}</span>
          </div>
        </div>
        
        <p className="mb-4 text-sm leading-relaxed text-gray-600">{description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="px-3 py-1 text-sm text-gray-500 rounded-full bg-gray-50">
            {orders.toLocaleString()} orders
          </span>
          <button className="text-sm font-medium transition-colors text-primary-600 hover:text-primary-700">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;