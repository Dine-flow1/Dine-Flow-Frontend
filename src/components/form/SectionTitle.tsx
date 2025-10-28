interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionTitle = ({ title, subtitle, centered = false }: SectionTitleProps) => {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
      <h2 className="mb-4 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;