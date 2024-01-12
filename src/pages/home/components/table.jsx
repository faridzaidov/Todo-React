import { useState } from 'react';
import { Button, Popconfirm, Table as T, Modal, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddModal from '../modal/addModal';
import EditModal from '../modal/editModal';



const Table = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    // const [formData, setFormData] = useState(initialState);

    const [dataSource, setDataSource] = useState([
        {
            id: '0',
            name: 'Edward King 0',
            age: '32',
            address: 'London, Park Lane no. 0',
        },
        {
            id: '1',
            name: 'Edward King 1',
            age: '32',
            address: 'London, Park Lane no. 1',
        },
    ]);





    const handleDelete = (id) => {
        const newData = dataSource.filter((item) => item.id !== id);
        setDataSource(newData);
    };



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
                dataSource={dataSource}
                columns={[
                    {
                        title: 'name',
                        dataIndex: 'name',
                        width: '30%',
                        editable: true,
                    },
                    {
                        title: 'age',
                        dataIndex: 'age',
                    },
                    {
                        title: 'address',
                        dataIndex: 'address',
                    },
                    {
                        title: 'operation',
                        dataIndex: 'operation',
                        render: (_, record) => {
                            return (
                                <>
                                    <EditOutlined onClick={() => setEditModalOpen(record.id)} />
                                    <DeleteOutlined style={{ color: "red", marginLeft: 12 }} onClick={() => handleDelete(record.id)} />
                                </>
                            )
                        }
                    },
                ]}
            />
            <AddModal setAddModalOpen={setAddModalOpen} addModalOpen={addModalOpen} setDataSource={setDataSource}/>
            <EditModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} dataSource={dataSource} setDataSource={setDataSource} />
        </div>
    );
};
export default Table;