import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../store/slices/layoutSlice';
import {
  LayoutDashboard,
  Users,
  Activity,
  ClipboardList,
  UtensilsCrossed,
  DollarSign,
  Bell,
  FileBarChart,
  Shield,
  CheckSquare
} from 'lucide-react';
import { useMemo } from 'react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/goats', icon: Users, label: 'Goat Registry' },
  { to: '/breeding', icon: ClipboardList, label: 'Breeding' },
  { to: '/health', icon: Activity, label: 'Health' },
  { to: '/feed', icon: UtensilsCrossed, label: 'Feed & Nutrition' },
  { to: '/finance', icon: DollarSign, label: 'Finance' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/reports', icon: FileBarChart, label: 'Reports' },
  { to: '/compliance', icon: Shield, label: 'Compliance' }
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.layout.sidebarOpen);

  const classes = useMemo(
    () => ({
      sidebar: `fixed inset-y-0 left-0 z-20 bg-white border-r border-slate-200 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`,
      nav: 'mt-6 space-y-2 px-3'
    }),
    [sidebarOpen]
  );

  return (
    <aside className={classes.sidebar}>
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          {sidebarOpen && <span className="font-semibold text-slate-800">GFMS</span>}
        </div>
        <button
          type="button"
          onClick={() => dispatch(toggleSidebar())}
          className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
        >
          ☰
        </button>
      </div>
      <nav className={classes.nav}>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {sidebarOpen && label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
