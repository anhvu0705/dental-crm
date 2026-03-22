import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ClinicalPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Lâm sàng"
        description="Hồ sơ và sơ đồ răng bệnh nhân"
      />

      <Card>
        <CardHeader>
          <CardTitle>Chọn bệnh nhân để xem hồ sơ lâm sàng</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Vui lòng chọn bệnh nhân từ danh sách bệnh nhân hoặc tìm kiếm để xem chi tiết hồ sơ lâm sàng và sơ đồ răng.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
