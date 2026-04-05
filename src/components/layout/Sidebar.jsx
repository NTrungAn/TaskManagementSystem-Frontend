import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Heart,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'project', label: 'Project', icon: FolderKanban, path: '/projects' },
  { id: 'tasks', label: 'My Tasks', icon: CheckSquare, path: '/tasks' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside
      className={`relative flex flex-col h-screen bg-white border-r border-gray-100 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-[280px]'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-5 py-6 ${collapsed ? 'justify-center px-0' : ''}`}>
        {/* Logo Icon */}
        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0 border-2 border-indigo-200">
          <Heart className="w-6 h-6 text-indigo-600" strokeWidth={2} />
        </div>
        {!collapsed && (
          <span className="text-[18px] font-bold text-indigo-700 whitespace-nowrap leading-tight">
            Working Together
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-3 pt-4">
        {NAV_ITEMS.map(({ id, label, icon: Icon, path }) => {
          const active = isActive(path);
          return (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                transition-all duration-150 cursor-pointer
                ${collapsed ? 'justify-center' : ''}
                ${
                  active
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }
              `}
              title={collapsed ? label : undefined}
            >
              <Icon
                className={`w-[22px] h-[22px] shrink-0 ${active ? 'text-indigo-600' : 'text-gray-500'}`}
                strokeWidth={active ? 2 : 1.75}
              />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom: Logout */}
      <div className={`px-3 pb-6 ${collapsed ? 'flex justify-center' : ''}`}>
        <button
          className={`
            w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
            text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150 cursor-pointer underline
            ${collapsed ? 'justify-center w-auto' : ''}
          `}
          title={collapsed ? 'Log out' : undefined}
        >
          <LogOut className="w-[22px] h-[22px] shrink-0" strokeWidth={1.75} />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>

      {/* Collapse Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-300 shadow-sm transition-all duration-150 cursor-pointer z-10"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" strokeWidth={2} />
        ) : (
          <ChevronLeft className="w-4 h-4" strokeWidth={2} />
        )}
      </button>
    </aside>
  );
}
