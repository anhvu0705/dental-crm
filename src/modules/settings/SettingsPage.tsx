import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cài đặt"
        description="Cấu hình hệ thống"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin phòng khám</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Cấu hình thông tin chi nhánh và thông tin liên hệ.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Quản lý tài khoản và phân quyền người dùng.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
