import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { logout } from './store/slices/authSlice';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import GoatsPage from './pages/GoatsPage';
import BreedingPage from './pages/BreedingPage';
import HealthPage from './pages/HealthPage';
import FeedPage from './pages/FeedPage';
import FinancePage from './pages/FinancePage';
import TasksPage from './pages/TasksPage';
import NotificationsPage from './pages/NotificationsPage';
import ReportsPage from './pages/ReportsPage';
import CompliancePage from './pages/CompliancePage';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const listener = (event) => {
      if (event.key === 'gfms_token' && !event.newValue) {
        dispatch(logout());
      }
    };
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="goats" element={<GoatsPage />} />
        <Route path="breeding" element={<BreedingPage />} />
        <Route path="health" element={<HealthPage />} />
        <Route path="feed" element={<FeedPage />} />
        <Route path="finance" element={<FinancePage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="compliance" element={<CompliancePage />} />
      </Route>
    </Routes>
  );
};

export default App;
