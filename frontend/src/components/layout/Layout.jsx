import React from 'react';
import Navbar from './NavBar.jsx';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen big-base-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
};

export default Layout;
