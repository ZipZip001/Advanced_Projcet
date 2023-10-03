import React, { useState, useEffect  } from 'react';
import { Button, Divider, Form, Input, Modal, message, notification, Select  } from 'antd';
import { callCreateABookOut, callCategoryOut  } from '../../../services/api';

const { Option } = Select;

const BookModalCreate = (props) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const {openModalCreate, setOpenModalCreate} = props;
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();

   useEffect(() => {
      async function fetchCategories() {
          try {
              const response = await callCategoryOut();
              setCategories(response.data);
          } catch (error) {
              console.error('Lỗi khi tải danh sách loại sách', error);
          }
      }

      fetchCategories();
  }, []);


    const onFinish = async (values) => {
        const {thumnail, maintext, category, author, price,quantity} = values;
        setIsSubmit(true);
       const res = await callCreateABookOut(thumnail, maintext, category, author, price,quantity);

       if(res ){
            message.success('Thêm sách mới thành công');
            form.resetFields(); // Xóa hết data sau khi tạo thành công
            setOpenModalCreate(false);
            if (typeof props.fetchBook === 'function') {
               await props.fetchBook();
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
        title="Thêm Sách" 
        open={openModalCreate} 
        onOk={() => {form.submit()}} 
        onCancel={() => setOpenModalCreate(false)}
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
                     label="Link ảnh"
                     name="thumnail"
                     rules={[{required: true, message: 'Bạn thiếu link ảnh '}]}
             >
                <Input/>
             </Form.Item>

             <Form.Item
                     labelCol={{span: 24}}
                     label="Tên sách"
                     name="maintext"
                     rules={[{required: true, message: 'Vui lòng nhập tên sách'}]}
             >
                <Input/>
             </Form.Item>

             <Form.Item
                     labelCol={{span: 24}}
                     label="Tên tác giả"
                     name="author"
                     rules={[{required: true, message: 'Vui lòng nhập tên tác giả'}]}
             >
                <Input/>
             </Form.Item>

             <Form.Item
                     labelCol={{span: 24}}
                     label="Loại sách"
                     name="category"
                     rules={[{required: true, message: 'Vui lòng nhập loại sách'}]}
             >
                <Select>
                     {categories.map((category) => (
                        <Option key={category} value={category}>
                           {category}
                        </Option>
                     ))}
               </Select>
             </Form.Item>

             <Form.Item
                  labelCol={{ span: 24 }}
                  label="Giá sản phẩm"
                  name="price"
                  rules={[
                     { required: true, message: 'Vui lòng nhập giá' },
                     {
                        validator: async (_, value) => {
                        if (isNaN(value)) {
                           return Promise.reject('Vui lòng nhập một số');
                        }
                        if (parseFloat(value) < 1000) {
                           return Promise.reject('Giá sản phẩm ít nhất là 1000');
                        }
                        return Promise.resolve();
                        },
                     },
                  ]}
                  >
               <Input />
               </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BookModalCreate;