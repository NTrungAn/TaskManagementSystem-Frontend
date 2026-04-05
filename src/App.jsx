import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage.jsx';
import BoardPage from './pages/BoardPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import Register from './pages/Register.jsx';
import HomePage from './pages/HomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* Protected / App routes with layout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId/board" element={<BoardPage />} />
          <Route path="/tasks" element={<Navigate to="/projects" replace />} />
          <Route path="/settings" element={
            <div className="p-8 text-center text-gray-500">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Settings</h2>
              <p>Coming soon...</p>
            </div>
          } />
        </Route>

        {/* Default redirect: send to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
