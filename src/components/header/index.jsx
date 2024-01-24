import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.scss';
import { Button } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const username = localStorage.getItem('username');

  return (
    <div className="header">
      <h1>Todo App</h1>
      <div>
        <Link to="/login" {...(username && { onClick: () => localStorage.removeItem('username') })}>
          <Button type="primary" icon={username ? <LogoutOutlined /> : <UserOutlined />} size="large">
            {!username ? 'Log In' : <span>{username && `Welcome, ${username.toUpperCase()}!`}</span>}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
