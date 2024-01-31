import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { fetchAddTodo, fetchTodoData, selectPosts } from '../store/posts';
import { useSelector, useDispatch } from 'react-redux';
const initialState = {
    name: '',
    surname: '',
    dateOfBirth: '2003-12-08',
    patronymic: '',
};

const AddModal = ({ addModalOpen, setAddModalOpen }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const { isCreating } = useSelector(selectPosts);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAdd = async () => {
        const newData = {
            name: formData.name,
            surname: formData.surname,
            dateOfBirth: formData.dateOfBirth,
            patronymic: formData.patronymic,
        };

        dispatch(fetchAddTodo(newData))
            .unwrap()
            .then(() => setAddModalOpen(false))
            .catch((err) => console.log(err));
    };


    return (
        <Modal
            open={addModalOpen}
            title='Add row'
            onOk={handleAdd}
            confirmLoading={isCreating}
            onCancel={() => setAddModalOpen(false)}
            afterClose={() => dispatch(fetchTodoData()).then(() => setFormData(initialState))}
        >
            <form>
                <br />
                <label>
                    <Input placeholder='Name' type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    <Input placeholder='Surname' type="text" name="surname" value={formData.surname} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    <Input placeholder='Birthday' type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    <Input placeholder='Patronymic' type="text" name="patronymic" value={formData.patronymic} onChange={handleInputChange} />
                </label>
                <br />
            </form>
        </Modal>
    );
};

export default AddModal;