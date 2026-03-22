import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardPage } from '@/modules/dashboard/DashboardPage';
import { PatientPage } from '@/modules/patient/PatientPage';
import { PatientDetailPage } from '@/modules/patient/PatientDetailPage';
import { AppointmentPage } from '@/modules/appointment/AppointmentPage';
import { CalendarView } from '@/modules/appointment/CalendarView';
import { ClinicalPage } from '@/modules/clinical/ClinicalPage';
import { BillingPage } from '@/modules/billing/BillingPage';
import { InventoryPage } from '@/modules/inventory/InventoryPage';
import { PharmacyPage } from '@/modules/pharmacy/PharmacyPage';
import { LabPage } from '@/modules/lab/LabPage';
import { ServicesPage } from '@/modules/services/ServicesPage';
import { ReportsPage } from '@/modules/reports/ReportsPage';
import { AdminPage } from '@/modules/admin/AdminPage';
import { SettingsPage } from '@/modules/settings/SettingsPage';
import { useStore } from '@/hooks/useStore';
import { useState } from 'react';
import { toast } from 'sonner';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="patients" element={<PatientPage />} />
          <Route path="patients/:patientId" element={<PatientDetailPage />} />
          <Route path="appointments" element={<AppointmentPage />} />
          <Route path="appointments/calendar" element={<CalendarView />} />
          <Route path="clinical" element={<ClinicalPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="pharmacy" element={<PharmacyPage />} />
          <Route path="lab" element={<LabPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function LoginPage() {
  const { login, isAuthenticated } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      toast.error('Đăng nhập thất bại');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
      <div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-xl border">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-2xl">DC</span>
          </div>
          <h1 className="text-2xl font-bold">DentalCare CRM</h1>
          <p className="text-muted-foreground">Đăng nhập để tiếp tục</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-10 px-3 mt-1 rounded-md border border-input bg-background"
              placeholder="Nhập tên đăng nhập"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 mt-1 rounded-md border border-input bg-background"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Đăng nhập
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Tài khoản demo: admin / password</p>
        </div>
      </div>
    </div>
  );
}
