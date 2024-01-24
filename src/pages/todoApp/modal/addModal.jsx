import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { fetchAddTodo, selectPosts } from '../store/posts';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const initialState = {
    id: '',
    title: '',
    body: '',
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
            id: new Date().getTime(),
            // name: formData.name,
            title: formData.title,
            body: formData.body,
            isCompleted: true
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
            afterClose={() => setFormData(initialState)}
        >
            <form>
                <br />
                <label>
                    <Input placeholder='Title' type="text" name="title" value={formData.title} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    <Input placeholder='Body' type="text" name="body" value={formData.body} onChange={handleInputChange} />
                </label>
                <br />
            </form>
        </Modal>
    );
};

export default AddModal;