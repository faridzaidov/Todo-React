import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { signIn, selectAuth } from './store/auth'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { isLoadingLogin } = useSelector(selectAuth)
    const navigate = useNavigate()

    const onFinish = (values) => {
        dispatch(signIn(values))
            .unwrap()
            .then(() =>
                navigate('/'))
            .catch(console.error);
    };

    return (
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item shouldUpdate>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoadingLogin}
                        disabled={!form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length}
                    >
                        Log in
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
}

export default Login