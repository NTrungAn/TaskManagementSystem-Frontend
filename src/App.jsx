import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage.jsx';
import BoardPage from './pages/BoardPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* Protected / App routes with layout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={
            <div className="p-8 text-center text-gray-500">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Dashboard</h2>
              <p>Coming soon...</p>
            </div>
          } />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tasks" element={<BoardPage />} />
          <Route path="/settings" element={
            <div className="p-8 text-center text-gray-500">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Settings</h2>
              <p>Coming soon...</p>
            </div>
          } />
        </Route>

        {/* Default redirect: send to register for testing */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
