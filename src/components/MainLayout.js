import {Outlet} from 'react-router-dom'
import Navigation from './Navigation';
import React from 'react';

const MainLayout = () => {
    return (
      <div className="default-layout">
        <header className="header">
          <Navigation />
        </header>
        <Outlet />
        </div>
    );
  };

  export default MainLayout;
