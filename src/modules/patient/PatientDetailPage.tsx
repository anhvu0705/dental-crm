import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, AlertTriangle } from 'lucide-react';

export function PatientDetailPage() {
  const { patientId } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin bệnh nhân</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">NVA</span>
                </div>
                <div>
                  <h3 className="font-semibold">Nguyễn Văn A</h3>
                  <p className="text-sm text-muted-foreground">BN-001</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>0901234567</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>nguyenvana@email.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>15/05/1990 (33 tuổi)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>123 Đường ABC, Quận 1, TP.HCM</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Dị ứng: Penicillin</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="history">
            <TabsList>
              <TabsTrigger value="history">Lịch sử khám</TabsTrigger>
              <TabsTrigger value="treatment">Điều trị</TabsTrigger>
              <TabsTrigger value="billing">Thanh toán</TabsTrigger>
              <TabsTrigger value="odontogram">Sơ đồ răng</TabsTrigger>
            </TabsList>
            <TabsContent value="history" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {[
                      { date: '10/01/2024', service: 'Khám tổng quát', doctor: 'Bs. Trần Thị B', status: 'completed' },
                      { date: '05/12/2023', service: 'Trám răng', doctor: 'Bs. Trần Thị B', status: 'completed' },
                      { date: '20/10/2023', service: 'Cạo vôi răng', doctor: 'Bs. Lê Văn C', status: 'completed' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">{item.service}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.date} - {item.doctor}
                          </p>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                          Hoàn thành
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="treatment" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">Chưa có kế hoạch điều trị</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="billing" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">Hóa đơn #001</p>
                        <p className="text-sm text-muted-foreground">10/01/2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">2,500,000đ</p>
                        <span className="text-xs text-green-600">Đã thanh toán</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="odontogram" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">Sơ đồ răng sẽ hiển thị ở đây</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
