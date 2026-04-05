import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage.jsx';
import BoardPage from './pages/BoardPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected / App routes with layout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={
            <div className="p-8 text-center text-gray-500">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Dashboard</h2>
              <p>Coming soon...</p>
            </div>
          } />
          <Route path="/projects" element={<BoardPage />} />
          <Route path="/tasks" element={
            <div className="p-8 text-center text-gray-500">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">My Tasks</h2>
              <p>Coming soon...</p>
            </div>
          } />
          <Route path="/settings" element={
            <div className="p-8 text-center text-gray-500">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Settings</h2>
              <p>Coming soon...</p>
            </div>
          } />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/projects" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

