interface Props {
  onAddToCart: () => void;
  onOrderNow: () => void;
}

export default function ActionButtons({ onAddToCart, onOrderNow }: Props) {
  return (
    <div className="flex gap-3 pt-4 border-t border-gray-100">
      <button
        onClick={onAddToCart}
        className="flex-1 px-4 py-3 font-semibold text-gray-700 transition-colors duration-200 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 hover:border-gray-400"
      >
        🛒 Add to Cart
      </button>
      <button
        onClick={onOrderNow}
        className="flex-1 px-4 py-3 font-semibold text-white transition-colors duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600 hover:shadow-lg"
      >
        🚀 Order Now
      </button>
    </div>
  );
}
