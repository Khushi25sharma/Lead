import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';

import Dashboard from './pages/Dashboard';
import LeadsPage from './pages/LeadsPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Layout>
      <Routes>
        {/* main layout routes */}
        <Route>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<LeadsPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div className="text-white">404</div>} />
      </Routes>
      </Layout> 
      {/* toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: '#363636', color: '#fff' },
          success: { style: { background: '#10B981', color: '#fff' } },
          error: { duration: 5000 },
        }}
      />
    </div>
  );
};

export default App;
