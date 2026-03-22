import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PharmacyPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dược phòng" description="Quản lý thuốc và kê đơn" />
      <Card>
        <CardHeader><CardTitle>Danh sách thuốc</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Danh sách thuốc sẽ hiển thị ở đây</p></CardContent>
      </Card>
    </div>
  );
}
