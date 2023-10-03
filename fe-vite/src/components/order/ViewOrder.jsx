import { Button, Col, Divider, Empty, Form, Input, InputNumber, Radio, Row, Steps, message } from 'antd';
import '../../pages/Order/order.scss';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { doDeleteItemCartAction, doPlaceOrderAction, doUpdateCartAction } from '../../redux/order/orderSlice';
import TextArea from 'antd/es/input/TextArea';
import { callPlaceOrderOut } from '../../services/api';

const ViewOrder = (props) => {
  const carts = useSelector((state) => state.order.carts);
  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (carts && carts.length > 0) {
      let sum = 0;
      carts.forEach((item) => {
        sum += item.quantity * item.detail.price;
      });
      setTotalPrice(sum);
    } else {
      setTotalPrice(0);
    }
  }, [carts]);

  const handleOnChangeInput = (value, book) => {
    if (!isNaN(value)) {
      // Cập nhật số lượng sản phẩm trong giỏ hàng
      dispatch(doUpdateCartAction({ quantity: value, detail: book, id: book.id }));

      // Tính lại tổng tiền dựa trên giá sản phẩm và số lượng sản phẩm
      let newTotalPrice = 0;
      carts.forEach((item) => {
        newTotalPrice += item.quantity * item.detail.price;
      });
      setTotalPrice(newTotalPrice);
    }
  };

  const onFinish = async (values) => {
    setIsSubmit(true);
    const detailOrder = carts.map((item) => {
      return {
        bookName: item.detail.maintext,
        quantity: item.quantity,
        id: item.id,
      };
    });

    const data = {
      name: values.name,
      address: values.address,
      phone: values.phone,
      totalPrice: totalPrice,
      detail: detailOrder,
    };

    const res = await callPlaceOrderOut(data);
    if (res) {
      message.success('Đặt hàng thành công !');
      dispatch(doPlaceOrderAction());
      props.setCurrentStep(2);
      console.log(data);
    } else {
      notification.error({
        message: 'Đã có lỗi xảy ra',
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  return (
    <div style={{ background: '#efefef', padding: '20px 0' }}>
      <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
        <Row gutter={[20, 20]}>
          <Col md={18} xs={24}>
            {carts?.map((book, index) => {
              return (
                <div className="order-book" key={`index-${index}`}>
                  <div className="book-content">
                    <img src={book?.detail?.thumnail} alt="" />
                    <div className="title">{book?.detail?.maintext}</div>
                    <div className="price">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        book?.detail?.price
                      )}
                    </div>
                  </div>
                  <div className="action">
                    <div className="quantity">
                      <InputNumber
                        min={1}
                        max={10}
                        onChange={(value) => handleOnChangeInput(value, book)}
                        value={book.quantity}
                      />
                    </div>
                    <div className="sum">
                      Tiền sản phẩm:{' '}
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        book.quantity * book.detail.price
                      )}
                    </div>
                    <DeleteOutlined
                      style={{ cursor: 'pointer' }}
                      onClick={() => dispatch(doDeleteItemCartAction({ id: book.id }))}
                    />
                  </div>
                </div>
              );
            })}
            {carts.length === 0 && (
              <div className="order-book-empty">
                <Empty description={'Không có sản phẩm trong giỏ hàng'} />
              </div>
            )}
          </Col>

          <Col md={6} xs={24}>
            <div className="order-sum">
              <Form onFinish={onFinish} form={form}>
                <Form.Item
                  style={{ margin: 0 }}
                  labelCol={{ span: 24 }}
                  label="Tên người nhận"
                  name="name"
                  initialValue={user?.fullName}
                  rules={[{ required: true, message: 'Tên người nhận' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  style={{ margin: 0 }}
                  labelCol={{ span: 24 }}
                  label="Số điện thoại"
                  name="phone"
                  initialValue={user?.phone}
                  rules={[{ required: true, message: 'Số điện thoại' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  style={{ margin: 0 }}
                  labelCol={{ span: 24 }}
                  label="Địa chỉ"
                  name="address"
                  initialValue={user?.address}
                  rules={[{ required: true, message: 'Địa chỉ' }]}
                >
                  <TextArea autoFocus rows={4} />
                </Form.Item>
              </Form>
              <div className="info">
                <div className="method">
                  <div> Hình thức thanh toán</div>
                  <Radio checked>Thanh toán khi nhận hàng</Radio>
                  {/* <Radio checked>Thanh toán qua paypal</Radio> */}
                </div>
              </div>

              <div className="calculate">
                <span> Tạm tính</span>
                <span>
                  Tổng:{' '}
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice || 0)}
                </span>
              </div>
              <Divider style={{ margin: '5px 0' }} />
              <div className="calculate">
                <span> Tổng tiền</span>
                <span className="sum-final">
                  Tổng:{' '}
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice || 0)}
                </span>
              </div>
              <Divider style={{ margin: '5px 0' }} />
              <button onClick={() => form.submit()} disabled={isSubmit}>
                {isSubmit && <span><LoadingOutlined/> &nbsp;</span>}
                Đặt hàng ({carts?.length ?? 0})
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ViewOrder;
