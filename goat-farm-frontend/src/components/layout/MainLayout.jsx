import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const MainLayout = () => {
  const sidebarOpen = useSelector((state) => state.layout.sidebarOpen);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <TopBar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
