// User & Auth Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'dentist' | 'assistant' | 'receptionist' | 'accountant';
  fullName: string;
  avatar?: string;
  branchId: string;
  isActive: boolean;
}

// Patient Types
export interface Patient {
  id: string;
  fullName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
  address: string;
  idCard?: string;
  allergies: string[];
  medicalHistory: string[];
  isHighRisk: boolean;
  lastVisitDate?: string;
  totalDebt: number;
  createdAt: string;
  updatedAt: string;
}

// Appointment Types
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'arrived' | 'in_progress' | 'completed' | 'no_show' | 'cancelled';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  serviceId: string;
  serviceName: string;
  chairId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
  branchId: string;
  createdAt: string;
}

// Service Types
export interface Service {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  minPrice: number;
  standardDuration: number;
  bufferTime: number;
  colorCode: string;
  requireToothSelection: boolean;
  recallPeriodDays: number;
  isActive: boolean;
}

// Medical Record Types
export interface MedicalRecord {
  id: string;
  patientId: string;
  appointmentId?: string;
  date: string;
  chiefComplaint: string;
  diagnosis: string;
  treatmentPlan: string;
  notes: string;
  teethConditions: ToothCondition[];
  createdBy: string;
  createdAt: string;
}

export interface ToothCondition {
  toothNumber: string;
  surfaces: ('O' | 'M' | 'D' | 'B' | 'L')[];
  condition: 'healthy' | 'decay' | 'filling' | 'crown' | 'missing' | 'implant' | 'root_canal';
  color?: string;
  treatment?: string;
}

// Billing Types
export type PaymentStatus = 'unpaid' | 'partial' | 'paid' | 'refunded';

export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  appointmentId?: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  total: number;
  paidAmount: number;
  remainingAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: 'cash' | 'bank_transfer' | 'card' | 'insurance';
  notes?: string;
  createdBy: string;
  createdAt: string;
}

export interface InvoiceItem {
  serviceId: string;
  serviceName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
  teeth?: string[];
}

// Inventory Types
export interface InventoryItem {
  id: string;
  name: string;
  category: 'medicine' | 'material' | 'equipment';
  unit: string;
  quantity: number;
  minStockLevel: number;
  costPrice: number;
  sellingPrice: number;
  expiryDate?: string;
  batchNumber?: string;
  isPrescriptionDrug: boolean;
  isActive: boolean;
}

// Branch Types
export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  isActive: boolean;
}

export interface Chair {
  id: string;
  branchId: string;
  name: string;
  roomType: 'general' | 'surgery' | 'xray';
  status: 'available' | 'in_use' | 'maintenance';
  allowedServices: string[];
}

// Dashboard Stats
export interface DashboardStats {
  todayAppointments: number;
  completedAppointments: number;
  totalPatients: number;
  newPatientsThisMonth: number;
  todayRevenue: number;
  monthRevenue: number;
  pendingPayments: number;
  lowStockItems: number;
}
