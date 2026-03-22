import { useStore } from '@/hooks/useStore';
import { PageHeader } from '@/components/common/PageHeader';
import {
  Calendar,
  Users,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  Package,
  Clock,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const statCards = [
  {
    title: 'Lịch hẹn hôm nay',
    value: '12',
    subValue: '8 đã hoàn thành',
    icon: Calendar,
    trend: '+2',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Tổng bệnh nhân',
    value: '245',
    subValue: '18 bệnh nhân mới',
    icon: Users,
    trend: '+5%',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    title: 'Doanh thu hôm nay',
    value: '12.5M',
    subValue: 'Tháng này: 185M',
    icon: TrendingUp,
    trend: '+15%',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'Công nợ chờ thu',
    value: '3',
    subValue: 'Cần theo dõi',
    icon: AlertTriangle,
    trend: '-2',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
];

export function DashboardPage() {
  const { stats } = useStore();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Tổng quan hoạt động phòng khám"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subValue}</p>
              <div className="flex items-center mt-2 text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.trend} so với hôm qua
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lịch hẹn sắp tới</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '09:00', name: 'Nguyễn Văn A', service: 'Khám tổng quát', status: 'confirmed' },
                { time: '10:30', name: 'Trần Thị B', service: 'Trám răng', status: 'arrived' },
                { time: '14:00', name: 'Lê Văn C', service: 'Nhổ răng', status: 'scheduled' },
                { time: '15:30', name: 'Phạm Thị D', service: 'Cạo vôi', status: 'scheduled' },
              ].map((appointment, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-muted-foreground">
                      {appointment.time}
                    </div>
                    <div>
                      <p className="font-medium">{appointment.name}</p>
                      <p className="text-sm text-muted-foreground">{appointment.service}</p>
                    </div>
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
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vật tư cần nhập</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Thuốc gây tê', quantity: '5', min: '10' },
                { name: 'Bông gòn', quantity: '2', min: '20' },
                { name: 'Găng tay y tế', quantity: '15', min: '50' },
                { name: 'Kem đánh răng', quantity: '3', min: '10' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-red-600">
                      {item.quantity} {item.min && `/ ${item.min}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
