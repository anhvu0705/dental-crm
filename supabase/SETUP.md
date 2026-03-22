# Hướng dẫn Setup Supabase cho CRM Nha Khoa

## Các bước thực hiện

### 1. Chạy Database Migration

Đăng nhập vào Supabase Dashboard và chạy file migration:

1. Mở Supabase Dashboard: https://supabase.com/dashboard
2. Chọn project của bạn
3. Vào menu **SQL Editor**
4. Tạo New Query và paste nội dung từ file:
   `supabase/migrations/001_initial_schema.sql`
5. Run query để tạo tất cả bảng

### 2. Cấu hình Environment Variables

Tạo file `.env.local` trong thư mục `app/`:

```env
VITE_SUPABASE_URL=https://xxuoqgjtajysahxmmqyf.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Lấy Supabase URL và Anon Key từ:
- Supabase Dashboard → Settings → API

### 3. Enable Authentication

1. Vào **Authentication** → **Providers**
2. Enable **Email** provider
3. Cấu hình Email templates (password reset, confirmation)

### 4. Cấu hình Row Level Security (RLS)

RLS policies đã được tạo tự động trong migration file.
Đảm bảo RLS enabled trên tất cả các bảng.

### 5. Enable Realtime

1. Vào **Database** → **Replication**
2. Enable replication cho các bảng:
   - `appointments`
   - `patients`
   - `invoices`
   - `notifications`

## Cấu trúc Database

### Tables chính:

| Table | Mô tả |
|-------|-------|
| `profiles` | User profiles (extends auth.users) |
| `branches` | Chi nhánh phòng khám |
| `patients` | Thông tin bệnh nhân |
| `appointments` | Lịch hẹn khám |
| `medical_records` | Bệnh án |
| `invoices` | Hóa đơn |
| `invoice_items` | Chi tiết hóa đơn |
| `payments` | Thanh toán |
| `services` | Dịch vụ nha khoa |
| `service_categories` | Loại dịch vụ |
| `clinic_chairs` | Ghế khám |
| `inventory` | Kho vật tư |
| `notifications` | Thông báo |
| `audit_log` | Nhật ký thay đổi |

## Sử dụng Hooks trong Components

```tsx
import { usePatients, useAppointments, useAuth, useDashboard } from '@/hooks';

// Sử dụng trong component
function PatientList() {
  const { patients, loading, createPatient } = usePatients({
    branchId: currentBranchId
  });

  if (loading) return <Skeleton />;

  return (
    <div>
      {patients.map(patient => (
        <PatientCard key={patient.patient_id} patient={patient} />
      ))}
    </div>
  );
}
```

## Realtime Updates

Các hooks đã tự động subscribe vào realtime changes.
Không cần thêm code để nhận cập nhật real-time.

## Troubleshooting

### Lỗi RLS Permission Denied

Kiểm tra user đã đăng nhập chưa:
```ts
const { user } = useAuth();
if (!user) return <Login />;
```

### Lỗi 404 Table Not Found

Đảm bảo migration đã chạy thành công.
Kiểm tra table names có đúng không (lowercase vs uppercase).

### Lỗi Realtime không hoạt động

1. Kiểm tra replication đã enable cho table chưa
2. Kiểm tra Supabase project không bị paused