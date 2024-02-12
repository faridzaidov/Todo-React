import { Button, Popconfirm, Table as T } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { UsersData, selectPosts, UsersDelete } from '../../store/users';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import './style.scss';
import AddUser from '../../modal/addUser';


const Table = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const current = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    const dispatch = useDispatch();
    const { users = [], pagination, isGetting } = useSelector(selectPosts);
    const [addUserOpen, setAddUserOpen] = useState(false);
    const handleDelete = (id) => {
        dispatch(UsersDelete(id));
    };

    const handlePageChange = (page, pageSize) => {
        setSearchParams(prev => {
            if (page === 1 && pageSize === 10) {
                prev.delete('page');
                prev.delete('limit')
            } else {
                prev.set('page', page);
                prev.set('limit', pageSize)
            }
            return prev;
        })
    };

    useEffect(() => {
        dispatch(UsersData({ page: current, limit: limit }));
    }, [current, limit, dispatch]);

    return (
        <div className='user-table'>
            <Button
                onClick={() => setAddUserOpen(true)}
                type="primary"
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
                loading={isGetting}
                dataSource={users}
                scroll={{
                    x: 'max-content',
                }}
                pagination={{
                    current,
                    onChange: handlePageChange,
                    total: pagination?.totalItems,
                    pageSize: limit,
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
                        render: (value) => (
                            <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden' }}>
                                <img src={value} style={{ maxWidth: '100%' }} />
                            </div>
                        )
                    },
                    {
                        title: 'Cover',
                        dataIndex: 'coverPath',
                        render: (value) => (
                            <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden' }}>
                                <img src={value} style={{ maxWidth: '100%' }} />
                            </div>
                        )
                    },
                    {
                        title: 'Created',
                        dataIndex: 'createdAt',
                    },
                    {
                        title: 'Updated',
                        dataIndex: 'updatedAt',
                    },

                    {
                        title: 'operation',
                        dataIndex: 'operation',
                        fixed: 'right',
                        render: (_, record) => {
                            return (
                                <>
                                    <Popconfirm title="Delete?" onConfirm={() => handleDelete(record.id)}>
                                        <DeleteOutlined style={{ color: "red", marginLeft: 12 }} />
                                    </Popconfirm>
                                </>
                            )
                        }
                    },
                ]}
            />
            <AddUser addUserOpen={addUserOpen} setAddUserOpen={setAddUserOpen} />
        </div>
    );
};
export default Table;