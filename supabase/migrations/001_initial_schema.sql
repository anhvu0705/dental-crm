-- =====================================================
-- CRM NHA KHOA - SUPABASE DATABASE SCHEMA
-- Migration: 001_initial_schema.sql
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- SECTION 1: ENUMS
-- =====================================================
CREATE TYPE appointment_status AS ENUM (
  'Scheduled',
  'Confirmed',
  'Arrived',
  'In-chair',
  'Completed',
  'No-show',
  'Canceled'
);

CREATE TYPE payment_status AS ENUM (
  'Unpaid',
  'Partial',
  'Paid',
  'Refunded',
  'Canceled'
);

CREATE TYPE tooth_condition AS ENUM (
  'Healthy',
  'Missing',
  'Impacted',
  'Implant',
  'Crown',
  'Filling',
  'Decay',
  'Root Canal',
  'Bridge'
);

CREATE TYPE staff_role AS ENUM (
  'Admin',
  'Dentist',
  'Assistant',
  'Receptionist',
  'Accountant',
  'Sales'
);

CREATE TYPE data_scope AS ENUM (
  'Personal',
  'Branch',
  'Global'
);

CREATE TYPE gender AS ENUM (
  'male',
  'female',
  'other'
);

CREATE TYPE room_type AS ENUM (
  'Khám tổng quát',
  'Phẫu thuật',
  'X-Quang'
);

CREATE TYPE commission_type AS ENUM (
  'Percentage',
  'Fixed'
);

CREATE TYPE record_status AS ENUM (
  'draft',
  'completed',
  'signed'
);

CREATE TYPE chair_status AS ENUM (
  'available',
  'maintenance',
  'in_use'
);

-- =====================================================
-- SECTION 2: PROFILES (extends Supabase auth.users)
-- =====================================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar TEXT,
  staff_id TEXT,
  role_id UUID REFERENCES roles(role_id),
  data_scope data_scope DEFAULT 'Branch',
  is_active BOOLEAN DEFAULT true,
  mfa_enabled BOOLEAN DEFAULT false,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SECTION 3: ROLES & PERMISSIONS
-- =====================================================
CREATE TABLE roles (
  role_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role_name staff_role NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default roles
INSERT INTO roles (role_name, description, permissions) VALUES
('Admin', 'Quản trị viên', '["*"]'::jsonb),
('Dentist', 'Nha sĩ', '[{"module": "patients", "actions": ["view", "create", "edit"]}, {"module": "appointments", "actions": ["view", "create", "edit"]}, {"module": "medical_records", "actions": ["view", "create", "edit"]}]'::jsonb),
('Assistant', 'Trợ lý', '[{"module": "patients", "actions": ["view"]}, {"module": "appointments", "actions": ["view", "create"]}]'::jsonb),
('Receptionist', 'Lễ tân', '[{"module": "patients", "actions": ["view", "create", "edit"]}, {"module": "appointments", "actions": ["view", "create", "edit"]}, {"module": "invoices", "actions": ["view", "create"]}]'::jsonb),
('Accountant', 'Kế toán', '[{"module": "invoices", "actions": ["view", "create", "edit"]}, {"module": "patients", "actions": ["view"]}]'::jsonb),
('Sales', 'Kinh doanh', '[{"module": "patients", "actions": ["view", "create", "edit"]}, {"module": "appointments", "actions": ["view", "create"]}]'::jsonb);

-- =====================================================
-- SECTION 4: BRANCHES (Chi nhánh)
-- =====================================================
CREATE TABLE branches (
  branch_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  branch_code TEXT NOT NULL UNIQUE,
  branch_name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SECTION 5: PATIENTS (Bệnh nhân)
-- =====================================================
CREATE TABLE patients (
  patient_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_code TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  date_of_birth DATE,
  gender gender DEFAULT 'other',
  address TEXT,
  id_card TEXT,
  allergies TEXT[] DEFAULT '{}',
  medical_history TEXT[] DEFAULT '{}',
  is_high_risk BOOLEAN DEFAULT false,
  debt_amount DECIMAL(15,2) DEFAULT 0,
  last_treatment_date TIMESTAMPTZ,
  notes TEXT,
  branch_id UUID REFERENCES branches(branch_id),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_patients_phone ON patients(phone);
CREATE INDEX idx_patients_name ON patients(full_name);

-- =====================================================
-- SECTION 6: SERVICE CATEGORIES (Loại dịch vụ)
-- =====================================================
CREATE TABLE service_categories (
  category_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SECTION 7: SERVICES (Dịch vụ)
-- =====================================================
CREATE TABLE services (
  service_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name TEXT NOT NULL,
  category_id UUID REFERENCES service_categories(category_id),
  base_price DECIMAL(15,2) NOT NULL DEFAULT 0,
  min_price DECIMAL(15,2) DEFAULT 0,
  standard_duration INTEGER DEFAULT 30,
  buffer_time INTEGER DEFAULT 10,
  require_tooth_selection BOOLEAN DEFAULT false,
  color_code TEXT DEFAULT '#3B82F6',
  recall_period_days INTEGER DEFAULT 180,
  commission_type commission_type DEFAULT 'Percentage',
  commission_value DECIMAL(5,2) DEFAULT 10,
  labo_required BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  branch_id UUID REFERENCES branches(branch_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_services_category ON services(category_id);

-- =====================================================
-- SECTION 8: CLINIC CHAIRS (Ghế khám)
-- =====================================================
CREATE TABLE clinic_chairs (
  chair_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chair_name TEXT NOT NULL,
  branch_id UUID REFERENCES branches(branch_id) NOT NULL,
  room_type room_type DEFAULT 'Khám tổng quát',
  allowed_services UUID[] DEFAULT '{}',
  status chair_status DEFAULT 'available',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SECTION 9: APPOINTMENTS (Lịch hẹn)
-- =====================================================
CREATE TABLE appointments (
  appointment_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES patients(patient_id) NOT NULL,
  doctor_id UUID REFERENCES profiles(id),
  chair_id UUID REFERENCES clinic_chairs(chair_id),
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration INTEGER DEFAULT 30,
  service_ids UUID[] DEFAULT '{}',
  status appointment_status DEFAULT 'Scheduled',
  notes TEXT,
  branch_id UUID REFERENCES branches(branch_id),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_status ON appointments(status);

-- =====================================================
-- SECTION 10: MEDICAL RECORDS (Bệnh án)
-- =====================================================
CREATE TABLE medical_records (
  record_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES patients(patient_id) NOT NULL,
  doctor_id UUID REFERENCES profiles(id),
  appointment_id UUID REFERENCES appointments(appointment_id),
  visit_date TIMESTAMPTZ NOT NULL,
  subjective TEXT,
  objective TEXT,
  assessment TEXT,
  plan TEXT,
  teeth_data JSONB DEFAULT '[]',
  attachments TEXT[] DEFAULT '{}',
  status record_status DEFAULT 'draft',
  branch_id UUID REFERENCES branches(branch_id),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_medical_records_patient ON medical_records(patient_id);
CREATE INDEX idx_medical_records_date ON medical_records(visit_date);

-- =====================================================
-- SECTION 11: INVOICES (Hóa đơn)
-- =====================================================
CREATE TABLE invoices (
  invoice_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_code TEXT NOT NULL UNIQUE,
  patient_id UUID REFERENCES patients(patient_id) NOT NULL,
  appointment_id UUID REFERENCES appointments(appointment_id),
  subtotal DECIMAL(15,2) DEFAULT 0,
  discount_amount DECIMAL(15,2) DEFAULT 0,
  discount_percent DECIMAL(5,2) DEFAULT 0,
  tax_amount DECIMAL(15,2) DEFAULT 0,
  total_amount DECIMAL(15,2) DEFAULT 0,
  paid_amount DECIMAL(15,2) DEFAULT 0,
  remaining_amount DECIMAL(15,2) DEFAULT 0,
  payment_status payment_status DEFAULT 'Unpaid',
  payment_method TEXT,
  notes TEXT,
  branch_id UUID REFERENCES branches(branch_id),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_invoices_patient ON invoices(patient_id);
CREATE INDEX idx_invoices_status ON invoices(payment_status);
CREATE INDEX idx_invoices_date ON invoices(created_at);

-- =====================================================
-- SECTION 12: INVOICE ITEMS (Chi tiết hóa đơn)
-- =====================================================
CREATE TABLE invoice_items (
  item_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(invoice_id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES services(service_id),
  service_name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(15,2) NOT NULL,
  discount_amount DECIMAL(15,2) DEFAULT 0,
  total_price DECIMAL(15,2) NOT NULL,
  teeth_numbers INTEGER[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_invoice_items_invoice ON invoice_items(invoice_id);

-- =====================================================
-- SECTION 13: PAYMENTS (Thanh toán)
-- =====================================================
CREATE TABLE payments (
  payment_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(invoice_id) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  payment_method TEXT NOT NULL,
  payment_date TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_invoice ON payments(invoice_id);

-- =====================================================
-- SECTION 14: INVENTORY (Kho vật tư)
-- =====================================================
CREATE TABLE inventory (
  item_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trade_name TEXT NOT NULL,
  active_ingredient TEXT,
  unit TEXT DEFAULT 'cái',
  min_stock_level INTEGER DEFAULT 10,
  expiry_tracking BOOLEAN DEFAULT false,
  is_prescription_drug BOOLEAN DEFAULT false,
  cost_price DECIMAL(15,2) DEFAULT 0,
  selling_price DECIMAL(15,2) DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0,
  branch_id UUID REFERENCES branches(branch_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_inventory_stock ON inventory(stock_quantity);

-- =====================================================
-- SECTION 15: NOTIFICATIONS
-- =====================================================
CREATE TABLE notifications (
  notification_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;

-- =====================================================
-- SECTION 16: AUDIT LOG
-- =====================================================
CREATE TABLE audit_log (
  audit_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL,
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES profiles(id),
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_log_table ON audit_log(table_name, record_id);
CREATE INDEX idx_audit_log_user ON audit_log(user_id);

-- =====================================================
-- SECTION 17: FUNCTIONS & TRIGGERS
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medical_records_updated_at BEFORE UPDATE ON medical_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_branches_updated_at BEFORE UPDATE ON branches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate patient code
CREATE OR REPLACE FUNCTION generate_patient_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.patient_code IS NULL OR NEW.patient_code = '' THEN
    NEW.patient_code := 'BN' || TO_CHAR(NOW(), 'YYMMDD') || '-' || RIGHT(NEW.patient_id::TEXT, 4);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_patient_code_trigger
  BEFORE INSERT ON patients
  FOR EACH ROW EXECUTE FUNCTION generate_patient_code();

-- Function to generate invoice code
CREATE OR REPLACE FUNCTION generate_invoice_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invoice_code IS NULL OR NEW.invoice_code = '' THEN
    NEW.invoice_code := 'HD' || TO_CHAR(NOW(), 'YYMMDD') || '-' || RIGHT(NEW.invoice_id::TEXT, 4);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_invoice_code_trigger
  BEFORE INSERT ON invoices
  FOR EACH ROW EXECUTE FUNCTION generate_invoice_code();

-- =====================================================
-- SECTION 18: ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_chairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Patients policies
CREATE POLICY "Authenticated users can view patients"
  ON patients FOR SELECT
  USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert patients"
  ON patients FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update patients"
  ON patients FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Appointments policies
CREATE POLICY "Authenticated users can view appointments"
  ON appointments FOR SELECT
  USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert appointments"
  ON appointments FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update appointments"
  ON appointments FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Medical records policies
CREATE POLICY "Authenticated users can view medical records"
  ON medical_records FOR SELECT
  USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert medical records"
  ON medical_records FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update medical records"
  ON medical_records FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Invoices policies
CREATE POLICY "Authenticated users can view invoices"
  ON invoices FOR SELECT
  USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert invoices"
  ON invoices FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update invoices"
  ON invoices FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Invoice items policies
CREATE POLICY "Authenticated users can manage invoice items"
  ON invoice_items FOR ALL
  USING (auth.role() = 'authenticated');

-- Payments policies
CREATE POLICY "Authenticated users can view payments"
  ON payments FOR SELECT
  USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert payments"
  ON payments FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Services policies
CREATE POLICY "Authenticated users can view services"
  ON services FOR SELECT
  USING (auth.role() = 'authenticated');

-- Branches policies
CREATE POLICY "Authenticated users can view branches"
  ON branches FOR SELECT
  USING (auth.role() = 'authenticated');

-- Clinic chairs policies
CREATE POLICY "Authenticated users can view chairs"
  ON clinic_chairs FOR SELECT
  USING (auth.role() = 'authenticated');

-- Inventory policies
CREATE POLICY "Authenticated users can view inventory"
  ON inventory FOR SELECT
  USING (auth.role() = 'authenticated');

-- Notifications policies
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- =====================================================
-- SECTION 19: SEED DATA
-- =====================================================
INSERT INTO service_categories (category_name, description, display_order) VALUES
('Khám tổng quát', 'Các dịch vụ khám răng tổng quát', 1),
('Nha chu', 'Dịch vụ điều trị nha chu', 2),
('Phục hình', 'Dịch vụ phục hình răng', 3),
('Phẫu thuật', 'Dịch vụ phẫu thuật', 4),
('Trẻ em', 'Dịch vụ nha khoa trẻ em', 5);

INSERT INTO branches (branch_code, branch_name, address, phone) VALUES
('HN001', 'Nha Khoa Nha Đại Gia Đình - Hà Nội', '123 Đường ABC, Quận XYZ, Hà Nội', '024-1234-5678'),
('HCM001', 'Nha Khoa Nha Đại Gia Đình - HCM', '456 Đường DEF, Quận PQR, TP.HCM', '028-9876-5432');