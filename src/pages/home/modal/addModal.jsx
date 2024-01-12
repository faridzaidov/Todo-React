import React from 'react'
import { Modal, Input } from 'antd';
import { useState } from 'react';
const initialState = {
    name: '',
    age: '',
    address: '',
}
const AddModal = ({ addModalOpen, setAddModalOpen, setDataSource }) => {

    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAdd = () => {
        const newData = {
            id: new Date().getTime(),
            name: formData.name,
            age: formData.age,
            address: formData.address,
        };
        setDataSource(prev => [...prev, newData]);
        setAddModalOpen(false);
    };

    
    // prevv//////


    return (
        <Modal
            open={addModalOpen}
            title='Add row'
            onOk={handleAdd}
            onCancel={() => setAddModalOpen(false)}
            afterClose={() => setFormData(initialState)}
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

export default AddModal