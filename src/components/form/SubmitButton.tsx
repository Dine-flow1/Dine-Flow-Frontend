import { ButtonHTMLAttributes } from 'react';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

const SubmitButton = ({ loading = false, children, ...props }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full bg-primary-600 hover:bg-primary-700 bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;