interface SelectFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
}

export default function SelectField({ name, value, onChange, options }: SelectFieldProps) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
