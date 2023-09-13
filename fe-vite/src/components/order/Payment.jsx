import { Button, Col, Divider, Empty, Form, Input, InputNumber, Radio, Row, Steps, message, notification } from 'antd';
import { DeleteOutlined, LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined  } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { doDeleteItemCartAction, doUpdateCartAction } from '../../redux/order/orderSlice';
import { current } from '@reduxjs/toolkit';
import { callPlaceOrder } from '../../services/api';

// import './order.scss';
import TextArea from 'antd/es/input/TextArea';


const Payment = (props) => {
    const carts = useSelector(state => state.order.carts)
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);
    const [totalPrice ,setTotalPrice] = useState(0)

    
    const onFinish = async (values) => {
        setIsSubmit(true);
        const detailOrder = carts.map(item => {
            return{
                bookName: item.detail.mainText,
                quantity: item.quantity,
                _id: item._id
            }
        })
        const data = {
            name: values.name,
            address: values.address,
            phone: values.phone,
            totalPrice: totalPrice,
            detail: detailOrder
        }
    
        const res = await callPlaceOrder(data);
        if(res && res.data){
            message.success('Đặt hàng thành công !');
            dispatch(doPlaceOrderAction());
            props.setCurrentStep(2)
        }else{
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })
        }
        setIsSubmit(false);
    }
    
    return (
        <Col md={6} xs={24} >
        <div className='order-sum'>
            <Form
                onFinish={onFinish}
                form = {form}
            >
                <Form.Item
                    style={{margin: 0}}
                    labelCol={{span: 24}}
                    label="Tên người nhận"
                    name="name"
                    initialValue={UserOutlined.fullName}
                    rules={[{required: true, message: "Tên người nhận" }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    style={{margin: 0}}
                    labelCol={{span: 24}}
                    label="Số điện thoại"
                    name="phone"
                    initialValue={UserOutlined.fullName}
                    rules={[{required: true, message: "Số điện thoại" }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    style={{margin: 0}}
                    labelCol={{span: 24}}
                    label="Địa chỉ"
                    name="address"
                    initialValue={UserOutlined.fullName}
                    rules={[{required: true, message: "Địa chỉ" }]}
                >
                    <TextArea
                        autoFocus
                        rows={4}
                    />
                </Form.Item>

            </Form>
            <div className="info">
                <div className="method">
                    <div> Hình thức thanh toán</div>
                    <Radio checked>Thanh toán khi nhận hàng</Radio>
                    {/* <Radio checked>Thanh toán qua paypal</Radio> */}
                </div>
            </div>

            <div className='calculate'>
                <span> Tạm tính</span>
                <span> 
                Tổng: {new Intl.NumberFormat('vi-VN', {style:'currency', currency:'VND'}).format(totalPrice || 0) }
                </span>
            </div>
            <Divider style={{ margin: "5px 0" }} />
            <div className='calculate'>
                <span> Tổng tiền</span>
                <span className='sum-final'>  
                Tổng: {new Intl.NumberFormat('vi-VN', {style:'currency', currency:'VND'}).format(totalPrice || 0) }
                </span>
            </div>
            <Divider style={{ margin: "5px 0" }} />
            <button
                onClick={() => form.submit()}
                disabled={isSubmit}
            >
                {isSubmit && <span><LoadingOutlined/> &nbsp;</span>}
                Đặt hàng ({carts?.length ?? 0})
            </button>
        </div>
        </Col>
    )
}

export default Payment;