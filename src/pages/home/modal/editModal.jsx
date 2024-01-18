import { Modal, Input } from 'antd'
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTodo, fetchEditTodo, selectPosts } from '../../../store/posts';
// import { isUpdating } from '../../../store/posts';
const initialState = {
    id: '',
    title: '',
    body: '',
}
const EditModal = ({ editModalOpen, setEditModalOpen }) => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const { posts, isUpdating } = useSelector(selectPosts);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEdit = () => {
        const updatedData = {
            id: editModalOpen,
            updatedTodo: formData
        }

        const findedData = posts.find(item => item.id === editModalOpen)?.isCompleted ?? false;

        if (!findedData) {
            dispatch(fetchEditTodo(updatedData))
                .unwrap()
                .then(() => setEditModalOpen(false))
                .catch((err) => console.log(err));
        } else {
            dispatch(editTodo(updatedData));
            setEditModalOpen(false)
        }
    };

    return (
        <Modal
            open={editModalOpen}
            title='Edit row'
            onOk={handleEdit}
            confirmLoading={isUpdating}
            onCancel={() => setEditModalOpen(false)}
            afterOpenChange={open => {
                if (open) {
                    setFormData(posts.find(item => item.id === editModalOpen) ?? initialState)
                }
            }}
        >
            <form>
                {/* <label>
                    <Input placeholder='Name' type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label> */}
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
    )
}

export default EditModal