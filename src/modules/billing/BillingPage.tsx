import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';

export function BillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Thanh toán"
        description="Quản lý hóa đơn và thanh toán"
        action={
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Xuất báo cáo
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tạo hóa đơn
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng doanh thu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">185,500,000đ</div>
            <p className="text-xs text-green-600">+15% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Đã thanh toán</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">180,000,000đ</div>
            <p className="text-xs text-muted-foreground">32 hóa đơn</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Công nợ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">5,500,000đ</div>
            <p className="text-xs text-muted-foreground">3 hóa đơn chưa thanh toán</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách hóa đơn gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Mã hóa đơn</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Bệnh nhân</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Ngày</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Tổng tiền</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">#HD-001</td>
                  <td className="px-4 py-3">Nguyễn Văn A</td>
                  <td className="px-4 py-3">10/01/2024</td>
                  <td className="px-4 py-3 text-right">2,500,000đ</td>
                  <td className="px-4 py-3 text-right">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">Đã thanh toán</span>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">#HD-002</td>
                  <td className="px-4 py-3">Trần Thị B</td>
                  <td className="px-4 py-3">08/01/2024</td>
                  <td className="px-4 py-3 text-right">1,500,000đ</td>
                  <td className="px-4 py-3 text-right">
                    <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700">Chưa thanh toán</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
