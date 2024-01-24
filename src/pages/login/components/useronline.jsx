// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UserOnline = ({ children }) => {
  const isLoggedIn = localStorage.getItem('username');

  if (!isLoggedIn) {
    return <Navigate to='/login' replace />
  }

  return <>{children ?? <Outlet />}</>;
};

export default UserOnline;
