import { Button, Popconfirm, Table as T } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AddUser from '../../modal/addUser';
import './style.scss';
import { useGetUsersQuery, useDeleteUserMutation } from '../../store/usersApi';
import dayjs from 'dayjs';
const Table = () => {
   const [addUserOpen, setAddUserOpen] = useState(false);
   const { data: users = [], isLoading: isLoadingGetUsers } = useGetUsersQuery();
   const [deleteUser, { isLoading: isLoadingDeleteUser }] = useDeleteUserMutation();

   const handleDelete = id => {
      deleteUser(id)
         .unwrap()
         .then(() => console.log('silindi'))
         .catch(error => {
            console.error('Failed to delete user:', error);
         });
   };

   return (
      <div className='user-table'>
         <Button
            onClick={() => setAddUserOpen(true)}
            type='primary'
            style={{
               marginBottom: 16,
            }}
         >
            Add a row
         </Button>
         <T
            className='table'
            rowClassName='editable-row'
            bordered
            rowKey='id'
            loading={isLoadingGetUsers || isLoadingDeleteUser}
            dataSource={users}
            scroll={{
               x: 'max-content',
            }}
            columns={[
               {
                  title: 'ID',
                  dataIndex: 'id',
                  editable: true,
               },
               {
                  title: 'Name',
                  dataIndex: 'name',
               },

               {
                  title: 'Username',
                  dataIndex: 'username',
               },
               {
                  title: 'Picture',
                  dataIndex: 'picturePath',
                  render: value => (
                     <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden' }}>
                        <img alt={value} src={value} style={{ maxWidth: '100%' }} />
                     </div>
                  ),
               },
               {
                  title: 'Cover',
                  dataIndex: 'coverPath',
                  render: value => (
                     <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {value ? (
                           <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden' }}>
                              <img alt={value} src={value} style={{ maxWidth: '100%' }} />
                           </div>
                        ) : (
                           <img alt='default user' src='/img.png' className='userIcon' />
                        )}
                     </div>
                  ),
               },
               {
                  title: 'Created',
                  dataIndex: 'createdAt',
                  render: createdAt => dayjs(createdAt).format('DD.MM.YYYY / HH:mm'),
               },
               {
                  title: 'operation',
                  dataIndex: 'operation',
                  fixed: 'right',
                  render: (_, record) => {
                     return (
                        <>
                           <Popconfirm title='Delete?' onConfirm={() => handleDelete(record.id)}>
                              <DeleteOutlined style={{ color: 'red', marginLeft: 12 }} />
                           </Popconfirm>
                        </>
                     );
                  },
               },
            ]}
         />
         <AddUser addUserOpen={addUserOpen} setAddUserOpen={setAddUserOpen} />
      </div>
   );
};
export default Table;
