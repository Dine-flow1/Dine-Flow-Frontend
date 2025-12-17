export interface RestaurantOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  restaurants: string[]; // Array of restaurant IDs
  subscription: {
    plan: 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'expired' | 'cancelled';
    expiresAt: string;
  };
  settings: {
    notifications: boolean;
    autoApproveReservations: boolean;
    language: string;
    timezone: string;
  };
}

export interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  restaurantId: string;
  role: 'manager' | 'assistant' | 'supervisor';
  permissions: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: 'kitchen' | 'service' | 'bar' | 'management' | 'cleaning';
  hireDate: string;
  salary: number;
  status: 'active' | 'on-leave' | 'inactive';
  schedule: WorkSchedule;
}

export interface WorkSchedule {
  monday: Shift[];
  tuesday: Shift[];
  wednesday: Shift[];
  thursday: Shift[];
  friday: Shift[];
  saturday: Shift[];
  sunday: Shift[];
}

export interface Shift {
  start: string;
  end: string;
  type: 'morning' | 'afternoon' | 'evening';
}

export interface FinancialRecord {
  id: string;
  date: string;
  type: 'revenue' | 'expense';
  category: string;
  amount: number;
  description: string;
  restaurantId: string;
}