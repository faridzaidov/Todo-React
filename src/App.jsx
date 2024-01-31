import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Todo from './pages/todoApp/index';
import Login from './pages/login';
import UserOffline from './pages/login/components/useroffline';
import UserOnline from './pages/login/components/useronline';
import MyProfile from './pages/myprofile/index';

function App() {
  return (
      <>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<UserOnline><Todo /></UserOnline>}
          />
          <Route
            path="/myprofile"
            element={<UserOnline><MyProfile /></UserOnline>}
          />
          <Route path="/login" element={<UserOffline><Login /></UserOffline>} />
        </Routes>
      </>
  );
}

export default App;
