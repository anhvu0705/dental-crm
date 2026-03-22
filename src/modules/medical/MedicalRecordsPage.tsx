import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MedicalRecordsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Hồ sơ y tế" description="Quản lý hồ sơ bệnh nhân" />
      <Card>
        <CardHeader><CardTitle>Hồ sơ bệnh án</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Hồ sơ bệnh án sẽ hiển thị ở đây</p></CardContent>
      </Card>
    </div>
  );
}
