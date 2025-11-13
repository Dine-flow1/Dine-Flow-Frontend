"use client";
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

export default function SettingsPage() {
  const settingsRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailReports, setEmailReports] = useState(true);

  useEffect(() => {
    if (settingsRef.current) {
      gsap.fromTo(settingsRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  const Switch = ({ checked, onChange, label, description }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    description: string;
  }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex-1">
        <h4 className="font-medium text-gray-800">{label}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className={`w-12 h-6 rounded-full peer ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        } peer-focus:ring-2 peer-focus:ring-blue-300 transition-colors`}>
          <div className={`absolute top-1 left-1 bg-white rounded-full h-4 w-4 transition-transform ${
            checked ? 'transform translate-x-6' : ''
          }`} />
        </div>
      </label>
    </div>
  );

  return (
    <div ref={settingsRef} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and settings</p>
        </div>
        <Link 
          href="/saasownerdashboard"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">General Settings</h2>
            </div>
            <div className="p-6 space-y-2">
              <Switch
                checked={notifications}
                onChange={setNotifications}
                label="Email Notifications"
                description="Receive email updates about your platform"
              />
              <Switch
                checked={autoBackup}
                onChange={setAutoBackup}
                label="Auto Backup"
                description="Automatically backup your data daily"
              />
              <Switch
                checked={darkMode}
                onChange={setDarkMode}
                label="Dark Mode"
                description="Switch to dark theme (coming soon)"
              />
              <Switch
                checked={emailReports}
                onChange={setEmailReports}
                label="Weekly Reports"
                description="Get weekly analytics reports via email"
              />
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Account Settings</h2>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full text-left p-4 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                <div className="font-medium text-gray-800">Change Password</div>
                <div className="text-sm text-gray-600">Update your account password</div>
              </button>
              <button className="w-full text-left p-4 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                <div className="font-medium text-gray-800">Two-Factor Authentication</div>
                <div className="text-sm text-gray-600">Enhanced security for your account</div>
              </button>
              <button className="w-full text-left p-4 hover:bg-gray-50 rounded-lg border border-red-200 transition-colors">
                <div className="font-medium text-red-600">Delete Account</div>
                <div className="text-sm text-red-500">Permanently delete your account</div>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <h3 className="font-semibold text-gray-800">Admin User</h3>
              <p className="text-sm text-gray-600">SaaS Owner</p>
              <p className="text-xs text-gray-500 mt-2">admin@example.com</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                Export Data
              </button>
              <button className="w-full text-left p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                Generate Report
              </button>
              <button className="w-full text-left p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                API Keys
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Actions */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-semibold text-gray-800">Save Changes</h3>
            <p className="text-sm text-gray-600">Apply your settings changes</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}