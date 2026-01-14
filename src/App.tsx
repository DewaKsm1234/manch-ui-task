import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EmployeeProvider } from './context/EmployeeContext';
import { AppLayout } from './components/AppLayout';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import NotFound from './pages/NotFound';

const App = () => (
  <EmployeeProvider>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Admin Routes */}
        <Route element={<AppLayout allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Manager Routes */}
        <Route element={<AppLayout allowedRoles={['manager']} />}>
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        </Route>

        {/* Employee Routes */}
        <Route element={<AppLayout allowedRoles={['employee']} />}>
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </EmployeeProvider>
);

export default App;
