import { Button, Col, Form, Input, Row, Select, theme } from "antd";

import React from "react";
import { useEffect } from "react";
import { callFetchCategory } from "../../../services/api";
import { useState } from "react";


const InputSearch = (props) => {
    const {token} = theme.useToken();
    const [form] = Form.useForm();
    const [listCategory, setListCategory] = useState([]);


    const onFinish = (values) => {
        let query = "";
        if(values.mainText){
            query += `&mainText=/${values.mainText}/i`
        }
        if(values.author){
            query += `&author=/${values.author}/i`
        }
        if(values.category){
            query += `&category=/${values.category}/i`
        }

        if(query){
            props.handleSearch(query);
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

    const handleSearchClick = () => {
        form.validateFields().then((values) => {
          onFinish(values);
        });
    };

    const handleClearClick = () => {
        form.resetFields(); 
        // props.handleSearch(query);
    };

    return(
        <Form form={form} name="advanced_search" onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item 
                    labelCol={{span: 24}}
                    name={`mainText`}
                    label={`Tên sách`}>
                        <Input/>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item 
                    labelCol={{span: 24}}
                    name={`category`}
                    label={`Thể loại`}>
                    <Select>
                        {listCategory?.map((item) => (
                            <Select.Option key={item.value} value={item.value}>
                                {item.label}
                            </Select.Option>
                        ))}
                    </Select>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item 
                    labelCol={{span: 24}}
                    name={`author`}
                    label={`Tác giả`}>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>

                <Button type="primary" onClick={handleSearchClick}>
                    Search
                </Button>
                <Button onClick={handleClearClick}>
                    Clear
                </Button>
        </Form>
    )

};



export default InputSearch;