// import React from 'react';
import { Button, Checkbox, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

//call folder
import './login.scss'
import { callLogin } from '../../services/api';
import { doLoginAction } from '../../redux/account/accountSlice';


const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false)

    const dispatch = useDispatch();

    const onFinish = async(values) => {
        const { username, password } = values;
        setIsSubmit(true);
        const res = await callLogin( username, password );
        setIsSubmit(false);

        if(res?.data){
            localStorage.setItem('access_token', res.data.access_token);//access token
            dispatch(doLoginAction(res.user));

            message.success("Đăng nhập tài khoản thành công");
            navigate("/")
        }else{
            notification.error({
                message:"Có lỗi xảy ra",
                discription:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration:5
            })
        }
    };


return(
    <div className='login-page'>  
        <main className="main">
            <div className="container">
                <section className='wrapper'>
                        <div className='Log' style={{padding: '50px', border: '1px solid #ccc' }}>
                            <h3 className='main' >Đăng nhập</h3>
                            <Form
                            initialValues={{remember: true,}}
                            onFinish={onFinish}
                            autoComplete="off"
                            >

                            <Form.Item
                                labelCol= {{span:24}} 
                                label="Email"
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
                                labelCol= {{span:24}} 
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
                            <Button type="primary" htmlType="submit" loading={isSubmit}>
                                Đăng nhập
                            </Button>
                            </Form.Item>
                            </Form>
                            <p className="text text-normal">
                                Chưa có tài khoản
                                <span>
                                    <Link to='/register'> Đăng ký </Link>
                                </span>
                            </p>
                    </div>

            </section>
        </div>
    </main>  
</div> 
    );   
}

export default LoginPage;