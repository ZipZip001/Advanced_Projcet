// import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './login.scss'

const LoginPage = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return(    
    
    <div className='Log' style={{padding: '50px', border: '1px solid #ccc' }}>
        <h3 className='main' >Đăng nhập</h3>
    <Form
        // name="basic"
        // labelCol={{span: 8,}}
        // wrapperCol={{span: 16,}}
        // style={{maxWidth: 600, margin: '0 auto'}}
        initialValues={{remember: true,}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
    <Form.Item
        labelCol= {{span:24}} //whole colum
        label="User"
        name="username"
        rules={[
            {
            required: true,
            message: 'Please input your username!',
            },
        ]}
        >
    <Input />
    </Form.Item>

    <Form.Item
        labelCol= {{span:24}} //whole colum
        label="Password"
        name="password"
        rules={[
            {
            required: true,
            message: 'Please input your password!',
            },
        ]}
        >
    <Input.Password />
    </Form.Item>


    <Form.Item>
    <Button type="primary" htmlType="submit" loading={true}>
        Đăng nhập
    </Button>
    </Form.Item>
    </Form>
</div>

);   
}

export default LoginPage;