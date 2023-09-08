import React, { useEffect, useState } from 'react';
import { Button, Col, Popconfirm, Table, message, notification } from 'antd';
import { callDeleteUser, callFetchListUser } from '../../../services/api';
import InputSearch from './InputSearch';

import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import UserModalCreate from './UserModalCreate';
import UserModalUpdate from './UserModalUpdate';


const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [refreshTable, setRefreshTable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);



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
                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận xóa user"}
                        description={"Bạn có chắc chắn muốn xóa user này ?"}
                        onConfirm={() => handleDeleteUser(record._id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    
                    >
                        <DeleteTwoTone/>
                    </Popconfirm>

                    <EditTwoTone
                        onClick={() => {
                            setOpenModalUpdate(true)
                            setDataUpdate(record);
                        }}
                    >
                    </EditTwoTone>
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

    // const handleExportData = () =>{
    //     if(listUser.length > 0){
    //         const worksheet = XLSX.utils.json_to_tosheet(listUser)
    //         const workbook = XLSX.utils.book_new();
    //         XLSX.utils.book_append_sheet(workbook,worksheet, "Sheet1");
    //         XLSX.writeFile(workbook, "ExportUser.csv");
    //     }
    // }

    const renderHeader = () => {
        return(
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Table List User</span>
                <span style={{ display: 'flex', gap: 15}}>
                    <Button
                        icon={<ExportOutlined/>}
                        type= "primary"
                        // onClick={() => handleExportData()}
                        >Export
                    </Button>
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
                setOpenModalCreate ={setOpenModalCreate}
                fetchUser={fetchUser}
            />

            <UserModalUpdate
                openModalUpdate = {openModalUpdate}
                setOpenModalUpdate ={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                fetchUser={fetchUser}
            />

        </>
    )
}


export default UserTable;