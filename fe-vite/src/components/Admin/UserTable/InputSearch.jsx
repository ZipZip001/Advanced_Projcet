import { Col, Form } from "antd";
import React from "react";


const InputSearch = (props) => {
    const {token} = theme.useToken();
    const [form] = Form.useForm();


    const onFinish = (values) => {
        let query = "";

        if(values.fullName){
            query += `&fullName=/${values.fullName}/i`
        }
        if(values){
            query += `&email=/${values.email}/i`
        }
        if(values){
            query += `&phone=/${values.phone}/i`
        }
        if(query){
            props.handeSearch(query);
        }
    }
    return(
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>

                <Col span={8}>
                    <Form.Item 
                    labelCol={{span: 24}}
                    name={`fullName`}
                    label={`Name`}>
                        <Input/>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item 
                    labelCol={{span: 24}}
                    name={`email`}
                    label={`Email`}>
                        <Input/>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item 
                    labelCol={{span: 24}}
                    name={`phone`}
                    label={`Số điện thoại`}>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )

};



export default InputSearch;