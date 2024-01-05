import React from 'react';
import NavigationBar from './NavigationBar';
import "../Styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <NavigationBar />
      <div className="content">{children}</div>
    </div>
  );
}

export default Layout;