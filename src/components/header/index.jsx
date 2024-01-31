import React from 'react';
import './style.scss';
import { Link, useLocation } from 'react-router-dom';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, selectUser } from '../../store/user'
import { Dropdown, Card, Space, Avatar, Button } from 'antd';
import { signOut } from '../../pages/login/store/auth';
import { Menu } from 'antd';

const Header = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(selectUser)

  const [loading, setLoading] = useState();
  const onChange = (checked) => {
    setLoading(!checked);
  };
  const { Meta } = Card;
  const items = [
    {
      type: 'divider',
    },
    {
      icon: <UserOutlined />,
      label: <a href="/myprofile">My Profile</a>,
      key: '1',
    },
    {
      icon: <LogoutOutlined />,
      label: <a onClick={() => dispatch(signOut())}>Log out</a>,
      key: '3',
    },
  ];
  return (
    <div className="header">
      <a href='/' style={{ textDecoration: "none" }}>
        <h1>Todo App</h1>
      </a>
      <div>
        <Dropdown
          menu={{
            items,
          }}
          dropdownRender={() => (
            <Card>
              <Meta
                avatar={<Avatar src={user?.picturePath} />}
                title={user?.name}
              />
              <Menu
                className='menu_list'
                mode="inline"
                items={items}
              />
            </Card>
          )}
          placement='bottomRight'
          trigger={['click']}
          rootClassName='user-dropdown'
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Button type="primary" size="large">
                {!user?.name ? 'Log In' :
                  <span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      {user.name && `Welcome, ${user.name.toUpperCase()}!`}
                      <img src={user?.picturePath} style={{ width: 20, height: 20, borderRadius: '50%', overflow: 'hidden' }}></img>
                    </div>
                  </span>
                }
                <DownOutlined />
              </Button>

            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
