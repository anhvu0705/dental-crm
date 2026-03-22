-- ============================================
-- CRM NHA KHOA - SUPABASE SCHEMA
-- Database Schema for Dental Clinic CRM
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Branches (Chi nhánh)
CREATE TABLE branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users/Staff (Nhân viên)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'dentist', 'assistant', 'receptionist', 'accountant')),
  branch_id UUID REFERENCES branches(id),
  phone VARCHAR(20),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Patients (Bệnh nhân)
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_code VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other')),
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  id_card VARCHAR(20),
  allergies TEXT[],
  medical_history TEXT[],
  is_high_risk BOOLEAN DEFAULT false,
  last_visit_date TIMESTAMPTZ,
  total_spent DECIMAL(15,2) DEFAULT 0,
  total_debt DECIMAL(15,2) DEFAULT 0,
  branch_id UUID REFERENCES branches(id),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services (Dịch vụ)
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  base_price DECIMAL(15,2) NOT NULL,
  min_price DECIMAL(15,2),
  standard_duration INTEGER, -- minutes
  buffer_time INTEGER DEFAULT 0,
  color_code VARCHAR(7),
  require_tooth_selection BOOLEAN DEFAULT false,
  recall_period_days INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments (Lịch hẹn)
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) NOT NULL,
  doctor_id UUID REFERENCES users(id) NOT NULL,
  service_id UUID REFERENCES services(id) NOT NULL,
  chair_id UUID,
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'arrived', 'in_progress', 'completed', 'no_show', 'cancelled')),
  notes TEXT,
  branch_id UUID REFERENCES branches(id),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Medical Records (Bệnh án)
CREATE TABLE medical_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) NOT NULL,
  appointment_id UUID REFERENCES appointments(id),
  record_date DATE NOT NULL,
  chief_complaint TEXT,
  diagnosis TEXT,
  treatment_plan TEXT,
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tooth Conditions (Tình trạng răng)
CREATE TABLE tooth_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  medical_record_id UUID REFERENCES medical_records(id) NOT NULL,
  tooth_number VARCHAR(10) NOT NULL,
  surfaces TEXT[],
  condition VARCHAR(50),
  treatment TEXT,
  color VARCHAR(7),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices (Hóa đơn)
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_code VARCHAR(50) UNIQUE NOT NULL,
  patient_id UUID REFERENCES patients(id) NOT NULL,
  appointment_id UUID REFERENCES appointments(id),
  subtotal DECIMAL(15,2) NOT NULL,
  discount DECIMAL(15,2) DEFAULT 0,
  total DECIMAL(15,2) NOT NULL,
  paid_amount DECIMAL(15,2) DEFAULT 0,
  remaining_amount DECIMAL(15,2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'partial', 'paid', 'refunded')),
  payment_method VARCHAR(50),
  notes TEXT,
  branch_id UUID REFERENCES branches(id),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoice Items (Chi tiết hóa đơn)
CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID REFERENCES invoices(id) NOT NULL,
  service_id UUID REFERENCES services(id),
  description TEXT,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(15,2) NOT NULL,
  discount DECIMAL(15,2) DEFAULT 0,
  total DECIMAL(15,2) NOT NULL,
  teeth TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inventory (Kho vật tư)
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) CHECK (category IN ('medicine', 'material', 'equipment')),
  unit VARCHAR(50),
  quantity INTEGER DEFAULT 0,
  min_stock_level INTEGER DEFAULT 0,
  cost_price DECIMAL(15,2),
  selling_price DECIMAL(15,2),
  expiry_date DATE,
  batch_number VARCHAR(100),
  is_prescription_drug BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  branch_id UUID REFERENCES branches(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chairs (Ghế nha khoa)
CREATE TABLE chairs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id UUID REFERENCES branches(id) NOT NULL,
  name VARCHAR(100) NOT NULL,
  room_type VARCHAR(50) DEFAULT 'general',
  status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'in_use', 'maintenance')),
  allowed_services UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Users: Admin can see all, others see only their branch
CREATE POLICY "Users view own branch" ON users
  FOR SELECT USING (
    auth.role() = 'authenticated' AND (
      EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
      OR branch_id = (SELECT branch_id FROM users WHERE id = auth.uid())
    )
  );

-- Patients: All authenticated users can view
CREATE POLICY "Patients view all authenticated" ON patients
  FOR SELECT USING (auth.role() = 'authenticated');

-- Patients: Only admin and receptionists can insert
CREATE POLICY "Patients insert by role" ON patients
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'receptionist'))
  );

-- Appointments: All authenticated users can view
CREATE POLICY "Appointments view all authenticated" ON appointments
  FOR SELECT USING (auth.role() = 'authenticated');

-- Invoices: Admin and accountant can manage
CREATE POLICY "Invoices view by role" ON invoices
  FOR SELECT USING (
    auth.role() = 'authenticated' AND (
      EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'accountant'))
      OR branch_id = (SELECT branch_id FROM users WHERE id = auth.uid())
    )
  );

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_branches_updated_at BEFORE UPDATE ON branches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-generate patient code
CREATE OR REPLACE FUNCTION generate_patient_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.patient_code IS NULL THEN
    NEW.patient_code = 'BN-' || TO_CHAR(NOW(), 'YYMMDD') || '-' || LPAD(CAST(COALESCE((SELECT COUNT(*) + 1 FROM patients WHERE DATE(created_at) = CURRENT_DATE), 1) AS TEXT), 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_patient_code
  BEFORE INSERT ON patients
  FOR EACH ROW EXECUTE FUNCTION generate_patient_code();

-- Auto-generate invoice code
CREATE OR REPLACE FUNCTION generate_invoice_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invoice_code IS NULL THEN
    NEW.invoice_code = 'HD-' || TO_CHAR(NOW(), 'YYMMDD') || '-' || LPAD(CAST(COALESCE((SELECT COUNT(*) + 1 FROM invoices WHERE DATE(created_at) = CURRENT_DATE), 1) AS TEXT), 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_invoice_code
  BEFORE INSERT ON invoices
  FOR EACH ROW EXECUTE FUNCTION generate_invoice_code();

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Insert sample branch
INSERT INTO branches (id, name, address, phone, email) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Chi nhánh 1', '123 Đường ABC, Quận 1, TP.HCM', '02812345678', 'info@dentalcare.vn');

-- Insert sample admin user (password: admin123)
INSERT INTO users (id, email, username, password_hash, full_name, role, branch_id) VALUES
  ('22222222-2222-2222-2222-222222222222', 'admin@dentalcare.vn', 'admin', '$2a$10$abcdefghijklmnopqrstuvwxyz', 'Nguyễn Văn Admin', 'admin', '11111111-1111-1111-1111-111111111111');

-- Insert sample services
INSERT INTO services (service_code, name, category, base_price, min_price, standard_duration, color_code) VALUES
  ('DV001', 'Khám tổng quát', 'Tổng quát', 150000, 100000, 30, '#3B82F6'),
  ('DV002', 'Trám răng', 'Điều trị', 300000, 250000, 45, '#10B981'),
  ('DV003', 'Nhổ răng', 'Phẫu thuật', 500000, 400000, 30, '#EF4444'),
  ('DV004', 'Cạo vôi răng', 'Vệ sinh', 200000, 150000, 30, '#8B5CF6'),
  ('DV005', 'Tẩy trắng răng', 'Thẩm mỹ', 2500000, 2000000, 90, '#F59E0B');

-- Insert sample chairs
INSERT INTO chairs (branch_id, name, room_type, status) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Ghế 1', 'general', 'available'),
  ('11111111-1111-1111-1111-111111111111', 'Ghế 2', 'general', 'available'),
  ('11111111-1111-1111-1111-111111111111', 'Ghế 3', 'surgery', 'available');
