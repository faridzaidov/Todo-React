import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { UserAdd, UsersData, selectPosts } from '../store/users';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'antd';
const initialState = {
    name: '',
    username: '',
    password: '',
    passwordConfirmation: '',
};

const AddUser = ({ addUserOpen, setAddUserOpen }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const { isCreating } = useSelector(selectPosts);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAdd = async () => {

        try {
            await dispatch(UserAdd(formData)).unwrap();
            setAddUserOpen(false);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <Modal
            open={addUserOpen}
            title='Add row'
            onOk={handleAdd}
            confirmLoading={isCreating}
            onCancel={() => setAddUserOpen(false)}
            afterClose={() => dispatch(UsersData()).then(() => setFormData(initialState))}
        >
            <form>
                <br />
                <label>
                    <Input placeholder='Name' type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    <Input placeholder='UserName' type="text" name="username" value={formData.username} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    <Input placeholder='Password' type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    <Input placeholder='PasswordConfirmation' type="password" name="passwordConfirmation" value={formData.passwordConfirmation} onChange={handleInputChange} />
                </label>
                <br />
                <Select
                    defaultValue="lucy"
                    loading={false}
                    style={{
                        width: 120,
                    }}
                    options={[
                        {
                            value: 'Super Admin',
                            label: 'Super Admin',

                        },
                        {
                            value: 'Admin',
                            label: 'Admin',
                        },
                        {
                            value: 'Guest',
                            label: 'Guest',
                        },
                    ]}
                />
                <br />

            </form>
        </Modal>
    );
};

export default AddUser;