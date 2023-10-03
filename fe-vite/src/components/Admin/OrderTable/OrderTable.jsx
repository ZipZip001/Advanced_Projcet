import React, { useEffect, useState } from 'react';
import { Button, Col, Popconfirm, Table, message, notification, Modal } from 'antd';
import { callFetchListUserOut, callFetchListHistoryOut } from '../../../services/api';
import InputSearch from './InputSearch';

import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';

import moment from 'moment';


const OrderTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [refreshTable, setRefreshTable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [dataViewDetail, setDataViewDetail] = useState();

    // const [openModalCreate, setOpenModalCreate] = useState(false);
    // const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openViewDetail, setOpenViewDetail] = useState(false);

    const [dataUpdate, setDataUpdate] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() =>{
        fetchUser();
    },[current, pageSize, refreshTable]);

   
    const fetchUser = async (searchFilter) =>{
        setIsLoading(true)
        let query = `current=${current}&pageSize=${pageSize}`;
        if(searchFilter){
            query +=`&${searchFilter}`
        }

        const res = await callFetchListHistoryOut(query);
        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    }


    const showDetailModal = (record) => {
        setDataViewDetail(record); 
        setIsModalVisible(true); 
    };
    const renderDetailModal = () => {
        return (
          <Modal
            title="Chi tiết người dùng"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)} 
            footer={null} 
          >

            {dataViewDetail && (
              <div>
                {/* <p>ID: {dataViewDetail.id}</p>
                <p>Họ tên: {dataViewDetail.name}</p> */}
                <p>Chi tiết đơn hàng:</p>
                {dataViewDetail.detail.map((item, index) => (
                <div key={index}>
                    <p>Mã sản phẩm: {item.id}</p>
                    <p>Tên sản phẩm: {item.bookName}</p>
                    <p>Số lượng: {item.quantity}</p>
                    <hr />
              </div>
            ))}

              </div>
            )}
          </Modal>
        );
    };
      

    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
          render:(text, record, index) =>{
            return(
                <a href="#" onClick={() =>{
                    setDataViewDetail(record);
                    setOpenViewDetail(true)
                    showDetailModal(record)
                }}>{record.id}
                </a>
            )
          }
        },
        {
          title: 'Họ tên',
          dataIndex: 'name',
          sorter:  true ,
        },

        {
          title: 'Số điện thoại',
          dataIndex: 'phone',
          sorter:  true ,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            sorter:  true ,
          },
        {
            title: 'Ngày nhận đơn',
            dataIndex: 'createdAt',
            sorter:  true ,
            render: (text, record) => {
                return moment(record.updatedAt).format('DD/MM/YYYY');
            },
          },

    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if(pagination && pagination.current !== current){
            setCurrent(pagination.current)
        }
        if(pagination && pagination.pageSize !== pageSize){
            setPageSize(pagination.pageSize)
            setCurrent(1)
        }
        console.log('params', pagination, filters, sorter, extra);
    };


    const handleReload = () => {
        setRefreshTable(!refreshTable); 
    }
    const handleSearch = (query) =>{
        fetchUser(query);  
    }


    const renderHeader = () => {
        return(
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Bảng đơn hàng</span>
                <span style={{ display: 'flex', gap: 15}}>
                    <Button
                        onClick={handleReload}
                        icon={<ReloadOutlined/>}
                        >
                    </Button>
                </span>
            </div>
        )
    }


    return (
        <>
            <Col span ={24}>
                <InputSearch 
                    handleSearch={handleSearch}
                />
            </Col>
            <Col span ={24}>
                <Table 
                    title ={renderHeader}
                    columns={columns} 
                    dataSource={listUser} 
                    loading = {isLoading}
                    onChange={onChange} 
                    rowKey="id"
                    pagination={ 
                        {   
                            current: current, 
                            pageSize: pageSize, 
                            showSizeChanger: true,
                            total: total,

                        }
                    }
                    // key={refreshTable} 
                />
            </Col>       
            {renderDetailModal()}
        </>
    )
}


export default OrderTable;