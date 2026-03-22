import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Quản trị" description="Quản lý hệ thống" />
      <Card>
        <CardHeader><CardTitle>Quản lý người dùng</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Danh sách người dùng sẽ hiển thị ở đây</p></CardContent>
      </Card>
    </div>
  );
}
