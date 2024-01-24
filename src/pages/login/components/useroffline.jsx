// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UserOffline = ({ children }) => {
  const isLoggedIn = localStorage.getItem('username');

  if (!!isLoggedIn) {
    return <Navigate to='/' replace />
  }

  return <>{children ?? <Outlet />}</>;
};

export default UserOffline;
