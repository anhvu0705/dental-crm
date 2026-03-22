import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function ServicesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dịch vụ"
        description="Quản lý danh mục dịch vụ nha khoa"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Thêm dịch vụ
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { name: 'Khám tổng quát', price: '150,000đ', duration: '30 phút', count: 45 },
          { name: 'Trám răng', price: '300,000đ', duration: '45 phút', count: 32 },
          { name: 'Nhổ răng', price: '500,000đ', duration: '30 phút', count: 18 },
          { name: 'Cạo vôi răng', price: '200,000đ', duration: '30 phút', count: 56 },
          { name: 'Tẩy trắng răng', price: '2,500,000đ', duration: '90 phút', count: 8 },
          { name: 'Lấy cao răng', price: '350,000đ', duration: '45 phút', count: 28 },
        ].map((service, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-lg">{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Giá:</span>
                  <span className="font-medium">{service.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Thời gian:</span>
                  <span>{service.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Đã thực hiện:</span>
                  <span className="font-medium">{service.count} lần</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
