import { selectUser } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, Flex } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import EditUser from './components/editUser';

import './style.scss';

const { Meta } = Card

const MyProfile = () => {

  const [userEditOpen, setUserEditOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);


  return (
    <>
      <Card
        className='card-design'
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            style={{ maxWidth: '100%', objectFit: 'cover' }}
          />
        }
      >
        <Meta
          avatar={<div style={{ position: "relative" }}>
            <Avatar src={user?.picturePath} size={128} className='profil_picture' />
            <Button onClick={() => setUserEditOpen(user?.id)} style={{ position: "absolute", bottom: 0, right: 0 }}>
              <EditOutlined key="edit" />
            </Button>
          </div>}
          title={<h1>{user?.name}</h1>}
        />

      </Card>
      <EditUser setUserEditOpen={setUserEditOpen} userEditOpen={userEditOpen} />
    </>
  )
}

export default MyProfile