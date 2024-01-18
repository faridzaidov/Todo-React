import { Button, Popconfirm, Table as T, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddModal from '../modal/addModal';
import EditModal from '../modal/editModal';
import { fetchTodoData, selectPosts } from '../../../store/posts';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteTodo } from '../../../store/posts';

const Table = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [{ current, limit }, setPagination] = useState({
        page: 1,
        limit: 10
    });
    const dispatch = useDispatch();
    const { posts = [], isGetting } = useSelector(selectPosts);


    const handleDelete = (id) => {
        dispatch(fetchDeleteTodo(id));
    };

    const handlePageChange = (page, limit) => {
        setPagination({
            current: page,
            limit
        });
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
                rowClassName='editable-row'
                bordered
                rowKey='id'
                loading={isGetting}
                dataSource={posts}
                pagination={{
                    current,
                    onChange: handlePageChange,
                    total: 200,
                    limit: limit,
                }}
                columns={[
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        editable: true,
                    },
                    {
                        title: 'Title',
                        dataIndex: 'title',
                    },
                    {
                        title: 'Body',
                        dataIndex: 'body',
                    },
                    {
                        title: 'operation',
                        dataIndex: 'operation',
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