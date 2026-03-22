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
import { LoginPage } from '@/modules/auth/LoginPage';
import { RegisterPage } from '@/modules/auth/RegisterPage';
import { useAuth } from '@/hooks';
import { Loader2 } from 'lucide-react';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
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

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;