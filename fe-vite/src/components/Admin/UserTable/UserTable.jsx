import React, { useEffect, useState } from 'react';
import { Button, Col, Table, message, notification } from 'antd';
import { callFetchListUser } from '../../../services/api';
import InputSearch from './InputSearch';

import { CloudUploadOutlined, ExportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import UserModalCreate from './UserModalCreate';


const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);

    const [refreshTable, setRefreshTable] = useState(false); // Thêm trạng thái làm mới lại bảng
    const [isLoading, setIsLoading] =useState(false);

    const[dataViewDetail, setDataViewDetail] = useState()

    const [openModalCreate, setOpenModalCreate] = useState(false);


    useEffect(() =>{
        fetchUser();
    },[current, pageSize, refreshTable]);

   
    const fetchUser = async (searchFilter) =>{
        setIsLoading(true)
        let query = `current=${current}&pageSize=${pageSize}`;
        if(searchFilter){
            query +=`&${searchFilter}`
        }

        const res = await callFetchListUser(query);
        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total);
            setDataViewDetail(res.data.result)
            // console.log('listUser:', listUser);
            // console.log('total:', total);
            // console.log('dataViewDetail:', dataViewDetail);

        }
        setIsLoading(false);
    }

    const columns = [
        {
          title: 'Id',
          dataIndex: '_id',
        },
        {
          title: 'Họ tên',
          dataIndex: 'fullName',
          sorter:  true ,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          sorter:  true ,
        },
        {
          title: 'Số điện thoại',
          dataIndex: 'phone',
          sorter:  true ,
        },
        {
          title: 'Action',
          render: (text, record, index) => {
              return(
                  <>
                      <button>Delete</button>
                  </>
              )
          }
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

    const handleDeleteUser = async (userId) =>{
        const res = await callDeleteUser(userId);
        if (res && res.data){
            message.success('Xóa user thành công');
            fetchUser();
        }else{
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message,
            });
        }
    }


    const handleReload = () => {
        setRefreshTable(!refreshTable); 
    }
    const handleSearch = (query) =>{
        fetchUser(query);  
    }

    const renderHeader = () => {
        return(
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Table List User</span>
                <span style={{ display: 'flex', gap: 15}}>
                    {/* <Button
                        icon={<ExportOutlined/>}
                        type= "primary"
                        >Export
                    </Button> */}
                    <Button
                        icon={<CloudUploadOutlined/>}
                        type= "primary"
                        >Import
                    </Button>
                    <Button
                        icon={<PlusOutlined/>}
                        type= "primary"
                        onClick={() => setOpenModalCreate(true)}
                        >Thêm mới
                    </Button>
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
                    rowKey="_id"
                    pagination={ 
                        {   
                            current: current, 
                            pageSize: pageSize, 
                            showSizeChanger: true,
                            total: total
                        }
                    }
                    // key={refreshTable} 
                />
            </Col>       
            <UserModalCreate
                openModalCreate = {openModalCreate}
                SetOpenModalCreate ={setOpenModalCreate}
                fetchUser={fetchUser}
            />

        </>
    )
}


export default UserTable;