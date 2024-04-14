import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Root from './pages/Root';
import RegisterStep1 from './components/RegisterStep1';
import RegisterStep2 from './components/RegisterStep2';
import RegisterStep3 from './components/RegisterStep3';
import RegisterStep4 from './components/RegisterStep4';
import RegistrationSuccess from './components/RegistrationSuccess';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import ProfileManagement from './components/ProfileManagement';
import InventoryManagement from './components/InventoryManagement';
import OrderManagement from './components/OrderManagement';
import InvertoryManagementAdd from './components/InvertoryManagementAdd';
import OrderManagementDetails from './components/OrderManagementDetails';
import Notifications from './components/Notifications';
import LinkClover from './components/LinkClover';
import InvertoryManagementUpdate from './components/InvertoryManagementUpdate';
import AdminDashboard from './components/AdminDashboard';
import Reports from './components/Reports';

function App() {
  const isUserLoggedIn = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Login />} />
          <Route path="register-step-1" element={<RegisterStep1 />} />
          <Route path="register-step-2" element={<RegisterStep2 />} />
          <Route path="register-step-3" element={<RegisterStep3 />} />
          <Route path="register-step-4" element={<RegisterStep4 />} />
          <Route path="final" element={<RegistrationSuccess />} />
        </Route>
        <Route path="/dashboard" element={!isUserLoggedIn ? <Navigate to="/" /> : <Dashboard />}>
          <Route path="" element={!isUserLoggedIn ? <Navigate to="/" /> :<AdminDashboard />} />
          <Route path="profile-management" element={!isUserLoggedIn ? <Navigate to="/" /> : <ProfileManagement />} />
          <Route path="order-management" element={!isUserLoggedIn ? <Navigate to="/" /> : <OrderManagement />} />
          <Route path="order-management-details" element={!isUserLoggedIn ? <Navigate to="/" /> : <OrderManagementDetails />} />
          <Route path="inventory-management" element={!isUserLoggedIn ? <Navigate to="/" /> : <InventoryManagement />} />
          <Route path="inventory-management-add" element={!isUserLoggedIn ? <Navigate to="/" /> : <InvertoryManagementAdd />} />
          <Route path="inventory-management-update" element={!isUserLoggedIn ? <Navigate to="/" /> : <InvertoryManagementUpdate />} />
          <Route path="notifications" element={!isUserLoggedIn ? <Navigate to="/" /> : <Notifications />} />
          <Route path="link-clover" element={!isUserLoggedIn ? <Navigate to="/" /> : <LinkClover />} />
          <Route path="reports" element={!isUserLoggedIn ? <Navigate to="/" /> : <Reports />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
