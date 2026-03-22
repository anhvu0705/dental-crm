import { create } from 'zustand';
import { User, Patient, Appointment, Service, Invoice, DashboardStats } from '@/types';

interface StoreState {
  // Auth
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;

  // Data
  currentBranchId: string;
  patients: Patient[];
  appointments: Appointment[];
  services: Service[];
  invoices: Invoice[];
  stats: DashboardStats;

  // UI State
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@dentalcare.vn',
    role: 'admin',
    fullName: 'Nguyễn Văn Admin',
    branchId: '1',
    isActive: true,
  },
  {
    id: '2',
    username: 'doctor',
    email: 'doctor@dentalcare.vn',
    role: 'dentist',
    fullName: 'Bs. Trần Thị B',
    branchId: '1',
    isActive: true,
  },
];

export const useStore = create<StoreState>((set) => ({
  // Auth
  isAuthenticated: false,
  currentUser: null,
  login: (username, password) => {
    const user = MOCK_USERS.find(u => u.username === username);
    if (user && password === 'password') {
      set({ isAuthenticated: true, currentUser: user });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false, currentUser: null }),

  // Data
  currentBranchId: '1',
  patients: [],
  appointments: [],
  services: [],
  invoices: [],
  stats: {
    todayAppointments: 12,
    completedAppointments: 8,
    totalPatients: 245,
    newPatientsThisMonth: 18,
    todayRevenue: 12500000,
    monthRevenue: 185000000,
    pendingPayments: 3,
    lowStockItems: 2,
  },

  // UI State
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
