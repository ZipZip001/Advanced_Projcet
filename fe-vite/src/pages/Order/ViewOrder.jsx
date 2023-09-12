import { Col, Divider, InputNumber, Row } from 'antd';
import './order.scss';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { doDeleteItemCartAction, doUpdateCartAction } from '../../redux/order/orderSlice';




const ViewOrder = (props) => {
    const carts =useSelector(state => state.order.carts)
const dispatch = useDispatch()
const [totalPrice ,setTotalPrice] = useState(0)

useEffect(() => {
    if(carts && carts.length > 0){
        let sum = 0 ;
        carts.map(item =>{
            sum+= item.quantity * item.detail.price;
        })
        setTotalPrice(sum)
    }else{
        setTotalPrice(0)
    }
},[carts])


const handleOnChangeInput = (value, book) => {
    if(!value || value <1) return;
    if(!isNaN(value)){
        dispatch(doUpdateCartAction({quantity: value, detail: book, _id: book._id}))
    }
}




    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                <Row gutter={[20, 20]}>
                    <Col md={18} xs={24}>
                        {carts?.map((book, index) => {
                            const currentBookPrice = book?.detail?.price ?? 0;
                            return(
                                <div className='order-book' key ={`index-${index}`}>
                                <div className='book-content'>
                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`} />
                                    <div className='title'>
                                        {book?.detail?.mainText}
                                    </div>
                                    <div className='price'>
                                        {book?.detail?.p}
                                    </div>
                                </div>
                                <div className='action'>
                                    <div className='quantity'>
                                        <InputNumber onChange={(value) => handleOnChangeInput(value,book)} value={book.quantity} />
                                    </div>
                                    <div className='sum'>
                                        Tổng: {new Intl.NumberFormat('vi-VN', {style:'currency', currency:'VND'}).format(book?.detail?.price) ?? 0}
                                    </div>
                                    <DeleteOutlined 
                                        style={{ cursor: "pointer"}}
                                        onClick={() => dispatch(doDeleteItemCartAction({_id: book._id}))}
                                    />
                                </div>
                            </div>
                            )

                        })}
                    </Col>
                    <Col md={6} xs={24} >
                        <div className='order-sum'>
                            <div className='calculate'>
                                <span>  Tạm tính</span>
                                <span> 
                                Tổng: {new Intl.NumberFormat('vi-VN', {style:'currency', currency:'VND'}).format(totalPrice || 0) }
                                </span>
                            </div>
                            <Divider style={{ margin: "10px 0" }} />
                            <div className='calculate'>
                                <span> Tổng tiền</span>
                                <span className='sum-final'>  
                                Tổng: {new Intl.NumberFormat('vi-VN', {style:'currency', currency:'VND'}).format(totalPrice || 0) }
                                </span>
                            </div>
                            <Divider style={{ margin: "10px 0" }} />
                            <button>Mua Hàng ({carts?.length ?? 0})</button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ViewOrder;