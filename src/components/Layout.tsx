import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <TopBar />
      <main className="ml-64 pt-24 p-8">
        <Outlet />
      </main>
    </div>
  );
};
