import { useState } from 'react';
import { Button, Popconfirm, Table, Modal, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const initialState = {
  name: '',
  age: '',
  address: '',
}

const App = () => {
  const [open, setOpen] = useState(false);
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
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState(initialState);

  const handleDelete = (id) => {
    const newData = dataSource.filter((item) => item.id !== id);
    setDataSource(newData);
  };

  const handleAdd = () => {
    if (editMode) {
      const updatedData = dataSource.map((item, index) =>
        index === editIndex ? { ...item, ...formData } : item
      );
      setDataSource(updatedData);
      setEditMode(false);
    } else {
      const newData = {
        id: dataSource.length.toString(),
        name: formData.name,
        age: formData.age,
        address: formData.address,
      };
      setDataSource([...dataSource, newData]);
    }

    setOpen(false);
    setFormData(initialState);
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setEditIndex(dataSource.findIndex((item) => item.id === record.id));
    setFormData(record);
    setOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };



  return (
    <div className='home-table'>
      <Button
        onClick={() => setOpen(true)}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table
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
                  <EditOutlined onClick={() => handleEdit(record)} />
                  <DeleteOutlined style={{ color: "red", marginLeft: 12 }} onClick={() => handleDelete(record.id)} />
                </>
              )
            }
          },
        ]}
      />
      <Modal
        visible={open}
        title={editMode ? 'Edit row' : 'Add row'}
        onOk={handleAdd}
        onCancel={() => {
          setEditMode(false);
          setOpen(false);
        }}
      >
        <form>
          <label>
            <Input placeholder='Name' type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            <Input placeholder='Age' type="text" name="age" value={formData.age} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            <Input placeholder='Address' type="text" name="address" value={formData.address} onChange={handleInputChange} />
          </label>
          <br />
        </form>
      </Modal>
    </div>
  );
};
export default App;