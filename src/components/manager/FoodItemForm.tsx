import { FoodItem } from '../../types/manager';
import { IngredientInput } from './IngredientInput';

interface FoodItemFormProps {
  newItem: Omit<FoodItem, 'id'>;
  updateField: (field: keyof Omit<FoodItem, 'id'>, value: any) => void;
  updateIngredient: (index: number, value: string) => void;
  removeIngredient: (index: number) => void;
  addIngredient: () => void;
}

export const FoodItemForm = ({
  newItem,
  updateField,
  updateIngredient,
  removeIngredient,
  addIngredient
}: FoodItemFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => updateField('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
        <input
          type="number"
          value={newItem.price}
          onChange={(e) => updateField('price', parseFloat(e.target.value) || 0)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          min="0"
          step="0.01"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
        <input
          type="text"
          value={newItem.category}
          onChange={(e) => updateField('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Prep Time (min) *</label>
        <input
          type="number"
          value={newItem.preparationTime}
          onChange={(e) => updateField('preparationTime', parseInt(e.target.value) || 15)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          min="1"
          required
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          value={newItem.description}
          onChange={(e) => updateField('description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
        <div className="space-y-2">
          {newItem.ingredients.map((ingredient, index) => (
            <IngredientInput
              key={index}
              index={index}
              ingredient={ingredient}
              onUpdate={updateIngredient}
              onRemove={removeIngredient}
              showRemove={newItem.ingredients.length > 1}
            />
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center space-x-1"
          >
            <span>+</span>
            <span>Add Another Ingredient</span>
          </button>
        </div>
      </div>

      <div className="md:col-span-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={newItem.isAvailable}
            onChange={(e) => updateField('isAvailable', e.target.checked)}
            className="rounded border-gray-300 text-green-500 focus:ring-green-500"
          />
          <span className="text-sm font-medium text-gray-700">Available for ordering</span>
        </label>
      </div>
    </div>
  );
};