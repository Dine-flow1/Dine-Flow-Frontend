interface Props {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export default function QuantitySelector({ quantity, onDecrease, onIncrease }: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-gray-700">Quantity</span>
      <div className="flex items-center gap-2">
        <button
          onClick={onDecrease}
          className="w-8 h-8 text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          -
        </button>
        <span className="w-8 font-semibold text-center">{quantity}</span>
        <button
          onClick={onIncrease}
          className="w-8 h-8 text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          +
        </button>
      </div>
    </div>
  );
}
