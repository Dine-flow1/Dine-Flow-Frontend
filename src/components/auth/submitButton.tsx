interface SubmitButtonProps {
  label: string;
  loading?: boolean;
  color?: "blue" | "green";
}

export default function SubmitButton({ label, loading, color = "blue" }: SubmitButtonProps) {
  const base = color === "blue" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700";

  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full ${base} text-white py-3 rounded-xl transition font-semibold`}
    >
      {loading ? "Please wait..." : label}
    </button>
  );
}
