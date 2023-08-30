// import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';


const LoginPage = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return(    
    
    <div style={{padding: '50px', border: '1px solid #ccc' }}>
        <h3 style={{textAlign: 'center'}}>Đăng nhập</h3>
    <Form
        name="basic"
        labelCol={{span: 8,}}
        wrapperCol={{span: 16,}}
        style={{maxWidth: 600, margin: '0 auto'}}
        initialValues={{remember: true,}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
<Form.Item
label="Username"
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

<Form.Item
name="remember"
valuePropName="checked"
wrapperCol={{
    offset: 8,
    span: 16,
}}
>
<Checkbox>Remember me</Checkbox>
</Form.Item>

<Form.Item
wrapperCol={{
    offset: 8,
    span: 16,
}}
>
<Button type="primary" htmlType="submit">
    Submit
</Button>
</Form.Item>
</Form>


</div>

);   
}

export default LoginPage;