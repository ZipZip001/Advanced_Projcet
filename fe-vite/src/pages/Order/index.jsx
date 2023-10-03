import { useState } from "react";
import ViewOrder from "../../components/order/ViewOrder";
import './order.scss';
import {  LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined, ShoppingOutlined, CheckCircleTwoTone  } from '@ant-design/icons';
import { Button, Result, Steps } from "antd";
// import { useHistory } from 'react-router-dom';


const OrderPage = (props) =>{

    const [currentStep, setCurrentStep] = useState(0)


    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                <div className="order-steps">
                    <Steps
                        size="small"
                        current={currentStep}
                        status={"finish"}
                        items={[
                            {
                                title: 'Xem hàng',
                                status: 'finish',
                                icon: <SolutionOutlined />,
                            },
                            {
                                title: 'Đặt hàng',
                                status: 'In Progress',
                                icon: <ShoppingOutlined />,
                            },
                            {
                                title: 'Xong',
                                status: 'wait',
                                icon: <CheckCircleTwoTone />,
                            },
                        ]}
                    />
                    {currentStep === 0 &&
                        <ViewOrder setCurrentStep={setCurrentStep}/>
                    }
                    {currentStep === 1 &&
                        <ViewOrder setCurrentStep={setCurrentStep}/>
                    }
                    {currentStep === 2 &&
                        <Result
                            icon={<SmileOutlined/>}
                            title= "Đơn hàng đã đặt thành công !"
                            extra={<Button type="primary">Xem lịch sử </Button>}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default OrderPage;