import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, AlertTriangle } from 'lucide-react';

export function InventoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Kho vật tư"
        description="Quản lý vật tư và thuốc"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nhập kho
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng vật tư</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">25 loại vật tư</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sắp hết hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">4</div>
            <p className="text-xs text-muted-foreground">Cần nhập gấp</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sắp hết hạn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-xs text-muted-foreground">Trong 30 ngày</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Giá trị kho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45M</div>
            <p className="text-xs text-muted-foreground">Tổng giá trị tồn kho</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách vật tư cần nhập</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Thuốc gây tê', quantity: '5', min: '20', unit: 'Ống' },
              { name: 'Bông gòn', quantity: '2', min: '50', unit: 'Gói' },
              { name: 'Găng tay y tế', quantity: '15', min: '100', unit: 'Đôi' },
              { name: 'Kem đánh răng', quantity: '3', min: '20', unit: 'Tuýp' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-red-50 border border-red-200">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Tồn kho: {item.quantity} {item.unit}</p>
                  </div>
                </div>
                <Button size="sm" variant="destructive">Nhập hàng</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
