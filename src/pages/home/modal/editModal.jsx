import { Modal, Input } from 'antd'
import React from 'react'
import { useState } from 'react';
const initialState = {
    name: '',
    age: '',
    address: '',
}
const EditModal = ({editModalOpen, setEditModalOpen, dataSource=[],setDataSource}) => {
console.log(setEditModalOpen)
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEdit = () => {
        const updatedData = dataSource.map((item) =>
            item.id === editModalOpen ? { ...item, ...formData } : item
        );
        setDataSource(updatedData);
        setEditModalOpen(false);
    };

    console.log(formData)

    return (
        <Modal
            open={editModalOpen}
            title='Edit row'
            onOk={handleEdit}
            onCancel={() => setEditModalOpen(false)}
            afterOpenChange={open => {
                if (open) {
                    setFormData(dataSource.find(item => item.id === editModalOpen)??initialState)
                }
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
    )
}

export default EditModal