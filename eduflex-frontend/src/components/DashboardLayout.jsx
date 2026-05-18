
import React, { useState } from 'react';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="pt-20 md:pl-64">
        <div className="w-full max-w-[1600px] mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
