interface Props {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  trend?: string;
  trendColor?: "green" | "red";
}

export default function StatCard({ icon, title, value, trend, trendColor = "green" }: Props) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-2">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trendColor === "green" ? "text-green-600" : "text-red-600"}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}
