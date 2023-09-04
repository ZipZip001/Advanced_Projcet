import React, { useState } from 'react';
import { Button, Checkbox, Descriptions, Form, Input, message, notification } from 'antd';
import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
// folder
import { callRegister } from '../../services/api';

const  RegisterPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false)

    const onFinish = async(values) => {
        const {fullName, email, password, phone} =values;
        setIsSubmit(true);
        const res = await callRegister(fullName, email, password, phone);
        setIsSubmit(false);
        if(res?.data?._id){
            message.success("Đăng ký tài khoản thành công");
            navigate('/login')
        }else{
            notification.error({
                message: "Có lỗi xảy ra ",
                description:
                    res.message && res.message.length > 0 ? res.message[0] : res.message ,
                duration : 5
            })
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

return(   
    
    <div className="register-page">
    <main className="main">
        <div className="container">
    <div className='Log' style={{padding: '100px', border: '1px solid #ccc' }}>
        <h3 className='main'>Register</h3>
    <Form
        name="basic"

        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
    <Form.Item
        labelCol= {{span:24}} 
        label="Họ Tên"
        name="fullName"
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
        labelCol= {{span:24}} 
        label="Email"
        name="email"
        rules={[
            {
            required: true,
            message: 'Please input your email!',
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

    <Form.Item
        labelCol= {{span:24}} //whole colum
        label="Phone"
        name="phone"
        rules={[
            {
            required: true,
            message: 'Please input your phone!',
            },
        ]}
    >
    <Input />
    </Form.Item>

    <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmit}>
            Đăng ký
        </Button>
    </Form.Item>

    <p className="text text-normal">
        Đã có tài khoản
        <span>
            <Link to='/login'> Đăng nhập </Link>
        </span>
    </p>
    </Form>

</div>
</div>
</main>
</div>
);   
}
export default RegisterPage;