export default function DashboardPreview() {
  return (
    <div className="relative">
      <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
        <DashboardHeader />
        <MetricsGrid />
        <StatusList />
      </div>

      <GrowthBadge />
      <HappyOwnersBadge />
    </div>
  );
}

function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Restaurant Dashboard</h3>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-yellow-400 text-lg">★</span>
        ))}
      </div>
    </div>
  );
}

function MetricsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <MetricCard bgColor="bg-blue-50" textColor="text-blue-600" label="Today's Orders" value="42" />
      <MetricCard bgColor="bg-green-50" textColor="text-green-600" label="Revenue" value="$1,248" />
    </div>
  );
}

type MetricCardProps = {
  bgColor: string;
  textColor: string;
  label: string;
  value: string | number;
};

function MetricCard({ bgColor, textColor, label, value }: MetricCardProps) {
  return (
    <div className={`${bgColor} rounded-lg p-4`}>
      <div className={`text-2xl font-bold ${textColor}`}>{value}</div>
      <div className={`text-sm ${textColor.replace('600', '800')}`}>{label}</div>
    </div>
  );
}

function StatusList() {
  return (
    <div className="space-y-3">
      <StatusRow label="Pending Orders" value="8" />
      <StatusRow label="Completed Today" value="34" />
      <StatusRow label="Customer Rating" value="4.8/5" />
    </div>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function GrowthBadge() {
  return (
    <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
      +300% Growth
    </div>
  );
}

function HappyOwnersBadge() {
  return (
    <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
      98% Happy Owners
    </div>
  );
}
