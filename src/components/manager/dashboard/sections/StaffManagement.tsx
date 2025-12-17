'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Users, Clock, Calendar, CheckCircle, XCircle, Plus, Edit, Eye } from 'lucide-react';

interface StaffMember {
  id: number;
  name: string;
  role: 'chef' | 'waiter' | 'bartender' | 'host' | 'cleaner' | 'manager';
  status: 'active' | 'break' | 'off-duty';
  shift: string;
  startTime: string;
  endTime: string;
  todayHours: string;
  performance: number; // 1-10
  tasks: string[];
  contact?: string;
}

interface ShiftSchedule {
  day: string;
  morning: StaffMember[];
  afternoon: StaffMember[];
  evening: StaffMember[];
}

export function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([
    { id: 1, name: 'John Smith', role: 'chef', status: 'active', shift: 'Morning', startTime: '8:00 AM', endTime: '4:00 PM', todayHours: '6h 30m', performance: 9, tasks: ['Prep kitchen', 'Cook orders'], contact: 'john@restaurant.com' },
    { id: 2, name: 'Sarah Johnson', role: 'waiter', status: 'break', shift: 'Morning', startTime: '9:00 AM', endTime: '5:00 PM', todayHours: '5h 45m', performance: 8, tasks: ['Serve tables', 'Take orders'] },
    { id: 3, name: 'Mike Wilson', role: 'bartender', status: 'active', shift: 'Evening', startTime: '4:00 PM', endTime: '12:00 AM', todayHours: '4h 15m', performance: 7, tasks: ['Prepare drinks', 'Stock bar'] },
    { id: 4, name: 'Emma Davis', role: 'host', status: 'active', shift: 'Morning', startTime: '10:00 AM', endTime: '6:00 PM', todayHours: '5h 00m', performance: 9, tasks: ['Greet customers', 'Manage reservations'] },
    { id: 5, name: 'Alex Brown', role: 'cleaner', status: 'off-duty', shift: 'Evening', startTime: '6:00 PM', endTime: '2:00 AM', todayHours: '0h 00m', performance: 6, tasks: ['Clean tables', 'Kitchen cleanup'] },
    { id: 6, name: 'Lisa Chen', role: 'waiter', status: 'active', shift: 'Afternoon', startTime: '12:00 PM', endTime: '8:00 PM', todayHours: '3h 30m', performance: 8, tasks: ['Serve tables', 'Customer service'] },
  ]);

  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    gsap.from('.staff-card', {
      duration: 0.5,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, []);

  const roles = ['all', 'chef', 'waiter', 'bartender', 'host', 'cleaner', 'manager'];
  const statuses = ['all', 'active', 'break', 'off-duty'];

  const filteredStaff = staff.filter(member => {
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesRole && matchesStatus;
  });

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'chef': return { color: 'text-red-600', bgColor: 'bg-red-50', label: 'Chef' };
      case 'waiter': return { color: 'text-blue-600', bgColor: 'bg-blue-50', label: 'Waiter' };
      case 'bartender': return { color: 'text-purple-600', bgColor: 'bg-purple-50', label: 'Bartender' };
      case 'host': return { color: 'text-green-600', bgColor: 'bg-green-50', label: 'Host' };
      case 'cleaner': return { color: 'text-gray-600', bgColor: 'bg-gray-50', label: 'Cleaner' };
      case 'manager': return { color: 'text-yellow-600', bgColor: 'bg-yellow-50', label: 'Manager' };
      default: return { color: 'text-gray-600', bgColor: 'bg-gray-50', label: 'Unknown' };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active': return { color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle, label: 'Active' };
      case 'break': return { color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: Clock, label: 'On Break' };
      case 'off-duty': return { color: 'text-gray-600', bgColor: 'bg-gray-50', icon: XCircle, label: 'Off Duty' };
      default: return { color: 'text-gray-600', bgColor: 'bg-gray-50', icon: Users, label: 'Unknown' };
    }
  };

  const updateStaffStatus = (id: number, newStatus: StaffMember['status']) => {
    setStaff(staff.map(member => 
      member.id === id ? { ...member, status: newStatus } : member
    ));
  };

  const stats = {
    total: staff.length,
    active: staff.filter(s => s.status === 'active').length,
    onBreak: staff.filter(s => s.status === 'break').length,
    avgPerformance: (staff.reduce((sum, s) => sum + s.performance, 0) / staff.length).toFixed(1),
  };

  const weeklySchedule: ShiftSchedule[] = [
    {
      day: 'Monday',
      morning: staff.filter(s => s.shift === 'Morning'),
      afternoon: staff.filter(s => s.shift === 'Afternoon'),
      evening: staff.filter(s => s.shift === 'Evening'),
    },
    {
      day: 'Tuesday',
      morning: staff.filter(s => s.shift === 'Morning'),
      afternoon: staff.filter(s => s.shift === 'Afternoon'),
      evening: staff.filter(s => s.shift === 'Evening'),
    },
    // ... Add other days
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
          <p className="text-gray-600">Manage staff schedules, shifts, and performance</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5" />
          <span>Add Staff</span>
        </button>
      </div>

      {/* Staff Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Staff', value: stats.total, icon: Users, color: 'text-blue-600' },
          { label: 'Active Now', value: stats.active, icon: CheckCircle, color: 'text-green-600' },
          { label: 'On Break', value: stats.onBreak, icon: Clock, color: 'text-yellow-600' },
          { label: 'Avg Performance', value: stats.avgPerformance, icon: Users, color: 'text-purple-600' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-sm text-gray-600 mr-3">Role:</span>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role === 'all' ? 'All Roles' : getRoleConfig(role).label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="text-sm text-gray-600 mr-3">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : getStatusConfig(status).label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Calendar className="inline h-4 w-4 mr-2" />
            {showSchedule ? 'Hide Schedule' : 'View Schedule'}
          </button>
        </div>
      </div>

      {showSchedule ? (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-6">Weekly Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left">Day</th>
                  <th className="py-3 px-4 text-left">Morning (8AM-4PM)</th>
                  <th className="py-3 px-4 text-left">Afternoon (12PM-8PM)</th>
                  <th className="py-3 px-4 text-left">Evening (4PM-12AM)</th>
                </tr>
              </thead>
              <tbody>
                {weeklySchedule.map((day, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="py-4 px-4 font-semibold">{day.day}</td>
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        {day.morning.map(staff => (
                          <div key={staff.id} className="flex items-center space-x-2">
                            <span className={`h-2 w-2 rounded-full ${
                              getStatusConfig(staff.status).color.replace('text', 'bg')
                            }`}></span>
                            <span>{staff.name}</span>
                            <span className="text-xs text-gray-500">({staff.role})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        {day.afternoon.map(staff => (
                          <div key={staff.id} className="flex items-center space-x-2">
                            <span className={`h-2 w-2 rounded-full ${
                              getStatusConfig(staff.status).color.replace('text', 'bg')
                            }`}></span>
                            <span>{staff.name}</span>
                            <span className="text-xs text-gray-500">({staff.role})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        {day.evening.map(staff => (
                          <div key={staff.id} className="flex items-center space-x-2">
                            <span className={`h-2 w-2 rounded-full ${
                              getStatusConfig(staff.status).color.replace('text', 'bg')
                            }`}></span>
                            <span>{staff.name}</span>
                            <span className="text-xs text-gray-500">({staff.role})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((member) => {
            const roleConfig = getRoleConfig(member.role);
            const statusConfig = getStatusConfig(member.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div key={member.id} className="staff-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  {/* Staff Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`h-12 w-12 ${roleConfig.bgColor} rounded-full flex items-center justify-center`}>
                        <span className={`font-bold ${roleConfig.color}`}>
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{member.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${roleConfig.bgColor} ${roleConfig.color}`}>
                            {roleConfig.label}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded flex items-center ${statusConfig.bgColor} ${statusConfig.color}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedStaff(member)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Staff Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shift:</span>
                      <span className="font-medium">{member.shift}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Hours:</span>
                      <span className="font-medium">{member.startTime} - {member.endTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Today's Hours:</span>
                      <span className="font-medium">{member.todayHours}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Performance:</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              member.performance >= 8 ? 'bg-green-500' :
                              member.performance >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${member.performance * 10}%` }}
                          ></div>
                        </div>
                        <span className="font-medium">{member.performance}/10</span>
                      </div>
                    </div>
                  </div>

                  {/* Current Tasks */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Current Tasks:</p>
                    <div className="space-y-1">
                      {member.tasks.slice(0, 2).map((task, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="h-1 w-1 bg-gray-400 rounded-full mr-2"></div>
                          {task}
                        </div>
                      ))}
                      {member.tasks.length > 2 && (
                        <p className="text-xs text-gray-500">+{member.tasks.length - 2} more tasks</p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateStaffStatus(member.id, member.status === 'active' ? 'break' : 'active')}
                      className={`py-2 rounded-lg font-medium ${
                        member.status === 'active'
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {member.status === 'active' ? 'Send to Break' : 'Mark Active'}
                    </button>
                    <button
                      onClick={() => setSelectedStaff(member)}
                      className="py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Staff Details</h3>
                <button
                  onClick={() => setSelectedStaff(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`h-16 w-16 ${getRoleConfig(selectedStaff.role).bgColor} rounded-full flex items-center justify-center`}>
                    <span className={`text-2xl font-bold ${getRoleConfig(selectedStaff.role).color}`}>
                      {selectedStaff.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{selectedStaff.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleConfig(selectedStaff.role).bgColor} ${getRoleConfig(selectedStaff.role).color}`}>
                        {getRoleConfig(selectedStaff.role).label}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusConfig(selectedStaff.status).bgColor} ${getStatusConfig(selectedStaff.status).color}`}>
                        {getStatusConfig(selectedStaff.status).label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Shift Schedule</p>
                    <p className="font-bold text-gray-800">{selectedStaff.shift} Shift</p>
                    <p className="text-sm text-gray-600">{selectedStaff.startTime} - {selectedStaff.endTime}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Today's Hours</p>
                    <p className="font-bold text-gray-800">{selectedStaff.todayHours}</p>
                    <p className="text-sm text-gray-600">Worked so far</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Performance Score</p>
                    <p className="font-bold text-gray-800">{selectedStaff.performance}/10</p>
                    <p className="text-sm text-gray-600">
                      {selectedStaff.performance >= 8 ? 'Excellent' :
                       selectedStaff.performance >= 6 ? 'Good' : 'Needs Improvement'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Contact</p>
                    <p className="font-bold text-gray-800">{selectedStaff.contact || 'N/A'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Assigned Tasks</h4>
                  <div className="space-y-2">
                    {selectedStaff.tasks.map((task, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                          <span>{task}</span>
                        </div>
                        <span className="text-sm text-gray-500">Today</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    onClick={() => setSelectedStaff(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // Handle edit staff
                      setSelectedStaff(null);
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="inline h-4 w-4 mr-2" />
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Panel */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Staff Management Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 bg-white rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <Clock className="h-6 w-6 text-blue-600 mb-2" />
            <span className="font-medium">Schedule Shift</span>
          </button>
          <button className="p-4 bg-white rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <Calendar className="h-6 w-6 text-green-600 mb-2" />
            <span className="font-medium">View Rota</span>
          </button>
          <button className="p-4 bg-white rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <Users className="h-6 w-6 text-yellow-600 mb-2" />
            <span className="font-medium">Team Performance</span>
          </button>
          <button className="p-4 bg-white rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
            <CheckCircle className="h-6 w-6 text-purple-600 mb-2" />
            <span className="font-medium">Approve Time-off</span>
          </button>
        </div>
      </div>
    </div>
  );
}