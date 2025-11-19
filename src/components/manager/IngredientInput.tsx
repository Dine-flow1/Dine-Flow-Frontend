interface IngredientInputProps {
  index: number;
  ingredient: string;
  onUpdate: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  showRemove: boolean;
}

export const IngredientInput = ({
  index,
  ingredient,
  onUpdate,
  onRemove,
  showRemove
}: IngredientInputProps) => {
  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={ingredient}
        onChange={(e) => onUpdate(index, e.target.value)}
        placeholder={`Ingredient ${index + 1}`}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
      {showRemove && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Remove
        </button>
      )}
    </div>
  );
};