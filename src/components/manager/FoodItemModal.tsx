import { FoodItem } from '../../types/manager';
import { FoodItemForm } from './FoodItemForm';
import { ModalActions } from '../../components/manager/ModalAction';

interface FoodItemModalProps {
  isEditing: boolean;
  newItem: Omit<FoodItem, 'id'>;
  onNewItemChange: (item: Omit<FoodItem, 'id'>) => void;
  onSave: () => void;
  onClose: () => void;
}

export const FoodItemModal = ({ 
  isEditing, 
  newItem, 
  onNewItemChange, 
  onSave, 
  onClose 
}: FoodItemModalProps) => {
  const updateField = (field: keyof Omit<FoodItem, 'id'>, value: any) => {
    onNewItemChange({ ...newItem, [field]: value });
  };

  const addIngredient = () => {
    onNewItemChange({
      ...newItem,
      ingredients: [...newItem.ingredients, '']
    });
  };

  const updateIngredient = (index: number, value: string) => {
    onNewItemChange({
      ...newItem,
      ingredients: newItem.ingredients.map((ing, i) => i === index ? value : ing)
    });
  };

  const removeIngredient = (index: number) => {
    onNewItemChange({
      ...newItem,
      ingredients: newItem.ingredients.filter((_, i) => i !== index)
    });
  };

  // In FoodItemModal.tsx - make sure this returns boolean
  const isFormValid = Boolean(
    newItem.name && 
    newItem.category && 
    newItem.description && 
    newItem.price > 0
  );

  return (
    <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {isEditing ? 'Edit Food Item' : 'Add New Food Item'}
        </h3>
        
        <FoodItemForm
          newItem={newItem}
          updateField={updateField}
          updateIngredient={updateIngredient}
          removeIngredient={removeIngredient}
          addIngredient={addIngredient}
        />

        <ModalActions
          isEditing={isEditing}
          onClose={onClose}
          onSave={onSave}
          isFormValid={isFormValid}
        />
      </div>
    </div>
  );
};