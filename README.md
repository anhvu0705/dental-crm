# CRM Nha Khoa - Hệ thống Quản lý Phòng khám Răng Hàm Mặt

Hệ thống CRM chuyên nghiệp cho phòng khám nha khoa, được xây dựng với React + TypeScript + Vite + Tailwind CSS.

## Tính năng chính

### 1. Dashboard
- Tổng quan hoạt động phòng khám
- Thống kê doanh thu, lịch hẹn trong ngày
- Cảnh báo hàng tồn kho thấp

### 2. Quản lý Bệnh nhân
- Hồ sơ bệnh nhân đầy đủ
- Lịch sử điều trị
- Sơ đồ răng tương tác (Odontogram)
- Theo dõi dị ứng và bệnh nền

### 3. Lịch hẹn thông minh (Smart Calendar)
- Giao diện kéo thả trực quan
- Tự động kiểm tra xung đột
- Mã màu theo trạng thái
- Gợi ý khung giờ phù hợp

### 4. Sơ đồ Răng (Odontogram)
- Công nghệ SVG độ phân giải cao
- Hỗ trợ chuẩn FDI (11-48) và Universal (1-32)
- Click chọn từng mặt răng (O, M, D, B, L)
- Lịch sử điều trị từng răng

### 5. Quản lý Thanh toán
- Tạo hóa đơn điện tử
- Theo dõi công nợ
- Báo cáo doanh thu chi tiết

### 6. Kho vật tư
- Quản lý thuốc và vật tư
- Theo dõi hạn sử dụng
- Cảnh báo tồn kho tối thiểu

### 7. Báo cáo
- Thống kê doanh thu theo ngày/tháng
- Báo cáo công việc bác sĩ
- Phân tích hiệu quả điều trị

## Công nghệ sử dụng

### Frontend
- **React 19** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives
- **Zustand** - State management
- **React Router v7** - Navigation
- **Recharts** - Data visualization

### Backend (Supabase)
- **PostgreSQL** - Database
- **Row Level Security** - Authorization
- **Real-time** - Live updates
- **Auth** - Authentication

## Cài đặt

```bash
# Clone repository
git clone https://github.com/anhvu0705/dental-crm
cd dental-crm

# Install dependencies
npm install

# Tạo file .env.local với Supabase credentials
cp .env.example .env.local

# Chạy development server
npm run dev
```

## Cấu trúc dự án

```
src/
├── components/
│   ├── common/          # Components dùng chung
│   ├── layout/          # Layout components
│   ├── odontogram/      # Sơ đồ răng
│   └── ui/              # UI primitives (Radix UI)
├── modules/
│   ├── admin/           # Quản trị hệ thống
│   ├── appointment/     # Lịch hẹn
│   ├── billing/         # Thanh toán
│   ├── clinical/        # Lâm sàng
│   ├── dashboard/       # Dashboard
│   ├── inventory/       # Kho vật tư
│   ├── lab/             # Xưởng răng
│   ├── medical/         # Hồ sơ y tế
│   ├── patient/         # Bệnh nhân
│   ├── pharmacy/        # Dược phòng
│   ├── reports/         # Báo cáo
│   ├── services/        # Dịch vụ
│   └── settings/        # Cài đặt
├── hooks/               # Custom hooks
├── lib/                 # Utilities
├── data/                # Mock data
└── types/               # TypeScript types
```

## Vai trò người dùng

| Vai trò | Quyền hạn |
|---------|-----------|
| Admin | Toàn quyền |
| Bác sĩ | Khám, điều trị, xem lịch |
| Lễ tân | Đặt lịch, tiếp nhận bệnh nhân |
| Phụ tá | Hỗ trợ bác sĩ, quản lý kho |
| Kế toán | Thanh toán, báo cáo tài chính |

## License

MIT License - OKComputer Dental Care CRM
