import React, { useState } from 'react';
import { Button, Divider, Form, Input, Modal, message, notification } from 'antd';
import { callCreateAUser } from '../../../services/api';


const UserModalCreate = (props) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const {openModalCreate, SetOpenModalCreate} = props;
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const {fullName, password, email, phone} = values;
        setIsSubmit(true);
       const res = await callCreateAUser(fullName, password, email, phone);

       if(res && res.data){
            message.success('Tạo user thành công');
            form.resetFields(); // Xóa hết data sau khi tạo thành công
            SetOpenModalCreate(false);
            if (typeof props.fetchUser === 'function') {
                await props.fetchUser();
            }
        }else{
           notification.error({
               message: "Đã có lỗi xảy ra",
               description: res.message
        })
        }
        setIsSubmit(false);
    }


  return (
    <>
      <Modal 
        title="Thêm User" 
        open={openModalCreate} 
        onOk={() => {form.submit()}} 
        onCancel={() => SetOpenModalCreate(false)}
        okText={"Tạo mới"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
        >
        <Divider/>
        <Form
             form={form}
             name="basic"
             style={{maxWidth: 600}}
             onFinish={onFinish}
             autoComplete='off'
        >
             <Form.Item
                     labelCol={{span: 24}}
                     label="Tên hiểm thị"
                     name="fullName"
                     rules={[{required: true, message: 'Vui lòng nhập tên'}]}
             >
                <Input/>
             </Form.Item>

             <Form.Item
                     labelCol={{span: 24}}
                     label="Email"
                     name="email"
                     rules={[{required: true, message: 'Vui lòng nhập email'}]}
             >
                <Input/>
             </Form.Item>

             <Form.Item
                     labelCol={{span: 24}}
                     label="Password"
                     name="password"
                     rules={[{required: true, message: 'Vui lòng nhập mật khẩu'}]}
             >
                <Input.Password/>
             </Form.Item>

             <Form.Item
                     labelCol={{span: 24}}
                     label="Số điện thoại"
                     name="phone"
                     rules={[{required: true, message: 'Vui lòng nhập số điện thoại'}]}
             >
                <Input/>
             </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default UserModalCreate;