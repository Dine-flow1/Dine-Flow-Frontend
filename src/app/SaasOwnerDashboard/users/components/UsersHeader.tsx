import Link from 'next/link';

export default function UsersHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
        <p className="text-gray-600">Manage all users, restaurants, managers, and delivery personnel</p>
      </div>
      <Link 
        href="/saasownerdashboard"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
      >
        <span>←</span>
        <span>Back to Dashboard</span>
      </Link>
    </div>
  );
}