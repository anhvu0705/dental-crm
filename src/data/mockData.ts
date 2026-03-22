import type {
  Patient, User, Role, Appointment, Service, ServiceCategory,
  InventoryItem, Diagnosis, ClinicChair, Invoice, MedicalRecord,
  Tooth, DashboardStats
} from '@/types';
import {
  AppointmentStatus, PaymentStatus, ToothCondition, StaffRole, 
  RoomType, CommissionType
} from '@/types';

const DataScope = {
  PERSONAL: 'Personal',
  BRANCH: 'Branch',
  GLOBAL: 'Global'
} as const;

// ==================== USERS & ROLES ====================
export const mockRoles: Role[] = [
  {
    role_id: 'R001',
    role_name: StaffRole.ADMIN,
    description: 'Quản trị viên hệ thống',
    permissions: [
      { permission_id: 'P001', module: 'patients', actions: ['view', 'create', 'edit', 'delete', 'export'] },
      { permission_id: 'P002', module: 'appointments', actions: ['view', 'create', 'edit', 'delete', 'export'] },
      { permission_id: 'P003', module: 'medical_records', actions: ['view', 'create', 'edit', 'delete', 'export'] },
      { permission_id: 'P004', module: 'billing', actions: ['view', 'create', 'edit', 'delete', 'export'] },
      { permission_id: 'P005', module: 'inventory', actions: ['view', 'create', 'edit', 'delete', 'export'] },
      { permission_id: 'P006', module: 'reports', actions: ['view', 'export'] },
      { permission_id: 'P007', module: 'settings', actions: ['view', 'create', 'edit', 'delete'] },
      { permission_id: 'P008', module: 'users', actions: ['view', 'create', 'edit', 'delete'] },
    ]
  },
  {
    role_id: 'R002',
    role_name: StaffRole.DENTIST,
    description: 'Bác sĩ nha khoa',
    permissions: [
      { permission_id: 'P009', module: 'patients', actions: ['view', 'create', 'edit'] },
      { permission_id: 'P010', module: 'appointments', actions: ['view', 'create', 'edit'] },
      { permission_id: 'P011', module: 'medical_records', actions: ['view', 'create', 'edit'] },
      { permission_id: 'P012', module: 'billing', actions: ['view'] },
    ]
  },
  {
    role_id: 'R003',
    role_name: StaffRole.RECEPTIONIST,
    description: 'Lễ tân',
    permissions: [
      { permission_id: 'P013', module: 'patients', actions: ['view', 'create', 'edit'] },
      { permission_id: 'P014', module: 'appointments', actions: ['view', 'create', 'edit'] },
      { permission_id: 'P015', module: 'billing', actions: ['view', 'create'] },
    ]
  },
  {
    role_id: 'R004',
    role_name: StaffRole.ACCOUNTANT,
    description: 'Kế toán',
    permissions: [
      { permission_id: 'P016', module: 'billing', actions: ['view', 'create', 'edit', 'export'] },
      { permission_id: 'P017', module: 'reports', actions: ['view', 'export'] },
      { permission_id: 'P018', module: 'inventory', actions: ['view'] },
    ]
  },
  {
    role_id: 'R005',
    role_name: StaffRole.ASSISTANT,
    description: 'Phụ tá',
    permissions: [
      { permission_id: 'P019', module: 'patients', actions: ['view'] },
      { permission_id: 'P020', module: 'appointments', actions: ['view', 'edit'] },
      { permission_id: 'P021', module: 'medical_records', actions: ['view'] },
      { permission_id: 'P022', module: 'inventory', actions: ['view', 'edit'] },
    ]
  },
];

export const mockUsers: User[] = [
  {
    user_id: 'U001',
    username: 'admin',
    staff_id: 'S001',
    role_id: 'R001',
    data_scope: DataScope.GLOBAL as any,
    is_active: true,
    last_login: new Date('2024-01-15 08:30:00'),
    mfa_enabled: true,
    full_name: 'Nguyễn Văn Admin',
    email: 'admin@dentalcare.vn',
    phone: '0901234567',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
  {
    user_id: 'U002',
    username: 'bs.nguyen',
    staff_id: 'S002',
    role_id: 'R002',
    data_scope: DataScope.BRANCH,
    is_active: true,
    last_login: new Date('2024-01-15 09:00:00'),
    mfa_enabled: false,
    full_name: 'BS. Nguyễn Văn A',
    email: 'bs.nguyen@dentalcare.vn',
    phone: '0901234568',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bsnguyen'
  },
  {
    user_id: 'U003',
    username: 'bs.tran',
    staff_id: 'S003',
    role_id: 'R002',
    data_scope: DataScope.BRANCH,
    is_active: true,
    last_login: new Date('2024-01-14 17:30:00'),
    mfa_enabled: false,
    full_name: 'BS. Trần Thị B',
    email: 'bs.tran@dentalcare.vn',
    phone: '0901234569',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bstran'
  },
  {
    user_id: 'U004',
    username: 'letan',
    staff_id: 'S004',
    role_id: 'R003',
    data_scope: DataScope.BRANCH,
    is_active: true,
    last_login: new Date('2024-01-15 07:45:00'),
    mfa_enabled: false,
    full_name: 'Lê Thị Tân',
    email: 'letan@dentalcare.vn',
    phone: '0901234570',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=letan'
  },
  {
    user_id: 'U005',
    username: 'ketoan',
    staff_id: 'S005',
    role_id: 'R004',
    data_scope: DataScope.BRANCH,
    is_active: true,
    last_login: new Date('2024-01-15 08:00:00'),
    mfa_enabled: true,
    full_name: 'Phạm Văn Kế',
    email: 'ketoan@dentalcare.vn',
    phone: '0901234571',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ketoan'
  },
  {
    user_id: 'U006',
    username: 'phuta',
    staff_id: 'S006',
    role_id: 'R005',
    data_scope: DataScope.PERSONAL as any,
    is_active: true,
    last_login: new Date('2024-01-14 16:00:00'),
    mfa_enabled: false,
    full_name: 'Hoàng Thị Phụ',
    email: 'phuta@dentalcare.vn',
    phone: '0901234572',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=phuta'
  },
];

// ==================== SERVICE CATEGORIES ====================
export const mockServiceCategories: ServiceCategory[] = [
  { category_id: 'CAT001', category_name: 'Khám tổng quát', description: 'Các dịch vụ khám tổng quát' },
  { category_id: 'CAT002', category_name: 'Điều trị tủy', description: 'Các dịch vụ điều trị tủy răng' },
  { category_id: 'CAT003', category_name: 'Phục hình răng', description: 'Các dịch vụ phục hình răng' },
  { category_id: 'CAT004', category_name: 'Chỉnh nha', description: 'Các dịch vụ chỉnh nha' },
  { category_id: 'CAT005', category_name: 'Cấy ghép Implant', description: 'Các dịch vụ cấy ghép Implant' },
  { category_id: 'CAT006', category_name: 'Điều trị nha chu', description: 'Các dịch vụ điều trị nha chu' },
  { category_id: 'CAT007', category_name: 'Nhổ răng', description: 'Các dịch vụ nhổ răng' },
  { category_id: 'CAT008', category_name: 'Tẩy trắng răng', description: 'Các dịch vụ tẩy trắng răng' },
];

// ==================== SERVICES ====================
export const mockServices: Service[] = [
  {
    service_id: 'DV001',
    service_name: 'Khám tổng quát',
    category_id: 'CAT001',
    base_price: 100000,
    min_price: 50000,
    standard_duration: 30,
    buffer_time: 10,
    require_tooth_selection: false,
    color_code: '#10B981',
    recall_period_days: 180,
    commission_type: CommissionType.FIXED,
    labo_required: false
  },
  {
    service_id: 'DV002',
    service_name: 'Điều trị tủy răng',
    category_id: 'CAT002',
    base_price: 800000,
    min_price: 600000,
    standard_duration: 60,
    buffer_time: 15,
    require_tooth_selection: true,
    color_code: '#F59E0B',
    recall_period_days: 30,
    commission_type: CommissionType.PERCENTAGE,
    labo_required: false
  },
  {
    service_id: 'DV003',
    service_name: 'Răng sứ Cercon',
    category_id: 'CAT003',
    base_price: 3500000,
    min_price: 2800000,
    standard_duration: 45,
    buffer_time: 15,
    require_tooth_selection: true,
    color_code: '#8B5CF6',
    recall_period_days: 365,
    commission_type: CommissionType.PERCENTAGE,
    labo_required: true
  },
  {
    service_id: 'DV004',
    service_name: 'Răng sứ Emax',
    category_id: 'CAT003',
    base_price: 5000000,
    min_price: 4000000,
    standard_duration: 45,
    buffer_time: 15,
    require_tooth_selection: true,
    color_code: '#EC4899',
    recall_period_days: 365,
    commission_type: CommissionType.PERCENTAGE,
    labo_required: true
  },
  {
    service_id: 'DV005',
    service_name: 'Niềng răng mắc cài kim loại',
    category_id: 'CAT004',
    base_price: 25000000,
    min_price: 20000000,
    standard_duration: 60,
    buffer_time: 20,
    require_tooth_selection: false,
    color_code: '#3B82F6',
    recall_period_days: 30,
    commission_type: CommissionType.PERCENTAGE,
    labo_required: true
  },
  {
    service_id: 'DV006',
    service_name: 'Niềng răng trong suốt Invisalign',
    category_id: 'CAT004',
    base_price: 80000000,
    min_price: 70000000,
    standard_duration: 45,
    buffer_time: 15,
    require_tooth_selection: false,
    color_code: '#06B6D4',
    recall_period_days: 60,
    commission_type: CommissionType.PERCENTAGE,
    labo_required: true
  },
  {
    service_id: 'DV007',
    service_name: 'Cấy ghép Implant',
    category_id: 'CAT005',
    base_price: 25000000,
    min_price: 20000000,
    standard_duration: 90,
    buffer_time: 30,
    require_tooth_selection: true,
    color_code: '#EF4444',
    recall_period_days: 90,
    commission_type: CommissionType.PERCENTAGE,
    labo_required: true
  },
  {
    service_id: 'DV008',
    service_name: 'Cạo vôi răng',
    category_id: 'CAT006',
    base_price: 300000,
    min_price: 200000,
    standard_duration: 45,
    buffer_time: 15,
    require_tooth_selection: false,
    color_code: '#84CC16',
    recall_period_days: 180,
    commission_type: CommissionType.FIXED,
    labo_required: false
  },
  {
    service_id: 'DV009',
    service_name: 'Nhổ răng khôn',
    category_id: 'CAT007',
    base_price: 1500000,
    min_price: 1000000,
    standard_duration: 45,
    buffer_time: 15,
    require_tooth_selection: true,
    color_code: '#F97316',
    recall_period_days: 7,
    commission_type: CommissionType.PERCENTAGE,
    labo_required: false
  },
  {
    service_id: 'DV010',
    service_name: 'Tẩy trắng răng tại phòng khám',
    category_id: 'CAT008',
    base_price: 2500000,
    min_price: 2000000,
    standard_duration: 60,
    buffer_time: 15,
    require_tooth_selection: false,
    color_code: '#EAB308',
    recall_period_days: 365,
    commission_type: CommissionType.FIXED,
    labo_required: false
  },
];

// ==================== PATIENTS ====================
export const mockPatients: Patient[] = [
  {
    patient_id: 'P001',
    patient_code: 'BN001',
    full_name: 'Nguyễn Văn An',
    phone: '0912345678',
    email: 'nguyenvanan@gmail.com',
    date_of_birth: new Date('1990-05-15'),
    gender: 'male',
    address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
    id_card: '079090123456',
    allergies: ['Penicillin'],
    medical_history: ['Tiểu đường type 2'],
    is_high_risk: true,
    debt_amount: 0,
    last_treatment_date: new Date('2024-01-10'),
    created_at: new Date('2023-06-15'),
    updated_at: new Date('2024-01-10'),
    notes: 'Bệnh nhân cần theo dõi đường huyết trước khi điều trị'
  },
  {
    patient_id: 'P002',
    patient_code: 'BN002',
    full_name: 'Trần Thị Bình',
    phone: '0923456789',
    email: 'tranthibinh@gmail.com',
    date_of_birth: new Date('1985-08-20'),
    gender: 'female',
    address: '456 Lê Văn B, Quận 2, TP.HCM',
    id_card: '079085123457',
    allergies: [],
    medical_history: [],
    is_high_risk: false,
    debt_amount: 2500000,
    last_treatment_date: new Date('2024-01-12'),
    created_at: new Date('2023-08-20'),
    updated_at: new Date('2024-01-12'),
    notes: ''
  },
  {
    patient_id: 'P003',
    patient_code: 'BN003',
    full_name: 'Lê Văn Cường',
    phone: '0934567890',
    email: 'levancuong@gmail.com',
    date_of_birth: new Date('1995-12-10'),
    gender: 'male',
    address: '789 Trần Văn C, Quận 3, TP.HCM',
    id_card: '079095123458',
    allergies: ['Lidocaine'],
    medical_history: ['Huyết áp cao'],
    is_high_risk: true,
    debt_amount: 0,
    last_treatment_date: new Date('2024-01-08'),
    created_at: new Date('2023-09-10'),
    updated_at: new Date('2024-01-08'),
    notes: 'Cần kiểm tra huyết áp trước mỗi lần điều trị'
  },
  {
    patient_id: 'P004',
    patient_code: 'BN004',
    full_name: 'Phạm Thị Dung',
    phone: '0945678901',
    email: 'phamthidung@gmail.com',
    date_of_birth: new Date('1988-03-25'),
    gender: 'female',
    address: '321 Phạm Văn D, Quận 4, TP.HCM',
    id_card: '079088123459',
    allergies: [],
    medical_history: [],
    is_high_risk: false,
    debt_amount: 5000000,
    last_treatment_date: new Date('2024-01-05'),
    created_at: new Date('2023-10-05'),
    updated_at: new Date('2024-01-05'),
    notes: 'Đang trong quá trình niềng răng'
  },
  {
    patient_id: 'P005',
    patient_code: 'BN005',
    full_name: 'Hoàng Văn Em',
    phone: '0956789012',
    email: 'hoangvanem@gmail.com',
    date_of_birth: new Date('1992-07-08'),
    gender: 'male',
    address: '654 Hoàng Văn E, Quận 5, TP.HCM',
    id_card: '079092123460',
    allergies: [],
    medical_history: [],
    is_high_risk: false,
    debt_amount: 0,
    last_treatment_date: new Date('2024-01-14'),
    created_at: new Date('2023-11-15'),
    updated_at: new Date('2024-01-14'),
    notes: ''
  },
  {
    patient_id: 'P006',
    patient_code: 'BN006',
    full_name: 'Ngô Thị Phương',
    phone: '0967890123',
    email: 'ngothiphuong@gmail.com',
    date_of_birth: new Date('1980-11-30'),
    gender: 'female',
    address: '987 Ngô Văn F, Quận 6, TP.HCM',
    id_card: '079080123461',
    allergies: ['Ibuprofen'],
    medical_history: ['Tim mạch'],
    is_high_risk: true,
    debt_amount: 8000000,
    last_treatment_date: new Date('2024-01-03'),
    created_at: new Date('2023-12-01'),
    updated_at: new Date('2024-01-03'),
    notes: 'Cần hội chẩn với bác sĩ tim mạch trước phẫu thuật'
  },
  {
    patient_id: 'P007',
    patient_code: 'BN007',
    full_name: 'Vũ Văn Giang',
    phone: '0978901234',
    email: 'vuvangi@gmail.com',
    date_of_birth: new Date('1998-01-18'),
    gender: 'male',
    address: '147 Vũ Văn G, Quận 7, TP.HCM',
    id_card: '079098123462',
    allergies: [],
    medical_history: [],
    is_high_risk: false,
    debt_amount: 0,
    last_treatment_date: undefined,
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-15'),
    notes: 'Bệnh nhân mới'
  },
  {
    patient_id: 'P008',
    patient_code: 'BN008',
    full_name: 'Đặng Thị Hương',
    phone: '0989012345',
    email: 'dangthihuong@gmail.com',
    date_of_birth: new Date('1993-09-12'),
    gender: 'female',
    address: '258 Đặng Văn H, Quận 8, TP.HCM',
    id_card: '079093123463',
    allergies: [],
    medical_history: [],
    is_high_risk: false,
    debt_amount: 1200000,
    last_treatment_date: new Date('2024-01-11'),
    created_at: new Date('2023-07-20'),
    updated_at: new Date('2024-01-11'),
    notes: ''
  },
];

// ==================== CLINIC CHAIRS ====================
export const mockChairs: ClinicChair[] = [
  { chair_id: 'G001', chair_name: 'Ghế 1', branch_id: 'B001', room_type: RoomType.GENERAL, allowed_services: ['DV001', 'DV002', 'DV008'], status: 'available' },
  { chair_id: 'G002', chair_name: 'Ghế 2', branch_id: 'B001', room_type: RoomType.GENERAL, allowed_services: ['DV001', 'DV002', 'DV008'], status: 'available' },
  { chair_id: 'G003', chair_name: 'Ghế 3', branch_id: 'B001', room_type: RoomType.SURGERY, allowed_services: ['DV007', 'DV009'], status: 'available' },
  { chair_id: 'G004', chair_name: 'Ghế 4', branch_id: 'B001', room_type: RoomType.XRAY, allowed_services: ['DV001'], status: 'maintenance' },
  { chair_id: 'G005', chair_name: 'Ghế 5', branch_id: 'B001', room_type: RoomType.GENERAL, allowed_services: ['DV001', 'DV002', 'DV003', 'DV004'], status: 'available' },
  { chair_id: 'G006', chair_name: 'Ghế 6', branch_id: 'B001', room_type: RoomType.SURGERY, allowed_services: ['DV007', 'DV009'], status: 'in_use' },
];

// ==================== APPOINTMENTS ====================
export const mockAppointments: Appointment[] = [
  {
    appointment_id: 'A001',
    patient_id: 'P001',
    doctor_id: 'U002',
    chair_id: 'G001',
    appointment_date: new Date('2024-01-15'),
    start_time: '09:00',
    end_time: '09:30',
    duration: 30,
    service_ids: ['DV001'],
    status: AppointmentStatus.COMPLETED,
    notes: 'Tái khám định kỳ',
    created_at: new Date('2024-01-10'),
    updated_at: new Date('2024-01-15'),
    created_by: 'U004'
  },
  {
    appointment_id: 'A002',
    patient_id: 'P002',
    doctor_id: 'U002',
    chair_id: 'G002',
    appointment_date: new Date('2024-01-15'),
    start_time: '10:00',
    end_time: '11:00',
    duration: 60,
    service_ids: ['DV002'],
    status: AppointmentStatus.IN_CHAIR,
    notes: 'Điều trị tủy răng số 16',
    created_at: new Date('2024-01-12'),
    updated_at: new Date('2024-01-15'),
    created_by: 'U004'
  },
  {
    appointment_id: 'A003',
    patient_id: 'P003',
    doctor_id: 'U003',
    chair_id: 'G003',
    appointment_date: new Date('2024-01-15'),
    start_time: '14:00',
    end_time: '15:30',
    duration: 90,
    service_ids: ['DV007'],
    status: AppointmentStatus.ARRIVED,
    notes: 'Cấy ghép Implant răng 36',
    created_at: new Date('2024-01-08'),
    updated_at: new Date('2024-01-15'),
    created_by: 'U004'
  },
  {
    appointment_id: 'A004',
    patient_id: 'P004',
    doctor_id: 'U002',
    chair_id: 'G005',
    appointment_date: new Date('2024-01-15'),
    start_time: '16:00',
    end_time: '16:45',
    duration: 45,
    service_ids: ['DV003'],
    status: AppointmentStatus.CONFIRMED,
    notes: 'Gắn răng sứ Cercon',
    created_at: new Date('2024-01-10'),
    updated_at: new Date('2024-01-14'),
    created_by: 'U004'
  },
  {
    appointment_id: 'A005',
    patient_id: 'P005',
    doctor_id: 'U003',
    chair_id: 'G001',
    appointment_date: new Date('2024-01-15'),
    start_time: '11:00',
    end_time: '11:30',
    duration: 30,
    service_ids: ['DV001'],
    status: AppointmentStatus.ARRIVED,
    notes: 'Khám tổng quát',
    created_at: new Date('2024-01-14'),
    updated_at: new Date('2024-01-15'),
    created_by: 'U004'
  },
  {
    appointment_id: 'A006',
    patient_id: 'P006',
    doctor_id: 'U002',
    chair_id: 'G006',
    appointment_date: new Date('2024-01-16'),
    start_time: '09:00',
    end_time: '09:45',
    duration: 45,
    service_ids: ['DV009'],
    status: AppointmentStatus.SCHEDULED,
    notes: 'Nhổ răng khôn số 18',
    created_at: new Date('2024-01-10'),
    updated_at: new Date('2024-01-10'),
    created_by: 'U004'
  },
  {
    appointment_id: 'A007',
    patient_id: 'P007',
    doctor_id: 'U003',
    chair_id: 'G002',
    appointment_date: new Date('2024-01-16'),
    start_time: '10:00',
    end_time: '10:30',
    duration: 30,
    service_ids: ['DV001'],
    status: AppointmentStatus.SCHEDULED,
    notes: 'Khám lần đầu',
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-15'),
    created_by: 'U004'
  },
  {
    appointment_id: 'A008',
    patient_id: 'P008',
    doctor_id: 'U002',
    chair_id: 'G005',
    appointment_date: new Date('2024-01-16'),
    start_time: '14:00',
    end_time: '14:45',
    duration: 45,
    service_ids: ['DV008'],
    status: AppointmentStatus.SCHEDULED,
    notes: 'Cạo vôi răng',
    created_at: new Date('2024-01-12'),
    updated_at: new Date('2024-01-12'),
    created_by: 'U004'
  },
];

// ==================== INVOICES ====================
export const mockInvoices: Invoice[] = [
  {
    invoice_id: 'HD001',
    invoice_code: 'INV001',
    patient_id: 'P001',
    appointment_id: 'A001',
    items: [
      {
        item_id: 'IT001',
        service_id: 'DV001',
        service_name: 'Khám tổng quát',
        quantity: 1,
        unit_price: 100000,
        discount_amount: 0,
        total_price: 100000,
        teeth_numbers: []
      }
    ],
    subtotal: 100000,
    discount_amount: 0,
    discount_percent: 0,
    tax_amount: 0,
    total_amount: 100000,
    paid_amount: 100000,
    remaining_amount: 0,
    payment_status: PaymentStatus.PAID,
    payment_method: 'Tiền mặt',
    notes: '',
    created_at: new Date('2024-01-15'),
    created_by: 'U004'
  },
  {
    invoice_id: 'HD002',
    invoice_code: 'INV002',
    patient_id: 'P002',
    appointment_id: 'A002',
    items: [
      {
        item_id: 'IT002',
        service_id: 'DV002',
        service_name: 'Điều trị tủy răng',
        quantity: 1,
        unit_price: 800000,
        discount_amount: 100000,
        total_price: 700000,
        teeth_numbers: [16]
      }
    ],
    subtotal: 800000,
    discount_amount: 100000,
    discount_percent: 12.5,
    tax_amount: 0,
    total_amount: 700000,
    paid_amount: 0,
    remaining_amount: 700000,
    payment_status: PaymentStatus.UNPAID,
    payment_method: '',
    notes: 'Chờ thanh toán sau điều trị',
    created_at: new Date('2024-01-15'),
    created_by: 'U004'
  },
  {
    invoice_id: 'HD003',
    invoice_code: 'INV003',
    patient_id: 'P004',
    items: [
      {
        item_id: 'IT003',
        service_id: 'DV003',
        service_name: 'Răng sứ Cercon',
        quantity: 2,
        unit_price: 3500000,
        discount_amount: 1000000,
        total_price: 6000000,
        teeth_numbers: [11, 12]
      }
    ],
    subtotal: 7000000,
    discount_amount: 1000000,
    discount_percent: 14.3,
    tax_amount: 0,
    total_amount: 6000000,
    paid_amount: 3000000,
    remaining_amount: 3000000,
    payment_status: PaymentStatus.PARTIAL,
    payment_method: 'Chuyển khoản',
    notes: 'Đặt cọc 50%',
    created_at: new Date('2024-01-05'),
    created_by: 'U004'
  },
  {
    invoice_id: 'HD004',
    invoice_code: 'INV004',
    patient_id: 'P006',
    items: [
      {
        item_id: 'IT004',
        service_id: 'DV007',
        service_name: 'Cấy ghép Implant',
        quantity: 1,
        unit_price: 25000000,
        discount_amount: 0,
        total_price: 25000000,
        teeth_numbers: [36]
      }
    ],
    subtotal: 25000000,
    discount_amount: 0,
    discount_percent: 0,
    tax_amount: 0,
    total_amount: 25000000,
    paid_amount: 17000000,
    remaining_amount: 8000000,
    payment_status: PaymentStatus.PARTIAL,
    payment_method: 'Thẻ tín dụng',
    notes: 'Trả góp',
    created_at: new Date('2024-01-03'),
    created_by: 'U004'
  },
];

// ==================== INVENTORY ====================
export const mockInventory: InventoryItem[] = [
  {
    item_id: 'VT001',
    trade_name: 'Mepivacaine 3%',
    unit_id: 'UNIT001',
    min_stock_level: 20,
    expiry_tracking: true,
    is_prescription_drug: true,
    cost_price: 15000,
    selling_price: 25000,
    stock_quantity: 50
  },
  {
    item_id: 'VT002',
    trade_name: 'Gutta Percha Points',
    unit_id: 'UNIT002',
    min_stock_level: 10,
    expiry_tracking: true,
    is_prescription_drug: false,
    cost_price: 200000,
    selling_price: 350000,
    stock_quantity: 15
  },
  {
    item_id: 'VT003',
    trade_name: 'Composite Filtek Z350',
    unit_id: 'UNIT003',
    min_stock_level: 5,
    expiry_tracking: true,
    is_prescription_drug: false,
    cost_price: 800000,
    selling_price: 1200000,
    stock_quantity: 8
  },
  {
    item_id: 'VT004',
    trade_name: 'Amalgam Capsules',
    unit_id: 'UNIT004',
    min_stock_level: 30,
    expiry_tracking: true,
    is_prescription_drug: false,
    cost_price: 25000,
    selling_price: 40000,
    stock_quantity: 45
  },
  {
    item_id: 'VT005',
    trade_name: 'Rubber Dam Kit',
    unit_id: 'UNIT005',
    min_stock_level: 5,
    expiry_tracking: false,
    is_prescription_drug: false,
    cost_price: 500000,
    selling_price: 750000,
    stock_quantity: 12
  },
  {
    item_id: 'VT006',
    trade_name: 'Sodium Hypochlorite 5.25%',
    unit_id: 'UNIT006',
    min_stock_level: 10,
    expiry_tracking: true,
    is_prescription_drug: false,
    cost_price: 100000,
    selling_price: 150000,
    stock_quantity: 18
  },
];

// ==================== DIAGNOSES ====================
export const mockDiagnoses: Diagnosis[] = [
  { diagnosis_id: 'ICD001', description_vn: 'Sâu răng men', contraindications: [] },
  { diagnosis_id: 'ICD002', description_vn: 'Sâu răng ngà', contraindications: [] },
  { diagnosis_id: 'ICD003', description_vn: 'Sâu răng tủy', contraindications: [] },
  { diagnosis_id: 'ICD004', description_vn: 'Viêm tủy cấp', contraindications: [] },
  { diagnosis_id: 'ICD005', description_vn: 'Viêm tủy mạn', contraindications: [] },
  { diagnosis_id: 'ICD006', description_vn: 'Viêm nha chu nhẹ', contraindications: [] },
  { diagnosis_id: 'ICD007', description_vn: 'Viêm nha chu vừa', contraindications: [] },
  { diagnosis_id: 'ICD008', description_vn: 'Viêm nha chu nặng', contraindications: [] },
  { diagnosis_id: 'ICD009', description_vn: 'Răng khôn mọc lệch', contraindications: [] },
  { diagnosis_id: 'ICD010', description_vn: 'Răng thiếu', contraindications: [] },
  { diagnosis_id: 'ICD011', description_vn: 'Răng sứt/mẻ', contraindications: [] },
  { diagnosis_id: 'ICD012', description_vn: 'Răng đã điều trị tủy', contraindications: [] },
];

// ==================== DASHBOARD STATS ====================
export const mockDashboardStats: DashboardStats = {
  total_patients: 856,
  new_patients_today: 7,
  appointments_today: 24,
  completed_appointments: 18,
  revenue_today: 12500000,
  revenue_month: 285000000,
  outstanding_debt: 45000000,
  chair_utilization: 78
};

// ==================== CHART DATA ====================
export const mockRevenueChartData = [
  { name: 'T1', revenue: 180000000, target: 200000000 },
  { name: 'T2', revenue: 220000000, target: 200000000 },
  { name: 'T3', revenue: 195000000, target: 200000000 },
  { name: 'T4', revenue: 240000000, target: 220000000 },
  { name: 'T5', revenue: 265000000, target: 220000000 },
  { name: 'T6', revenue: 285000000, target: 250000000 },
  { name: 'T7', revenue: 260000000, target: 250000000 },
  { name: 'T8', revenue: 290000000, target: 250000000 },
  { name: 'T9', revenue: 275000000, target: 250000000 },
  { name: 'T10', revenue: 310000000, target: 280000000 },
  { name: 'T11', revenue: 295000000, target: 280000000 },
  { name: 'T12', revenue: 320000000, target: 300000000 },
];

export const mockServiceChartData = [
  { name: 'Khám tổng quát', value: 350, color: '#10B981' },
  { name: 'Điều trị tủy', value: 180, color: '#F59E0B' },
  { name: 'Răng sứ', value: 120, color: '#8B5CF6' },
  { name: 'Cấy ghép Implant', value: 45, color: '#EF4444' },
  { name: 'Chỉnh nha', value: 60, color: '#3B82F6' },
  { name: 'Khác', value: 85, color: '#6B7280' },
];

export const mockAppointmentChartData = [
  { name: 'Thứ 2', scheduled: 18, completed: 15, canceled: 2 },
  { name: 'Thứ 3', scheduled: 22, completed: 20, canceled: 1 },
  { name: 'Thứ 4', scheduled: 20, completed: 18, canceled: 1 },
  { name: 'Thứ 5', scheduled: 25, completed: 22, canceled: 2 },
  { name: 'Thứ 6', scheduled: 28, completed: 25, canceled: 2 },
  { name: 'Thứ 7', scheduled: 15, completed: 12, canceled: 1 },
  { name: 'CN', scheduled: 8, completed: 6, canceled: 1 },
];

// ==================== INITIAL TOOTH DATA ====================
export const createInitialTeethData = (): Tooth[] => {
  const teeth: Tooth[] = [];
  for (let i = 11; i <= 48; i++) {
    // Skip non-existent tooth numbers
    if ((i > 18 && i < 21) || (i > 28 && i < 31) || (i > 38 && i < 41)) continue;
    
    teeth.push({
      tooth_number: i,
      condition: ToothCondition.HEALTHY,
      surfaces: { O: false, M: false, D: false, B: false, L: false },
      diagnosis: '',
      treatment: '',
      color_code: '#10B981'
    });
  }
  return teeth;
};

// ==================== MEDICAL RECORDS ====================
export const mockMedicalRecords: MedicalRecord[] = [
  {
    record_id: 'MR001',
    patient_id: 'P001',
    doctor_id: 'U002',
    appointment_id: 'A001',
    visit_date: new Date('2024-01-15'),
    subjective: 'Bệnh nhân đến tái khám định kỳ, không có triệu chứng đau nhức',
    objective: 'Răng 16 đã điều trị tủy tốt, không sưng nướu, không chảy máu',
    assessment: 'Tình trạng răng miệng ổn định sau điều trị tủy',
    plan: 'Tiếp tục theo dõi, tái khám sau 6 tháng',
    teeth_data: createInitialTeethData(),
    status: 'completed',
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-15')
  },
  {
    record_id: 'MR002',
    patient_id: 'P002',
    doctor_id: 'U002',
    appointment_id: 'A002',
    visit_date: new Date('2024-01-15'),
    subjective: 'Bệnh nhân đau răng số 16, đau tăng khi ăn đồ nóng/lạnh',
    objective: 'Răng 16 sâu sâu đến tủy, đau gõ (+), đau khu trú',
    assessment: 'Sâu răng tủy răng 16',
    plan: 'Điều trị tủy răng 16, tái khám sau 1 tuần',
    teeth_data: createInitialTeethData(),
    status: 'draft' as const,
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-15')
  },
];
