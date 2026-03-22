import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Plus, Clock, User } from 'lucide-react';

export function AppointmentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Lịch hẹn"
        description="Quản lý lịch hẹn khám bệnh"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Đặt lịch hẹn
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { time: '09:00', patient: 'Nguyễn Văn A', service: 'Khám tổng quát', doctor: 'Bs. Trần Thị B', status: 'confirmed' },
          { time: '10:30', patient: 'Trần Thị B', service: 'Trám răng', doctor: 'Bs. Trần Thị B', status: 'arrived' },
          { time: '14:00', patient: 'Lê Văn C', service: 'Nhổ răng', doctor: 'Bs. Lê Văn C', status: 'scheduled' },
          { time: '15:30', patient: 'Phạm Thị D', service: 'Cạo vôi', doctor: 'Bs. Trần Thị B', status: 'scheduled' },
          { time: '16:00', patient: 'Hoàng Văn E', service: 'Tẩy trắng răng', doctor: 'Bs. Lê Văn C', status: 'scheduled' },
        ].map((appointment, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-lg">{appointment.time}</CardTitle>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    appointment.status === 'arrived'
                      ? 'bg-green-100 text-green-700'
                      : appointment.status === 'confirmed'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {appointment.status === 'arrived'
                    ? 'Đã đến'
                    : appointment.status === 'confirmed'
                    ? 'Đã xác nhận'
                    : 'Chờ'}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{appointment.patient}</p>
                <p className="text-sm text-muted-foreground">{appointment.service}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-3 w-3" />
                  {appointment.doctor}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
