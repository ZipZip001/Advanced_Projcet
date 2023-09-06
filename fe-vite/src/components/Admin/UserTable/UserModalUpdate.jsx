import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Modal, message, notification } from 'antd';
import { callUpdateUser } from '../../../services/api';


const UserModalUpdate = (props) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const {openModalUpdate, setOpenModalUpdate, dataUpdate} = props;
    // const {} = props;
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const {fullName, _id, phone} = values;
        setIsSubmit(true);
        const res = await callUpdateUser(fullName, _id, phone);

       if(res && res.data){
            message.success('Cập nhất user thành công');
            form.resetFields(); // Xóa hết data sau khi tạo thành công
            setOpenModalUpdate(false);
            await props.fetchUser();
        }else{
            notification.error({
               message: "Đã có lỗi xảy ra",
               description: res.message
            })
        }
        setIsSubmit(false);
    }

    useEffect(() =>{
        form.setFieldsValue(dataUpdate)
    }, [dataUpdate])
  return (
    <>
      <Modal 
        title="Cập nhật người dùng" 
        open={openModalUpdate} 
        onOk={() => {form.submit()}} 
        onCancel={() => {            
            setOpenModalUpdate(false)
            // setDataUpdate(null)
        }}
        okText={"Cập nhất"}
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
                hidden
                labelCol={{span: 24}}
                label="Id"
                name="_id"
                rules={[{required: true, message: 'Vui lòng nhập Id'}]}
            >
            <Input/>
            </Form.Item>

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
            <Input disabled/>
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

export default UserModalUpdate;