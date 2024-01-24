import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Todo from './pages/todoApp/index';
import Login from './pages/login';
import UserOffline from './pages/login/components/useroffline';
import UserOnline from './pages/login/components/useronline';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<UserOnline><Todo /></UserOnline>}
          />
          <Route path="/login" element={<UserOffline><Login /></UserOffline>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
