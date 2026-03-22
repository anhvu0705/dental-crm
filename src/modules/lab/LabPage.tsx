import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function LabPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Xưởng răng" description="Quản lý labo răng" />
      <Card>
        <CardHeader><CardTitle>Đơn hàng Labo</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Danh sách đơn hàng labo sẽ hiển thị ở đây</p></CardContent>
      </Card>
    </div>
  );
}
