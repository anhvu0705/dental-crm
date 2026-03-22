import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Phone, Mail, Calendar } from 'lucide-react';

const mockPatients = [
  { id: '1', name: 'Nguyễn Văn A', phone: '0901234567', dob: '1990-05-15', lastVisit: '2024-01-10', totalSpent: 15000000, debt: 0 },
  { id: '2', name: 'Trần Thị B', phone: '0912345678', dob: '1985-08-22', lastVisit: '2024-01-08', totalSpent: 8500000, debt: 500000 },
  { id: '3', name: 'Lê Văn C', phone: '0923456789', dob: '1995-12-03', lastVisit: '2024-01-05', totalSpent: 3200000, debt: 0 },
  { id: '4', name: 'Phạm Thị D', phone: '0934567890', dob: '1988-03-18', lastVisit: '2024-01-03', totalSpent: 4500000, debt: 1200000 },
];

export function PatientPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = mockPatients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản lý Bệnh nhân"
        description={`Tổng cộng ${mockPatients.length} bệnh nhân`}
        action={
          <Button onClick={() => navigate('/patients/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm bệnh nhân
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm bệnh nhân..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Họ tên</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Điện thoại</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Ngày sinh</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Lần khám cuối</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Tổng chi tiêu</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Công nợ</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => navigate(`/patients/${patient.id}`)}
                  >
                    <td className="px-4 py-3 font-medium">{patient.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{patient.phone}</td>
                    <td className="px-4 py-3">{patient.dob}</td>
                    <td className="px-4 py-3">{patient.lastVisit}</td>
                    <td className="px-4 py-3 text-right">
                      {new Intl.NumberFormat('vi-VN').format(patient.totalSpent)}đ
                    </td>
                    <td className="px-4 py-3 text-right">
                      {patient.debt > 0 ? (
                        <span className="text-red-600">
                          {new Intl.NumberFormat('vi-VN').format(patient.debt)}đ
                        </span>
                      ) : (
                        <span className="text-green-600">0đ</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
