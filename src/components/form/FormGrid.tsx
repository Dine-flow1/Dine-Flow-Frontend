interface FormGridProps {
  children: React.ReactNode;
  cols?: 1 | 2;
  className?: string;
}

export const FormGrid = ({ children, cols = 2, className = '' }: FormGridProps) => {
  const gridClass = cols === 2 ? 'grid grid-cols-1 gap-6 md:grid-cols-2' : 'grid grid-cols-1 gap-6';
  
  return (
    <div className={`${gridClass} ${className}`}>
      {children}
    </div>
  );
};