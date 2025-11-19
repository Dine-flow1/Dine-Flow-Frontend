// src/components/manager/ModalActions.tsx
interface ModalActionsProps {
  isEditing: boolean;
  onClose: () => void;
  onSave: () => void;
  isFormValid: boolean; // This should only be boolean
}

export const ModalActions = ({
  isEditing,
  onClose,
  onSave,
  isFormValid
}: ModalActionsProps) => {
  return (
    <div className="flex justify-end space-x-3">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={!isFormValid}
        className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isEditing ? 'Update Item' : 'Add Item'}
      </button>
    </div>
  );
};