import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CalendarView() {
  return (
    <div className="space-y-6">
      <PageHeader title="Lịch hẹn" description="Xem lịch theo ngày/tuần" />
      <Card>
        <CardHeader><CardTitle>Lịch làm việc</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Calendar view sẽ hiển thị ở đây</p></CardContent>
      </Card>
    </div>
  );
}
