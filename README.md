# 🏥 Dental CRM

Hệ thống Quản lý Phòng khám Nha khoa - React + Supabase

## Tính năng

- Dashboard thống kê doanh thu, lịch hẹn
- Quản lý bệnh nhân (CRUD)
- Lịch hẹn thông minh với real-time updates
- Quản lý hóa đơn và thanh toán
- Sơ đồ răng (Odontogram) tương tác
- Quản lý kho vật tư
- Báo cáo chi tiết

## Tech Stack

- React 19 + TypeScript + Vite
- Supabase (PostgreSQL, Auth, Realtime)
- Tailwind CSS + Radix UI
- Zustand + React Hooks
- Recharts cho charts

## Setup

```bash
# Clone repository
git clone https://github.com/anhvu0705/dental-crm.git
cd dental-crm

# Install dependencies
npm install

# Tạo .env.local với Supabase credentials
cp .env.example .env.local
# Chỉnh sửa .env.local với:
# VITE_SUPABASE_URL=your-supabase-url
# VITE_SUPABASE_ANON_KEY=your-anon-key

# Chạy migration SQL trong Supabase Dashboard
# File: supabase/migrations/001_initial_schema.sql

# Development
npm run dev
```

## Database

Xem `supabase/migrations/001_initial_schema.sql` để biết schema đầy đủ.

## License

MIT License