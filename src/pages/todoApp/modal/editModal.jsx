import { Modal, Input } from 'antd'
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTodo, fetchAddPhoto, fetchEditTodo, selectPosts } from '../store/posts';
const initialState = {
    name: '',
    surname: '',
    dateOfBirth: '',
    patronymic: '',
}

const EditModal = ({ editModalOpen, setEditModalOpen }) => {
    const inputRef = useRef(null);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const { posts, isUpdating } = useSelector(selectPosts);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleFotoAdd = (e) => {
        const file = e.target.files[0];
        dispatch(fetchAddPhoto({ id: editModalOpen, picture: file }));
        inputRef.current.value = '';
    }

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
                <label>
                    <Input ref={inputRef} placeholder='Picture' type="file" name="picture" multiple={false} onChange={handleFotoAdd} />
                </label>
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
    )
}

export default EditModal