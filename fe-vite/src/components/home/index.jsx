import { FilterTwoTone, ReloadOutlined } from '@ant-design/icons';
import { Row, Col, Form, Checkbox, Divider, InputNumber, Button, Rate, Tabs, Pagination } from 'antd';
import './home.scss';
import { useEffect, useState } from 'react';
import { callFetchCategory, callFetchListBook } from '../../services/api';
const Home = () => {
    const [listCategory, setListCategory] = useState([]);

    const [listBook, setListBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=-sold")

    const [form] = Form.useForm();

    const handleChangeFilter = (changedValues, values) => {
        console.log(">>> check handleChangeFilter", changedValues, values)
    }
    const handleOnChangePage = (pagination) =>{
        if (pagination && pagination.current != current){
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize != pageSize){
            setCurrent(pagination.pageSize);
            setCurrent(1);
        }
    }

    useEffect(() => {
        const initCategory = async () => {
            const res = await callFetchCategory();
            if(res && res.data){
                const d = res.data.map(item =>{
                    return {label: item, value: item}
                })
                setListCategory(d);
            }
        }
        initCategory()
    }, [])

    useEffect (() =>{
        fetchBook();
    },[current, pageSize, filter, sortQuery])

    const fetchBook = async () => {
        setIsLoading(true)
        let query = `current=${current}&pageSize=${pageSize}`;
        if(filter){
            query +=`&${filter}`
        }
        if(sortQuery){
            query +=`&${sortQuery}`
        }

        const res = await callFetchListBook(query);
        if (res && res.data) {
            setListBook(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    }

    const onFinish = (values) => {

    }

    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: `Phổ biến`,
            children: <></>,
        },
        {
            key: '2',
            label: `Hàng Mới`,
            children: <></>,
        },
        {
            key: '3',
            label: `Giá Thấp Đến Cao`,
            children: <></>,
        },
        {
            key: '4',
            label: `Giá Cao Đến Thấp`,
            children: <></>,
        },
    ];
    return (
        <div className="homepage-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
            <Row gutter={[20, 20]}>
                <Col md={4} sm={0} xs={0} style={{ border: "1px solid green" }}>
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <span> <FilterTwoTone /> Bộ lọc tìm kiếm</span>
                        <ReloadOutlined title="Reset" onClick={() => form.resetFields()} />
                    </div>
                    <Form
                        onFinish={onFinish}
                        form={form}
                        onValuesChange={(changedValues, values) => handleChangeFilter(changedValues, values)}
                    >
                        <Form.Item
                            name="category"
                            label="Danh mục sản phẩm"
                            labelCol={{ span: 24 }}
                        >
                            <Checkbox.Group>
                                <Row>
                                    {listCategory?.map((item, index) =>{
                                        return(
                                            <Col span={24} key={`index-${index}`}  style={{padding: '7px 0'}}>
                                                <Checkbox value = {item.value}>
                                                    {item.label}
                                                </Checkbox>
                                            </Col>
                                        )
                                    })}

                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                        <Divider />
                        <Form.Item
                            label="Khoảng giá"
                            labelCol={{ span: 24 }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                                <Form.Item name={["range", 'from']}>
                                    <InputNumber
                                        name='from'
                                        min={0}
                                        placeholder="đ TỪ"
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    />
                                </Form.Item>
                                <span >-</span>
                                <Form.Item name={["range", 'to']}>
                                    <InputNumber
                                        name='to'
                                        min={0}
                                        placeholder="đ ĐẾN"
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    />
                                </Form.Item>
                            </div>
                            <div>
                                <Button onClick={() => form.submit()}
                                    style={{ width: "100%" }} type='primary'>Áp dụng</Button>
                            </div>
                        </Form.Item>
                        <Divider />
                        <Form.Item
                            label="Đánh giá"
                            labelCol={{ span: 24 }}
                        >
                            <div>
                                <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text"></span>
                            </div>
                            <div>
                                <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                            <div>
                                <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                            <div>
                                <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                            <div>
                                <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
                <Col md={20} xs={24} style={{ border: "1px solid red" }}>
                    <Row>
                        <Tabs 
                            defaultActiveKey="sort=-sold"
                            items={items}
                            onChange={(value) => {setSortQuery(value)}}
                            style={{overflowX: "auto"}}
                        />
                    </Row>
                    <Row className='customize-row'>
                        {listBook?.map((item, index) => {
                            return(
                                <div className='colum' key={`book-${index}`}>
                                    <div className='wrapper'>
                                        <div className="thumbnail">
                                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`} alt="thumbnail book" />
 
                                            {/* <img src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg" alt="thumbnail book" /> */}
                                        </div>
                                        <div className="text" title={item.mainText}>{item.mainText}</div>
                                        <div className="price">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                        </div>
                                        <div className='rating'>
                                            <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                            <br />
                                            <span>Đã bán {item.sold} </span>
                                        </div>
                                    </div>

                                </div>
                            )
                        })}
                    </Row>
                    <Divider />
                    <Row style={{ display: "flex", justifyContent: "center" }}>
                        <Pagination
                            // defaultCurrent={6}
                            current={current}
                            total={total}
                            pageSize={pageSize}
                            responsive  // Giao diện mobile
                            onChange={(p, s) => handleOnChangePage({ current: p, pageSize: s})}
                        />
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Home;