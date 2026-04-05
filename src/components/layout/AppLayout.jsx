import { useState, createContext, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProjectHeader from './ProjectHeader';

// Context for layout state
const LayoutContext = createContext({});
export const useLayout = () => useContext(LayoutContext);

/**
 * AppLayout – main shell wrapping Sidebar + content area
 * Sidebar can be collapsed by clicking the toggle button.
 * ProjectHeader is shown when on project-related routes.
 */
export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('board');
  const location = useLocation();

  // Show ProjectHeader only on project detail pages
  const showProjectHeader = location.pathname.startsWith('/projects');

  return (
    <LayoutContext.Provider value={{ sidebarCollapsed, activeTab, setActiveTab }}>
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
              projectName="Project"
              pageName="Website bán laptop"
              members={[
                { name: 'Alice', initials: 'A' },
                { name: 'Bob', initials: 'B' },
                { name: 'Carol', initials: 'C' },
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          )}

          {/* Page content */}
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}
