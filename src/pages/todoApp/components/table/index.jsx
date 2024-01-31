import { Button, Popconfirm, Table as T } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddModal from '../../modal/addModal';
import EditModal from '../../modal/editModal';
import { fetchTodoData, selectPosts, fetchDeleteTodo } from '../../store/posts';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
import { useSearchParams } from 'react-router-dom';

const Table = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const current = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    const dispatch = useDispatch();
    const { posts = [], pagination, isGetting } = useSelector(selectPosts);
    
    const handleDelete = (id) => {
        dispatch(fetchDeleteTodo(id));
    };

    const handlePageChange = (page, pageSize) => {
        setSearchParams(prev => {
            if (page === 1 && pageSize=== 10) {
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
        dispatch(fetchTodoData({ page: current, limit: limit }));
    }, [current, limit, dispatch]);

    return (
        <div className='home-table'>
            <Button
                onClick={() => setAddModalOpen(true)}
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
                dataSource={posts}
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
                        title: 'UserId',
                        dataIndex: 'userId',
                    },
                    {
                        title: 'Name',
                        dataIndex: 'name',
                    },

                    {
                        title: 'Surname',
                        dataIndex: 'surname',
                    },
                    {
                        title: 'Birthday',
                        dataIndex: 'dateOfBirth',
                    },
                    {
                        title: 'Age',
                        dataIndex: 'age',
                    },
                    {
                        title: 'Patronymic',
                        dataIndex: 'patronymic',
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
                                    <EditOutlined onClick={() => setEditModalOpen(record.id)} />
                                    <Popconfirm title="Delete?" onConfirm={() => handleDelete(record.id)}>
                                        <DeleteOutlined style={{ color: "red", marginLeft: 12 }} />
                                    </Popconfirm>

                                </>
                            )
                        }
                    },
                ]}
            />
            <AddModal setAddModalOpen={setAddModalOpen} addModalOpen={addModalOpen} />
            <EditModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} />
        </div>
    );
};
export default Table;