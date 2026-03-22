import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Calendar } from 'lucide-react';

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Báo cáo"
        description="Thống kê và báo cáo doanh thu"
        action={
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu theo ngày</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Biểu đồ doanh thu
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu theo dịch vụ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Biểu đồ dịch vụ
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
