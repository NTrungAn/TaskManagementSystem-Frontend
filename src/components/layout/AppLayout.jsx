import { useState, createContext, useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProjectHeader from './ProjectHeader';
import CreateProjectModal from '../projects/CreateProjectModal';

// Context for layout state
const LayoutContext = createContext({});
export const useLayout = () => useContext(LayoutContext);

/**
 * AppLayout – main shell wrapping Sidebar + content area
 */
export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('board');
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Nếu không có token, chuyển hướng về trang login ngay lập tức
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch('https://taskmanagementsystem-backend-v1-0.onrender.com/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          // Token hết hạn hoặc không hợp lệ
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (err) {
        console.error('AppLayout user fetch error:', err);
      }
    };
    fetchUser();
  }, [navigate]);

  // Handle refresh projects - in a real app, use a hook or global state
  const handleProjectCreated = (newProject) => {
    // Refreshing current project list if on Projects page
    if (location.pathname === '/projects' || location.pathname === '/dashboard') {
        window.location.reload(); 
    }
  };

  // Show ProjectHeader only on project-related routes
  const showProjectHeader = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/projects');

  return (
    <LayoutContext.Provider value={{ sidebarCollapsed, activeTab, setActiveTab, user }}>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((v) => !v)}
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Project Header (only on project routes) */}
          {showProjectHeader && (
            <ProjectHeader
              userName={user?.username || 'Guest'}
              onCreateClick={() => setIsModalOpen(true)}
            />
          )}

          {/* Page content */}
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>

        {/* Modal Project */}
        <CreateProjectModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreated={handleProjectCreated}
        />
      </div>
    </LayoutContext.Provider>
  );
}
